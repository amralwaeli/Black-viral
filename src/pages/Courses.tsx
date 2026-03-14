import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { usePageTitle } from '../hooks/usePageTitle';
import { Search, Clock, Users, Star, ChevronRight, Loader2, UserCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../utils/supabase/client';
import { CourseDetailsModal } from '../components/CourseDetailsModal';
import { EnrollmentModal } from '../components/EnrollmentModal';
import { useAuth } from '../contexts/AuthContext';
import { useStuckLoadingRecovery } from '../hooks/usePageVisibility';

// ── Static image map by category ─────────────────────────────
const CATEGORY_IMAGES: Record<string, string> = {
  aquatic:    'https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  combat:     'https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  team:       'https://images.unsplash.com/photo-1587166088004-bbd20854280f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  individual: 'https://images.unsplash.com/photo-1621046590909-be3de07237a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  rescue:     'https://images.unsplash.com/photo-1770215252183-da5f44f2851c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  default:    'https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
};

// ── Category label map (DB value → display label) ────────────
const CATEGORY_LABELS: Record<string, string> = {
  aquatic:    'Aquatic Sports',
  combat:     'Combat Sports',
  team:       'Team Sports',
  individual: 'Individual Sports',
  rescue:     'Rescue & First Aid',
};

// ── Fallback courses (shown if Supabase returns 0 rows) ───────
// These match the seed SQL exactly. Remove this array once the
// DB is seeded — the page will then use live Supabase data only.
const FALLBACK_COURSES = [
  { id: 'f9',  title: 'Lifeguard Certification',         category: 'rescue',     level: 'Certification', duration: '6 weeks',  enrolled_count: 423, rating: 5.0, price: null, is_online: true,  is_physical: true,  description: 'International lifeguard certification with practical training.',       features: ['Water Rescue', 'CPR & First Aid', 'ILS Certified'],                  instructor: null },
  { id: 'f1',  title: 'Karate Traditional Training',     category: 'combat',     level: 'All Levels',    duration: '12 weeks', enrolled_count: 312, rating: 4.9, price: null, is_online: false, is_physical: true,  description: 'Traditional karate training with full belt progression.',              features: ['Kata Mastery', 'Kumite Training', 'Belt Advancement'],              instructor: null },
  { id: 'f2',  title: 'Kickboxing Elite',                category: 'combat',     level: 'Intermediate',  duration: '12 weeks', enrolled_count: 265, rating: 4.8, price: null, is_online: true,  is_physical: true,  description: 'High-intensity kickboxing training for fitness and competition.',     features: ['Muay Thai Style', 'Cardio Conditioning', 'Self Defense'],           instructor: null },
  { id: 'f3',  title: 'Taekwondo Championship Prep',     category: 'combat',     level: 'Intermediate',  duration: '10 weeks', enrolled_count: 198, rating: 4.8, price: null, is_online: false, is_physical: true,  description: 'Competition-focused Taekwondo training program.',                     features: ['Sparring', 'Poomsae', 'Competition Strategy'],                       instructor: null },
  { id: 'f4',  title: 'Boxing Fundamentals',             category: 'combat',     level: 'Beginner',      duration: '10 weeks', enrolled_count: 287, rating: 4.9, price: null, is_online: true,  is_physical: true,  description: 'Learn boxing basics from professional coaches.',                      features: ['Footwork', 'Punching Techniques', 'Defense Strategies'],             instructor: null },
];

function getCourseImage(course: any): string {
  if (course.image_url) return course.image_url;
  return CATEGORY_IMAGES[course.category] ?? CATEGORY_IMAGES.default;
}

function formatPrice(price: number | string | null): string {
  if (price === null || price === undefined) return 'Contact us';
  const num = typeof price === 'string' ? parseFloat(price) : price;
  return `AED ${num.toLocaleString()}`;
}

export function Courses() {
  usePageTitle('Courses');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const categoryParam = searchParams.get('category');
  const searchParam   = searchParams.get('search');
  const enrollCourseId = searchParams.get('enrollCourse');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [searchQuery,      setSearchQuery]       = useState(searchParam  || '');
  const [selectedCourse,   setSelectedCourse]    = useState<any>(null);
  const [showEnrollModal,  setShowEnrollModal]   = useState(false);
  const [showDetailsModal, setShowDetailsModal]  = useState(false);

  const [courses,       setCourses]       = useState<any[]>([]);
  const [loading,       setLoading]       = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useStuckLoadingRecovery(loading);

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam)   setSearchQuery(searchParam);
    loadCourses();
  }, [categoryParam, searchParam]);

  // Handle enrollCourse parameter from signup redirect
  useEffect(() => {
    if (enrollCourseId && user && courses.length > 0) {
      const courseToEnroll = courses.find(c => c.id === enrollCourseId);
      if (courseToEnroll) {
        setSelectedCourse(courseToEnroll);
        setShowEnrollModal(true);
        // Clean up the URL
        navigate('/courses', { replace: true });
      }
    }
  }, [enrollCourseId, user, courses, navigate]);

  async function loadCourses() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          id, title, description, category, level, duration, price,
          is_online, is_physical, rating, image_url, features,
          status, branch, max_capacity, instructor_id,
          user_profiles!instructor_id(full_name)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        // Also fetch enrolled counts per course
        const ids = data.map((c: any) => c.id);
        const { data: enrollData } = await supabase
          .from('enrollments')
          .select('course_id')
          .in('course_id', ids)
          .eq('status', 'approved');

        const countMap: Record<string, number> = {};
        (enrollData || []).forEach((e: any) => {
          countMap[e.course_id] = (countMap[e.course_id] || 0) + 1;
        });

        const merged = data.map((c: any) => ({
          ...c,
          enrolled_count: countMap[c.id] || 0,
          features: Array.isArray(c.features) ? c.features : [],
          instructor: c.user_profiles || null,
        }));

        setCourses(merged);
        setUsingFallback(false);
      } else {
        // DB is empty — use fallback
        setCourses(FALLBACK_COURSES);
        setUsingFallback(true);
      }
    } catch (err) {
      console.error('[Courses] loadCourses:', err);
      setCourses(FALLBACK_COURSES);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }

  function handleEnrollClick(course: any) {
    if (usingFallback) {
      // Can't enroll into unsaved courses
      return;
    }
    // Show details modal first
    setSelectedCourse(course);
    setShowDetailsModal(true);
  }

  function handleEnrollFromDetails() {
    // Close details modal and open enrollment
    setShowDetailsModal(false);
    
    if (user) {
      setShowEnrollModal(true);
    } else {
      // Navigate to signup with course ID to enroll after signup
      navigate(`/signup?enrollCourse=${selectedCourse?.id}`);
    }
  }

  function handleDetailsClick(course: any) {
    setSelectedCourse(course);
    setShowDetailsModal(true);
  }

  const categories = [
    { id: 'all',        name: 'All Courses' },
    { id: 'services',   name: 'Services' },
    { id: 'aquatic',    name: 'Aquatic Sports' },
    { id: 'combat',     name: 'Combat Sports' },
    { id: 'team',       name: 'Team Sports' },
    { id: 'individual', name: 'Individual Sports' },
    { id: 'rescue',     name: 'Rescue & First Aid' },
    { id: 'online',     name: 'Online Courses' },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'online' ? course.is_online :
       selectedCategory === 'services' ? (course.category === 'service' || course.level === 'Certification' || course.title.toLowerCase().includes('instructor') || course.title.toLowerCase().includes('pool management')) :
       course.category === selectedCategory);
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    // Sort logic: courses with prices first, then legacy courses (NULL price) at the end
    const aHasPrice = a.price !== null && a.price !== undefined;
    const bHasPrice = b.price !== null && b.price !== undefined;
    
    // If one has price and other doesn't, prioritize the one with price
    if (aHasPrice && !bHasPrice) return -1;
    if (!aHasPrice && bHasPrice) return 1;
    
    // Otherwise, sort by category and then by title
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="pt-20">
      {/* ── Hero / Search ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Explore Our{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Courses
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional training programs with international certification and expert coaching
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-cyan-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'bg-white/5 backdrop-blur-sm border border-cyan-500/20 text-gray-300 hover:border-cyan-500/50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses Grid ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Loading */}
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleEnrollClick(course)}
                    className="group bg-card border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getCourseImage(course)}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />

                      {/* Online / Physical badges */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        {course.is_online   && <span className="px-3 py-1 bg-cyan-500/90 backdrop-blur-sm text-white text-xs rounded-full font-medium">Online</span>}
                        {course.is_physical && <span className="px-3 py-1 bg-blue-500/90  backdrop-blur-sm text-white text-xs rounded-full font-medium">Physical</span>}
                      </div>

                      {/* Level badge */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs rounded-full">
                          {course.level}
                        </span>
                        <span className="inline-block px-2 py-1 bg-black/40 backdrop-blur-sm text-xs text-gray-300 rounded-full">
                          {CATEGORY_LABELS[course.category] ?? course.category}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold text-card-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-muted-foreground text-sm line-clamp-2">{course.description}</p>

                      {/* Instructor row */}
                      <div className="flex items-center gap-2 text-sm">
                        <UserCircle2 className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                        {course.instructor?.full_name ? (
                          <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                            {course.instructor.full_name}
                          </span>
                        ) : (
                          <span className="text-muted-foreground italic">Coach to be assigned</span>
                        )}
                      </div>

                      {/* Feature tags */}
                      {course.features && course.features.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {course.features.map((feature: string, fIndex: number) => (
                            <span
                              key={fIndex}
                              className="px-2 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded-lg"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Meta row */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          {course.enrolled_count > 0 && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{course.enrolled_count}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground italic">
                          {CATEGORY_LABELS[course.category] ?? course.category}
                        </span>
                      </div>

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                          {formatPrice(course.price)}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEnrollClick(course); }}
                          disabled={usingFallback}
                          className="group/btn px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          title={usingFallback ? 'Run seed SQL first to enable enrollment' : undefined}
                        >
                          <span>Enroll Now</span>
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-xl">No courses found matching your criteria.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Enrollment Modal */}
      {selectedCourse && (
        <EnrollmentModal
          course={selectedCourse}
          isOpen={showEnrollModal}
          onClose={() => {
            setShowEnrollModal(false);
            setSelectedCourse(null);
          }}
        />
      )}

      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCourse(null);
          }}
          onEnroll={handleEnrollFromDetails}
          usingFallback={usingFallback}
        />
      )}

      {/* Pool Management CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">Pool Management & Other Services</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Professional certification courses, pool management, and specialist aquatics training programs
              </p>
              <Link
                to="/services"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
              >
                <span>Explore All Services</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}