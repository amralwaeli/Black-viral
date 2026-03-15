import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { 
  Award, 
  Users, 
  Globe, 
  Shield, 
  ArrowRight, 
  Play,
  CheckCircle,
  Trophy,
  Target,
  Zap,
  Droplets,
  GraduationCap,
  Wrench,
  FlaskConical,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { VideoModal } from '../components/VideoModal';
import { EventsCarousel } from '../components/EventsCarousel';
import { Testimonials } from '../components/Testimonials';
import { CoachesSection } from '../components/CoachesSection';

const heroImage = "https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB0cmFpbmluZyUyMGF0aGxldGV8ZW58MXx8fHwxNzcwOTc4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const boxingImage = "https://images.unsplash.com/photo-1633715398353-1faf3874a597?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3hpbmclMjBraWNrYm94aW5nJTIwZmlnaHRlcnxlbnwxfHx8fDE3NzA5NzgwMjd8MA&ixlib=rb-4.1.0&q=80&w=1080";
const basketballImage = "https://images.unsplash.com/photo-1587166088004-bbd20854280f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwdGVhbSUyMHNwb3J0fGVufDF8fHx8MTc3MDk3ODAyN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const gymnasticsImage = "https://images.unsplash.com/photo-1621046590909-be3de07237a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxneW1uYXN0aWNzJTIwYXRobGV0ZSUyMHRyYWluaW5nfGVufDF8fHx8MTc3MDk3ODAyOHww&ixlib=rb-4.1.0&q=80&w=1080";
const rescueImage = "https://images.unsplash.com/photo-1770215252183-da5f44f2851c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJzdCUyMGFpZCUyMHJlc2N1ZSUyMHRyYWluaW5nfGVufDF8fHx8MTc3MDk3ODAyOHww&ixlib=rb-4.1.0&q=80&w=1080";
const footballImage = "https://images.unsplash.com/photo-1650501889311-f7c877f1042d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHNvY2NlciUyMHBsYXllcnxlbnwxfHx8fDE3NzA5NzgwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080";

export function Home() {
  usePageTitle('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const stats = [
    { icon: Users, value: '1,000+', label: 'Athletes Trained' },
    { icon: Award, value: '50+', label: 'Certified Programs' },
    { icon: Globe, value: 'UAE', label: 'Located in' },
    { icon: Shield, value: '15+', label: 'Expert Coaches' },
  ];

  // ── Training photo strips — replace '' with your photo paths when ready ──
  // e.g. '/src/assets/training/photo1.jpg'
  const trainingRow1 = ['', '', '', '', '', '', '', ''];
  const trainingRow2 = ['', '', '', '', '', '', '', ''];

  const features = [
    {
      icon: Shield,
      title: 'International Certification',
      description: 'Accredited by IWSF, ILS, CMAS, and more',
    },
    {
      icon: Target,
      title: 'Expert Coaching',
      description: 'World-class trainers with proven track records',
    },
    {
      icon: Zap,
      title: 'Flexible Learning',
      description: 'Physical and online courses available',
    },
    {
      icon: Globe,
      title: 'Global Recognition',
      description: 'Certificates recognized worldwide',
    },
  ];

  return (
    <div className="pt-20">
      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your actual promo video URL
      />

      {/* Hero Section - MOBILE OPTIMIZED */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-cyan-50 dark:from-gray-950 dark:via-slate-900 dark:to-cyan-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="text-cyan-600 dark:text-cyan-400 text-xs sm:text-sm font-medium">Elite Sports Academy in UAE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-slate-900 dark:text-white">
                  Transform Into
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 bg-clip-text text-transparent">
                  A Champion
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-gray-300 leading-relaxed">
                Join Black Viral AC - Your gateway to world-class sports training, international certifications, and professional excellence in the UAE.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/courses"
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-cyan-500/30 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-white dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Watch Video</span>
                </button>
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6 pt-4">
                {stats.slice(0, 2).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:block hidden"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                <img
                  src={heroImage}
                  alt="Athletic Training"
                  className="w-full h-[500px] lg:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>

              {/* Floating Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/95 dark:bg-gray-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm mb-1">Next Session Starts</p>
                    <p className="text-slate-900 dark:text-white font-semibold text-sm sm:text-base">April 1, 2026</p>
                  </div>
                  <Link
                    to="/signup"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all text-xs sm:text-sm"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - MOBILE OPTIMIZED */}
      <section className="py-12 sm:py-16 lg:py-20 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-card text-card-foreground backdrop-blur-sm border border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                  <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600 dark:text-cyan-400 mb-3 sm:mb-4" />
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-card-foreground mb-2">{stat.value}</div>
                  <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 sm:mt-12 text-center"
          >
            <Link
              to="/signup"
              className="inline-flex items-center space-x-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 text-sm sm:text-base"
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Start Your Journey</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Sport Categories - MOBILE OPTIMIZED */}
      <section className="py-12 sm:py-16 lg:py-20 relative bg-gradient-to-b from-slate-50 to-white dark:from-transparent dark:to-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4">
              Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Training Programs</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-gray-400">See our athletes in action across various disciplines</p>
          </motion.div>
        </div>

        {/* ── Infinite scroll strips ── */}
        <style>{`
          @keyframes scroll-left {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .strip-left  { animation: scroll-left  35s linear infinite; }
          .strip-right { animation: scroll-right 35s linear infinite; }
          .strip-left:hover,
          .strip-right:hover { animation-play-state: paused; }
        `}</style>

        {/* Row 1 — scrolls left */}
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="flex strip-left w-max">
            {[...trainingRow1, ...trainingRow1].map((src, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-72 h-52 mx-3 rounded-2xl overflow-hidden group bg-muted border-2 border-dashed border-cyan-500/30 flex items-center justify-center"
              >
                {src ? (
                  <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-cyan-500/50 select-none">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-xs font-medium">Your Photo</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-background to-transparent z-10 pointer-events-none" />
          <div className="flex strip-right w-max">
            {[...trainingRow2, ...trainingRow2].map((src, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 w-72 h-52 mx-3 rounded-2xl overflow-hidden group bg-muted border-2 border-dashed border-cyan-500/30 flex items-center justify-center"
              >
                {src ? (
                  <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-cyan-500/50 select-none">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-xs font-medium">Your Photo</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA below strips */}
        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 group"
          >
            <span>Explore All Programs</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Trainees Slider removed - merged into Programs section above */}

      {/* Why Choose Us Section - NEW */}
      <section className="py-20 relative bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Black Viral AC</span>
            </h2>
            <p className="text-xl text-slate-700 dark:text-gray-400 max-w-3xl mx-auto">
              Experience excellence in sports education with our unique approach to athletic development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Multiple Federation Accreditations',
                description: 'Officially affiliated with IWSF, ILS, NEAMT, CMAS, and UAE Sports Federation',
                color: 'from-yellow-500 to-orange-500',
              },
              {
                icon: Users,
                title: 'Experienced Coaching Staff',
                description: '15+ certified international coaches with proven track records in competitive sports',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Target,
                title: 'Personalized Training Programs',
                description: 'Tailored curriculum designed to match your skill level and athletic goals',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: Globe,
                title: 'International Recognition',
                description: 'Certifications accepted worldwide for professional and competitive advancement',
                color: 'from-green-500 to-teal-500',
              },
              {
                icon: Shield,
                title: 'Safety-First Approach',
                description: 'Comprehensive safety protocols and emergency response training in all programs',
                color: 'from-red-500 to-orange-500',
              },
              {
                icon: Zap,
                title: 'Hybrid Learning Options',
                description: 'Flexible scheduling with both physical and online course delivery methods',
                color: 'from-cyan-500 to-blue-500',
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Section - NEW */}
      <section className="py-20 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Professional Services</span>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Other <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-slate-700 dark:text-gray-400 max-w-3xl mx-auto">
              Beyond sports training, we offer internationally accredited certification courses and professional pool management services
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Certification Courses Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500"
            >
              <div className="p-8 sm:p-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground">Certification Courses</h3>
                    <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium">Internationally Accredited</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Professional qualifications that open doors to global career opportunities in aquatics, emergency response, and fitness training.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    'Pool Lifeguard Certification (IWSF)',
                    'First Aid & CPR (NAEMT)',
                    'Swimming Instructor Training',
                    'Babies Swimming Instructor',
                    'Aqua Aerobics Instructor',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <span className="text-card-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-3 text-sm text-muted-foreground bg-white/50 dark:bg-white/5 rounded-xl p-4 border border-cyan-500/20">
                  <Award className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  <span>Accredited by IWSF, NAEMT, ILS, and International Aquatics Federation</span>
                </div>
              </div>
            </motion.div>

            {/* Pool Management Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 to-cyan-600/10 border border-teal-500/30 hover:border-teal-500/60 transition-all duration-500"
            >
              <div className="p-8 sm:p-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-card-foreground">Pool Management</h3>
                    <p className="text-teal-600 dark:text-teal-400 text-sm font-medium">Professional Services</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Complete pool and jacuzzi management solutions for sports facilities, hotels, residential complexes, and private properties.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: FlaskConical, text: 'Water Testing & Monitoring' },
                    { icon: Droplets, text: 'Treatment & Chemical Balance' },
                    { icon: Shield, text: 'Safety & Compliance Audits' },
                    { icon: Wrench, text: 'Maintenance & Cleaning' },
                    { icon: GraduationCap, text: 'Staff Training Programs' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-teal-500/20 rounded-lg flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-card-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-3 text-sm text-muted-foreground bg-white/50 dark:bg-white/5 rounded-xl p-4 border border-teal-500/20">
                  <Users className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                  <span>Managed 150+ pools across UAE & Saudi Arabia</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* View All Services CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/services"
              className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 group"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card text-card-foreground backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rescue & First Aid Section */}
      <section className="py-20 relative bg-gradient-to-b from-slate-50 to-white dark:from-transparent dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span className="text-red-600 dark:text-red-400 text-sm font-medium">Life-Saving Skills</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Rescue & First Aid <span className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">Certification</span>
              </h2>
              <p className="text-xl text-slate-700 dark:text-gray-300 mb-8 leading-relaxed">
                Gain internationally recognized certifications in water rescue, lifeguard training, and emergency first aid. Our comprehensive programs are accredited by ILS, NEAMT, and European Commissions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Water Rescue Techniques',
                  'CPR & AED Training',
                  'Emergency Response',
                  'Lifeguard Certification',
                ].map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-slate-700 dark:text-gray-300">{skill}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/courses"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300"
              >
                <span>Get Certified</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-500/20">
                <img
                  src={rescueImage}
                  alt="First Aid Training"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications & Affiliations — FIXED: org text color */}
      <section className="py-20 relative bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Accredited By <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">World Leaders</span>
            </h2>
            <p className="text-xl text-slate-700 dark:text-gray-400">Recognized by international sports federations and organizations</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: 'IWSF', label: 'Int\'l Water Sports Federation' },
              { name: 'ILS', label: 'Int\'l Life Saving Federation' },
              { name: 'NEAMT', label: 'Nat\'l Emergency & Medical Training' },
              { name: 'EU Commission', label: 'European Commission' },
              { name: 'CMAS', label: 'World Underwater Federation' },
              { name: 'UAE Fed', label: 'UAE Sports Federation' },
            ].map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-xl flex items-center justify-center mb-3 group-hover:border-cyan-500/40 transition-all">
                  <span className="text-lg font-black text-cyan-600 dark:text-cyan-400 text-center leading-tight px-1">{org.name}</span>
                </div>
                <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{org.label}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA After Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              to="/certifications"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300"
            >
              <Award className="w-5 h-5" />
              <span>View All Certifications</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Coaches */}
      <CoachesSection />

      {/* Events */}
      <EventsCarousel />

      {/* Pool Management Services */}
      <section className="py-20 relative bg-gradient-to-b from-slate-50 to-white dark:from-transparent dark:to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                <img
                  src={heroImage}
                  alt="Pool Management"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6">
                <Droplets className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium">Professional Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Pool Management <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Services</span>
              </h2>
              <p className="text-xl text-slate-700 dark:text-gray-300 mb-8 leading-relaxed">
                Complete pool management solutions including maintenance, lifeguard staffing, safety audits, and operational excellence for fitness centers and sports facilities.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, text: 'Certified Lifeguards' },
                  { icon: Wrench, text: 'Pool Maintenance' },
                  { icon: CheckCircle, text: 'Safety Compliance' },
                  { icon: GraduationCap, text: 'Staff Training' },
                ].map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-slate-700 dark:text-gray-300">{service.text}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300"
              >
                <span>Request Quote</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 relative bg-white/50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 dark:from-cyan-950 dark:to-blue-950 p-12 md:p-16"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of athletes who have transformed their lives with Black Viral AC
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}