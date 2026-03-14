import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Users, Star, Award, Calendar, MapPin, Globe, CheckCircle2, UserCircle2, ChevronRight } from 'lucide-react';

interface CourseDetailsModalProps {
  course: any;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: () => void;
  usingFallback?: boolean;
}

// ── Static image map by category ─────────────────────────────
const CATEGORY_IMAGES: Record<string, string> = {
  aquatic:    'https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  combat:     'https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  team:       'https://images.unsplash.com/photo-1587166088004-bbd20854280f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  individual: 'https://images.unsplash.com/photo-1621046590909-be3de07237a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  rescue:     'https://images.unsplash.com/photo-1770215252183-da5f44f2851c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  default:    'https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
};

function getCourseImage(course: any): string {
  if (course.image_url) return course.image_url;
  return CATEGORY_IMAGES[course.category] ?? CATEGORY_IMAGES.default;
}

export function CourseDetailsModal({ course, isOpen, onClose, onEnroll, usingFallback = false }: CourseDetailsModalProps) {
  if (!course) return null;

  const formatPrice = (price: number | string | null): string => {
    if (price === null || price === undefined) return 'Contact us';
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return `AED ${num.toLocaleString()}`;
  };

  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      aquatic: 'Aquatic Sports',
      combat: 'Combat Sports',
      team: 'Team Sports',
      individual: 'Individual Sports',
      rescue: 'Rescue & First Aid',
      service: 'Professional Services',
    };
    return labels[category] || category;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-5xl bg-card rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full transition-all hover:rotate-90 duration-300"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Hero Section with Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={getCourseImage(course)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Floating badges */}
                  <div className="absolute top-6 left-6 flex gap-3">
                    {course.is_online && (
                      <span className="px-4 py-2 bg-cyan-500/90 backdrop-blur-sm text-white text-sm rounded-full font-medium shadow-lg">
                        🌐 Online Available
                      </span>
                    )}
                    {course.is_physical && (
                      <span className="px-4 py-2 bg-blue-500/90 backdrop-blur-sm text-white text-sm rounded-full font-medium shadow-lg">
                        🏢 Physical Training
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-sm rounded-full font-medium">
                        {getCategoryLabel(course.category)}
                      </span>
                      <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full">
                        {course.level}
                      </span>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">{course.title}</h2>
                    
                    {/* Instructor */}
                    <div className="flex items-center gap-2 text-gray-300">
                      <UserCircle2 className="w-5 h-5 text-cyan-400" />
                      {course.instructor?.full_name ? (
                        <span className="text-cyan-300 font-medium">
                          Instructor: {course.instructor.full_name}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">Coach to be assigned</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-muted/50 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-cyan-500/20 rounded-lg">
                          <Clock className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="text-muted-foreground text-sm">Duration</span>
                      </div>
                      <p className="text-xl font-bold text-foreground">{course.duration}</p>
                    </div>

                    {course.enrolled_count > 0 && (
                      <div className="bg-muted/50 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Users className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="text-muted-foreground text-sm">Students</span>
                        </div>
                        <p className="text-xl font-bold text-foreground">{course.enrolled_count}</p>
                      </div>
                    )}

                    {course.max_capacity && (
                      <div className="bg-muted/50 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Award className="w-5 h-5 text-purple-400" />
                          </div>
                          <span className="text-muted-foreground text-sm">Max Capacity</span>
                        </div>
                        <p className="text-xl font-bold text-foreground">{course.max_capacity}</p>
                      </div>
                    )}

                    <div className="bg-muted/50 border border-cyan-500/20 rounded-xl p-4 hover:border-cyan-500/40 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <span className="text-muted-foreground text-sm">Status</span>
                      </div>
                      <p className="text-xl font-bold text-green-400">Active</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-muted/50 border border-cyan-500/20 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                      Course Overview
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{course.description}</p>
                  </div>

                  {/* Features/What You'll Learn */}
                  {course.features && course.features.length > 0 && (
                    <div className="bg-muted/50 border border-cyan-500/20 rounded-2xl p-6">
                      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                        <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                        What You'll Learn
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {course.features.map((feature: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 group"
                          >
                            <div className="mt-1 p-1 bg-cyan-500/20 rounded-full group-hover:bg-cyan-500/30 transition-all">
                              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="text-muted-foreground text-lg group-hover:text-foreground transition-colors">
                              {feature}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Location & Schedule Info */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.branch && (
                      <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <MapPin className="w-5 h-5 text-cyan-400" />
                          <span className="text-foreground font-semibold">Branch Location</span>
                        </div>
                        <p className="text-muted-foreground ml-8">{course.branch}</p>
                      </div>
                    )}

                    <div className="bg-cyan-500/5 border border-cyan-500/30 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-5 h-5 text-cyan-400" />
                        <span className="text-foreground font-semibold">Enrollment Status</span>
                      </div>
                      <p className="text-green-500 font-medium ml-8">Now Accepting Students</p>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="bg-muted/50 border border-cyan-500/40 rounded-2xl p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div>
                        <p className="text-muted-foreground text-sm mb-2">Course Investment</p>
                        <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          {formatPrice(course.price)}
                        </p>
                        {course.price && (
                          <p className="text-muted-foreground text-sm mt-2">Full course access • Certification included</p>
                        )}
                      </div>

                      <button
                        onClick={onEnroll}
                        disabled={usingFallback}
                        className="group/btn px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={usingFallback ? 'Run seed SQL first to enable enrollment' : undefined}
                      >
                        <span>Enroll in This Course</span>
                        <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
                    <Award className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-foreground font-semibold mb-1">International Certification</p>
                      <p className="text-muted-foreground text-sm">
                        Upon successful completion, receive internationally recognized certification from official sports federations.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}