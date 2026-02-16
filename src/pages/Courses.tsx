import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Clock, Users, Star, ChevronRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';

const heroImage = "https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB0cmFpbmluZyUyMGF0aGxldGV8ZW58MXx8fHwxNzcwOTc4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const boxingImage = "https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBraWNrYm94aW5nJTIwZmlnaHRlcnxlbnwxfHx8fDE3NzA5NzgwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const basketballImage = "https://images.unsplash.com/photo-1587166088004-bbd20854280f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdGVhbSUyMHNwb3J0fGVufDF8fHx8MTc3MDk3ODAyN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const gymnasticsImage = "https://images.unsplash.com/photo-1621046590909-be3de07237a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW1uYXN0aWNzJTIwYXRobGV0ZSUyMHRyYWluaW5nfGVufDF8fHx8MTc3MDk3ODAyOHww&ixlib=rb-4.1.0&q=80&w=1080";
const rescueImage = "https://images.unsplash.com/photo-1770215252183-da5f44f2851c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMHJlc2N1ZSUyMHRyYWluaW5nfGVufDF8fHx8MTc3MDk3ODAyOHww&ixlib=rb-4.1.0&q=80&w=1080";
const footballImage = "https://images.unsplash.com/photo-1650501889311-f7c877f1042d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMHBsYXllcnxlbnwxfHx8fDE3NzA5NzgwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function Courses() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParam || '');

  useEffect(() => {
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam) setSearchQuery(searchParam);
  }, [categoryParam, searchParam]);

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'aquatic', name: 'Aquatic Sports' },
    { id: 'combat', name: 'Combat Sports' },
    { id: 'team', name: 'Team Sports' },
    { id: 'rescue', name: 'Rescue & First Aid' },
    { id: 'online', name: 'Online Courses' },
  ];

  const courses = [
    { id: 1, title: 'Professional Swimming Training', category: 'aquatic', level: 'All Levels', duration: '12 weeks', students: 245, rating: 4.9, price: 'AED 2,500', image: heroImage, online: true, physical: true, description: 'Complete swimming program from beginner to advanced levels.', features: ['Toddlers to Adults', 'Olympic Techniques', 'Competition Prep'] },
    { id: 2, title: 'Fins Swimming Mastery', category: 'aquatic', level: 'Intermediate', duration: '8 weeks', students: 128, rating: 4.8, price: 'AED 1,800', image: heroImage, online: false, physical: true, description: 'Advanced fins swimming techniques and competition training.', features: ['Speed Training', 'Technique Mastery', 'Competition Ready'] },
    { id: 3, title: 'Boxing Fundamentals', category: 'combat', level: 'Beginner', duration: '10 weeks', students: 189, rating: 4.9, price: 'AED 2,200', image: boxingImage, online: true, physical: true, description: 'Learn boxing basics from professional coaches.', features: ['Footwork', 'Punching Techniques', 'Defense Strategies'] },
    { id: 4, title: 'Advanced MMA Training', category: 'combat', level: 'Advanced', duration: '16 weeks', students: 156, rating: 5.0, price: 'AED 3,500', image: boxingImage, online: false, physical: true, description: 'Complete mixed martial arts program for serious athletes.', features: ['Striking & Grappling', 'Fight Strategy', 'Conditioning'] },
    { id: 5, title: 'Kickboxing Elite', category: 'combat', level: 'Intermediate', duration: '12 weeks', students: 203, rating: 4.8, price: 'AED 2,400', image: boxingImage, online: true, physical: true, description: 'High-intensity kickboxing training for fitness and competition.', features: ['Muay Thai Style', 'Cardio Conditioning', 'Self Defense'] },
    { id: 6, title: 'Basketball Skills Development', category: 'team', level: 'All Levels', duration: '10 weeks', students: 167, rating: 4.7, price: 'AED 2,000', image: basketballImage, online: false, physical: true, description: 'Comprehensive basketball training program.', features: ['Ball Handling', 'Shooting Drills', 'Team Tactics'] },
    { id: 7, title: 'Football Academy Program', category: 'team', level: 'Youth & Adult', duration: '14 weeks', students: 312, rating: 4.9, price: 'AED 2,300', image: footballImage, online: false, physical: true, description: 'Professional football training for all age groups.', features: ['Technical Skills', 'Tactical Training', 'Match Preparation'] },
    { id: 8, title: 'Gymnastics Excellence', category: 'individual', level: 'All Levels', duration: '12 weeks', students: 198, rating: 4.8, price: 'AED 2,600', image: gymnasticsImage, online: false, physical: true, description: 'Complete gymnastics training from basics to advanced.', features: ['Floor Routines', 'Apparatus Training', 'Flexibility'] },
    { id: 9, title: 'Lifeguard Certification', category: 'rescue', level: 'Certification', duration: '6 weeks', students: 423, rating: 5.0, price: 'AED 1,500', image: rescueImage, online: true, physical: true, description: 'International lifeguard certification with practical training.', features: ['Water Rescue', 'CPR & First Aid', 'ILS Certified'] },
    { id: 10, title: 'First Aid & CPR Certification', category: 'rescue', level: 'Certification', duration: '4 weeks', students: 567, rating: 5.0, price: 'AED 1,200', image: rescueImage, online: true, physical: true, description: 'Comprehensive first aid and CPR training with international certificate.', features: ['Emergency Response', 'Medical Basics', 'CMAS Certified'] },
    { id: 11, title: 'Karate Traditional Training', category: 'combat', level: 'All Levels', duration: '12 weeks', students: 234, rating: 4.9, price: 'AED 2,100', image: boxingImage, online: false, physical: true, description: 'Traditional karate training with belt progression.', features: ['Kata Mastery', 'Kumite Training', 'Belt Advancement'] },
    { id: 12, title: 'Taekwondo Championship Prep', category: 'combat', level: 'Intermediate', duration: '10 weeks', students: 176, rating: 4.8, price: 'AED 2,200', image: boxingImage, online: false, physical: true, description: 'Competition-focused Taekwondo training program.', features: ['Sparring', 'Poomsae', 'Competition Strategy'] },
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOnline = selectedCategory === 'online' ? course.online : true;
    return matchesCategory && matchesSearch && matchesOnline;
  });

  return (
    <div className="pt-20">
      {/* Hero Section — always dark bg */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Explore Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Courses</span>
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

      {/* Courses Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    {course.online && <span className="px-3 py-1 bg-cyan-500/90 backdrop-blur-sm text-white text-xs rounded-full font-medium">Online</span>}
                    {course.physical && <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs rounded-full font-medium">Physical</span>}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs rounded-full">
                      {course.level}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{course.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {course.features.map((feature, fIndex) => (
                      <span key={fIndex} className="px-2 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded-lg">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{course.price}</span>
                    <Link
                      to="/signup"
                      className="group/btn px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center space-x-2"
                    >
                      <span>Enroll Now</span>
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
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
        </div>
      </section>

      {/* Pool Management CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">Pool Management & Maintenance Services</h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Professional pool management services for sports facilities, hotels, and residential complexes
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
              >
                <span>Request a Quote</span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
