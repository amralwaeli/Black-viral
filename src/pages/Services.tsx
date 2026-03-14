import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { CheckCircle, Award, Shield, Droplets, FlaskConical, Waves, BookOpen, ChevronRight, Star, Globe, Users } from 'lucide-react';

// ── Data ─────────────────────────────────────────────────────────────────────

const certCourses = [
  {
    id: 'pool-lifeguard',
    title: 'Pool Lifeguard Certification',
    badge: 'IWSF Certified',
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.35)',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tagline: 'Internationally recognised rescue & first aid training',
    overview: [
      'Comprehensive rescue & first aid training (theory + practice)',
      'Led by internationally accredited experts',
      'Includes international manual, certificate & license (IWSF)',
      'Qualification valid worldwide, boosting career opportunities',
    ],
    category: 'rescue',
  },
  {
    id: 'first-aid-cpr',
    title: 'First Aid & CPR Course',
    badge: 'NAEMT Certified',
    color: 'from-rose-500 to-red-600',
    glow: 'rgba(244,63,94,0.35)',
    image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tagline: 'Critical lifesaving skills required by every organisation',
    overview: [
      'Critical training required by companies (private & government)',
      'Conducted by certified NAEMT trainers (USA)',
      'Covers emergency response & lifesaving techniques',
      'Provides international paramedic license & accreditation',
    ],
    category: 'rescue',
  },
  {
    id: 'swimming-instructor',
    title: 'Swimming Instructor Training',
    badge: 'IWSF Certified',
    color: 'from-teal-500 to-cyan-600',
    glow: 'rgba(20,184,166,0.35)',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tagline: 'Three-level integrated aquatics coaching program',
    overview: [
      'Three-level integrated program (Level 1, 2, 3 — Master Assistant)',
      'Equips instructors to teach all ages, beginners to advanced',
      'Internationally recognised certificates + business license',
      'Opens global career opportunities in aquatics coaching',
    ],
    category: 'aquatic',
  },
  {
    id: 'babies-swimming',
    title: 'Babies Swimming Instructor',
    badge: 'Intl. Aquatics Federation',
    color: 'from-sky-400 to-indigo-500',
    glow: 'rgba(56,189,248,0.35)',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tagline: 'Specialised infant aquatics instruction program',
    overview: [
      'Specialised program for infant swimming instruction',
      'Focus on safety, psychology, and handling of infants',
      'Provides international certificate & license (International Aquatics Federation)',
      'High-demand qualification with global recognition',
    ],
    category: 'aquatic',
  },
  {
    id: 'aqua-aerobics',
    title: 'Aqua Aerobics Instructor',
    badge: 'Internationally Licensed',
    color: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.35)',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900',
    tagline: 'Certified aquatic fitness & hydrotherapy instruction',
    overview: [
      'Training in aquatic fitness, hydrotherapy & fat-burning exercises',
      'Covers group & individual water workouts (with/without music)',
      'Includes course book + international certificate & license',
      'Enables trainers to conduct certified aqua fitness classes',
    ],
    category: 'aquatic',
  },
];

const poolServices = [
  {
    icon: FlaskConical,
    title: 'Testing & Monitoring',
    color: 'from-cyan-500 to-blue-600',
    items: ['Chlorine, pH, alkalinity, temperature', 'Testing done daily (3 times/day)', 'Full compliance reporting'],
  },
  {
    icon: Droplets,
    title: 'Water Treatment & Balance',
    color: 'from-teal-500 to-cyan-600',
    items: ['Maintain safe pH & chlorine levels', 'Use of chemicals safely & professionally', 'Emergency water correction'],
  },
  {
    icon: Shield,
    title: 'Chlorination',
    color: 'from-blue-500 to-indigo-600',
    items: ['Powder & tablet application', 'Auto-feeder system for consistent levels', 'Dosage tracking & records'],
  },
  {
    icon: Waves,
    title: 'Care & Maintenance',
    color: 'from-sky-500 to-cyan-600',
    items: ['Backwashing & filtration cleaning', 'Vacuuming & debris removal', 'Cloudy water treatment', 'Algae & bacteria control'],
  },
];

const accreditingBodies = [
  { name: 'IWSF', full: 'International Water Sports Federation', note: 'Established 2005 — global water sports development' },
  { name: 'NAEMT', full: 'National Association of Emergency Medical Technicians', note: 'USA-certified emergency medical training' },
  { name: 'Olympic', full: 'Olympic Summer Games', note: 'Internationally recognised competition standards' },
  { name: 'EU Commission', full: 'European Commission', note: 'European-accredited qualification framework' },
  { name: 'STCW', full: 'Standards of Training, Certification & Watchkeeping', note: 'Maritime safety & watchkeeping certification' },
  { name: 'Int. Aquatics', full: 'International Aquatics Federation', note: 'Global infant & aquatic program accreditation' },
];

const trainers = [
  {
    name: 'Dr. Usama Sayed',
    role: 'Water Sports Director & Elite Swimming Coach',
    color: 'from-cyan-500 to-blue-600',
    initials: 'US',
    highlights: [
      '30+ years of elite coaching experience',
      'Former international swimmer & two-time African champion',
      'Developed 1,500+ swimmers internationally',
      'Leadership roles at Fitness Time across UAE & Saudi Arabia',
      'Expert in athlete development & facility management',
      'Managed 150+ swimming pools across Saudi Arabia & UAE for 6+ years',
    ],
  },
  {
    name: 'Mohamed Sedik',
    role: 'World Champion & Master Trainer',
    color: 'from-amber-500 to-orange-600',
    initials: 'MS',
    highlights: [
      'World Champion in Fin Swimming',
      'Multiple international medals across competitions',
      'Former Fitness Manager at Fitness Time UAE',
      'Master Trainer with elite performance background',
      'Specialist in lifeguard, CPR & first aid certification',
      'Expert in coach evaluation & program development',
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export function Services() {
  usePageTitle('Services');
  return (
    <div className="pt-20">

      {/* ── Hero ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950 dark:from-gray-950 dark:via-slate-900 dark:to-cyan-950" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-16 left-16 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-8 right-16 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center space-x-2 px-4 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              <span>Internationally Accredited Programs</span>
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              Other{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Professional certification courses, pool management, and specialist training programs — all backed by world-class international accreditation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Certification Courses ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Certification Courses</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Professional Qualifications
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Internationally recognised certifications that open doors to global career opportunities in aquatics, emergency response, and fitness.
            </p>
          </motion.div>

          <div className="space-y-8">
            {certCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative bg-card border border-white/5 dark:border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500"
                style={{ boxShadow: `0 0 0 0 ${course.glow}` }}
              >
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image */}
                  <div className="md:col-span-2 relative overflow-hidden h-56 md:h-auto">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-30`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r ${course.color} text-white text-xs font-bold rounded-full shadow-lg`}>
                        <Globe className="w-3 h-3" />
                        <span>{course.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-3 p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm mb-2 font-medium">{course.tagline}</p>
                      <h3 className="text-2xl md:text-3xl font-black text-foreground mb-6">{course.title}</h3>
                      <ul className="space-y-3">
                        {course.overview.map((item, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 bg-gradient-to-r ${course.color} text-transparent`}
                              style={{ color: 'transparent', background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                            />
                            <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3 items-center">
                      <Link
                        to={`/courses?category=${course.category}`}
                        className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${course.color} text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300`}
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>View Course</span>
                      </Link>
                      <Link
                        to="/contact"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-background border border-border rounded-xl font-semibold text-sm text-foreground hover:border-cyan-500/50 transition-all duration-300"
                      >
                        <span>Enquire</span>
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accrediting Bodies ── */}
      <section className="py-20 bg-card/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-3">World-Class Accreditation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Our courses are recognised and accredited by leading international organisations, ensuring the highest standards of training and certification.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {accreditingBodies.map((body, index) => (
              <motion.div
                key={body.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
                className="group bg-background border border-border rounded-2xl p-5 text-center hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl flex items-center justify-center mb-3 border border-gray-200 dark:border-gray-700 group-hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg overflow-hidden">
                  <img 
                    src="https://via.placeholder.com/96x96/06b6d4/ffffff?text=LOGO" 
                    alt={body.name}
                    className="w-full h-full object-contain p-3 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p className="font-black text-foreground text-sm mb-1">{body.name}</p>
                <p className="text-muted-foreground text-xs leading-tight">{body.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pool & Jacuzzi Services ── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Pool Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                Pool & Jacuzzi<br />
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Management Services</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Professional pool management for sports facilities, hotels, residential complexes, and private properties — handled by certified water safety experts with decades of field experience across the UAE and Saudi Arabia.
              </p>

              {/* Expert callout */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 text-white font-black text-sm">
                    US
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-0.5">Dr. Usama Sayed</p>
                    <p className="text-cyan-600 dark:text-cyan-400 text-xs mb-2">Water Sports Director & Elite Swimming Coach</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Managed maintenance and operational monitoring of over <strong className="text-foreground">150 swimming pools</strong> across Saudi Arabia and the UAE for more than six years — ensuring safety, quality standards, and staff compliance.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-300 group"
              >
                <span>Request a Quote</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>

            {/* Services grid */}
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid sm:grid-cols-2 gap-5">
              {poolServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 group"
                >
                  <div className={`w-11 h-11 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-black text-foreground text-base mb-3">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mt-1.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-xs leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Expert Trainers ── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-gray-950 to-cyan-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 right-20 w-80 h-80 bg-cyan-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider">Expert Trainers</span>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">The People Behind Your Certification</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">World-class athletes and professionals who bring decades of real-world expertise to every course and service.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-500 group"
              >
                <div className="flex items-start space-x-5 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${trainer.color} flex items-center justify-center text-white font-black text-xl flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    {trainer.initials}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">{trainer.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium">{trainer.role}</p>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {trainer.highlights.map((h, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <Star className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_50%,_white_0%,_transparent_60%)]" />
            <div className="relative">
              <Users className="w-12 h-12 text-white/80 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-white mb-4">Ready to Get Certified?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
                Whether you want to upskill, launch a coaching career, or manage world-class aquatic facilities — we have a program for you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/courses" className="px-8 py-4 bg-white text-cyan-600 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">
                  Browse All Courses
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-2xl font-bold hover:bg-white/20 transition-all">
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