import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import {
  Facebook, Instagram, Linkedin, Phone, Mail,
  ChevronLeft, ChevronRight, Award, Star, Users,
} from 'lucide-react';

// ============================================================
// COACHES DATA — ADD MORE COACHES HERE
// ============================================================
const COACHES = [
  {
    id: 1,
    name: 'Dr. Usama Abdelmubdy',
    role: 'Chairman',
    specialty: 'Sports Management & Emergency Medical Training',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'Former coach of the Egyptian National Team and Former Executive Director of Sports Programs at Leejam (Fitness Time), overseeing over 150 branches in 5 Arab countries. Certified instructor by NAEMT (USA) and certified by the European Resuscitation Council (ERC) for medical and emergency training.',
    experience: '30+ Years',
    certifications: ['NAEMT Certified (USA)', 'European Resuscitation Council (ERC)', 'former Egyptian National Team Coach', 'former Leejam Executive Director'],
    phone: '+971 50 425 4664',
    email: 'o-mobdy@gmail.com',
    social: null,
  },
  {
    id: 2,
    name: 'Coach Ahmed Al Mansouri',
    role: 'Head Swimming Coach',
    specialty: 'Olympic Swimming & Fins Swimming',
    image: 'https://images.unsplash.com/photo-1677170274581-b85e8469846c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwc3dpbW1pbmclMjBjb2FjaCUyMGF0aGxldGljJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjY1NjQ5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Former National Team swimmer with 15+ years of elite coaching experience across the UAE and GCC. Specialises in competitive swimming, fins swimming, and advanced lifeguard training. His athletes have represented the UAE in multiple international championships.',
    experience: '15+ Years',
    certifications: ['IWSF Master Coach', 'ILS Instructor', 'CMAS Level 3', 'UAE Swimming Federation'],
    phone: '+971 56 848 8141',
    email: 'admin@blackviral.club',
    social: null,
  },
  {
    id: 3,
    name: 'Dr. Fatima Al Shorbagy',
    role: 'BOD Member',
    specialty: 'Speech & Language Pathology / Behavioral Modification',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'Specialist in Speech & Language Pathology with over 20 years of experience in Egypt and Saudi Arabia. ABA Specialist (Board Certified, USA), Montessori Teacher (American Montessori Board), and Behavioral Modification Specialist.',
    experience: '20+ Years',
    certifications: ['ABA Specialist – Board Certified (USA)', 'Montessori Teacher – American Montessori Board', 'MSc Speech & Language Disorders', 'Behavioral Modification Specialist'],
    phone: '+971 50 425 4664',
    email: 'office@vertex-ac.com',
    social: null,
  },
  {
    id: 4,
    name: 'C. Kariem Mohamed',
    role: 'BOD Member',
    specialty: 'Open Water & Competitive Swimming',
    image: 'https://images.unsplash.com/photo-1677170274581-b85e8469846c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'Former Egyptian National Team swimmer ranked among the world\'s Top 10 open-water swimmers in 2012. Senior technical director in the UAE for over 5 years, bringing elite international experience to athlete development.',
    experience: '10+ Years',
    certifications: ['Top 10 World Open Water (2012)', 'Egyptian National Team', 'Senior Technical Director UAE', 'Open Water Specialist'],
    phone: '+971 50 425 4664',
    email: 'office@vertex-ac.com',
    social: null,
  },
  {
    id: 5,
    name: 'C. Asmaa Khalil',
    role: 'BOD Member',
    specialty: 'International Gymnastics & Athlete Development',
    image: 'https://images.unsplash.com/photo-1669627960958-b4a809aa76ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'International gymnast and FIG-certified coach who has trained and supervised more than 10,000 athletes throughout her distinguished career in gymnastics and athletic conditioning.',
    experience: '10+ Years',
    certifications: ['FIG Certified Coach', 'International Gymnast', 'Athlete Development Expert', '10,000+ Athletes Trained'],
    phone: '+971 50 425 4664',
    email: 'office@vertex-ac.com',
    social: null,
  },
  {
    id: 6,
    name: 'Alaa Adel Elsakhawy',
    role: 'Gymnastics Coach',
    specialty: 'Artistic Gymnastics – All Levels & Age Categories',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'Holds a Master\'s Degree in Sports Injuries & Rehabilitation from Alexandria University (Ph.D. in progress). Over 5 years coaching Artistic Gymnastics. Certified in Artistic Gymnastics Judging by the Egyptian Gymnastics Federation and proficient in the USA Gymnastics Program.',
    experience: '5+ Years',
    certifications: ['MSc Sports Injuries & Rehab – Alexandria Uni', 'Egyptian Gymnastics Federation Judge', 'USA Gymnastics Program', 'Artistic Gymnastics Coach'],
    phone: '+971 50 425 4664',
    email: 'office@vertex-ac.com',
    social: null,
  },
  {
    id: 7,
    name: 'Omar El-Houssiny',
    role: 'Swimming Coach',
    specialty: 'All-Ages Swimming, Water Safety & Emergency Response',
    image: 'https://images.unsplash.com/photo-1590071089561-5e6ae99a8542?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: '5+ years coaching swimmers of all ages with strong results in technique improvement and performance development. Specialist in water safety, emergency response, and high-standard safety protocols.',
    experience: '5+ Years',
    certifications: ['Water Safety Specialist', 'Emergency Response Protocol', 'Competitive Swimming Coach', 'Group & Personal Training'],
    phone: '+971 50 425 4664',
    email: 'office@vertex-ac.com',
    social: null,
  },
  // ============================================================
  // ADD MORE COACHES BELOW THIS LINE
  // ============================================================
];

// Accent colours — each index maps to one coach card
const CARD_ACCENTS = [
  'from-cyan-500/20 to-blue-600/10 border-cyan-500/30 hover:border-cyan-400/60',
  'from-purple-500/20 to-pink-600/10 border-purple-500/30 hover:border-purple-400/60',
  'from-red-500/20 to-orange-600/10 border-red-500/30 hover:border-red-400/60',
  'from-green-500/20 to-teal-600/10 border-green-500/30 hover:border-green-400/60',
  'from-yellow-500/20 to-amber-600/10 border-yellow-500/30 hover:border-yellow-400/60',
  'from-blue-500/20 to-indigo-600/10 border-blue-500/30 hover:border-blue-400/60',
];

const GLOW_COLOURS = [
  'shadow-[0_0_30px_rgba(6,182,212,0.25)]',
  'shadow-[0_0_30px_rgba(168,85,247,0.25)]',
  'shadow-[0_0_30px_rgba(239,68,68,0.25)]',
  'shadow-[0_0_30px_rgba(34,197,94,0.25)]',
  'shadow-[0_0_30px_rgba(234,179,8,0.25)]',
  'shadow-[0_0_30px_rgba(59,130,246,0.25)]',
];

// Badge colours that work on both light and dark backgrounds
const BADGE_COLOURS = [
  'bg-cyan-100 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/20',
  'bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/20',
  'bg-red-100 dark:bg-red-500/15 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-500/20',
  'bg-green-100 dark:bg-green-500/15 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-500/20',
  'bg-yellow-100 dark:bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-500/20',
  'bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-500/20',
];

export function OurTeam() {
  usePageTitle('Our Team');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = COACHES[selectedIndex];
  const accentClass = CARD_ACCENTS[selectedIndex % CARD_ACCENTS.length];
  const glowClass = GLOW_COLOURS[selectedIndex % GLOW_COLOURS.length];

  const goNext = () => setSelectedIndex((prev) => (prev + 1) % COACHES.length);
  const goPrev = () => setSelectedIndex((prev) => (prev - 1 + COACHES.length) % COACHES.length);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-32">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-500/60" />
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-medium tracking-widest uppercase">Black Viral AC</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl">
            World-class coaches and specialists dedicated to unlocking your athletic potential. Each
            member is internationally certified and committed to the highest standards of excellence.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { icon: Users, label: `${COACHES.length} Expert Coaches` },
              { icon: Award, label: '50+ Certifications' },
              { icon: Star, label: 'Internationaly Verified' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Layout: Featured Card + Grid */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* LEFT: Featured Coach Card */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.4 }}
                className={`relative rounded-3xl border bg-gradient-to-br backdrop-blur-sm overflow-hidden bg-white dark:bg-transparent ${accentClass} ${glowClass} transition-shadow duration-500`}
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

                {/* Photo */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-gray-200">
                    {selectedIndex + 1} / {COACHES.length}
                  </div>

                  {selected.social && (
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {[
                      { href: selected.social.facebook, Icon: Facebook },
                      { href: selected.social.instagram, Icon: Instagram },
                      { href: selected.social.linkedin, Icon: Linkedin },
                    ].map(({ href, Icon }) => (
                      <a
                        key={Icon.displayName}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-cyan-500/40 hover:text-cyan-300 transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selected.name}</h2>
                    <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium mt-0.5">{selected.role}</p>
                    <div className="mt-1 h-px bg-gradient-to-r from-cyan-500/40 to-transparent" />
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{selected.bio}</p>

                  {/* Specialty & experience */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-3">
                      <p className="text-gray-500 dark:text-gray-500 text-xs mb-1">Specialty</p>
                      <p className="text-gray-800 dark:text-white text-xs font-medium">{selected.specialty}</p>
                    </div>
                    <div className="bg-gray-100 dark:bg-white/5 rounded-xl p-3">
                      <p className="text-gray-500 dark:text-gray-500 text-xs mb-1">Experience</p>
                      <p className="text-gray-800 dark:text-white text-xs font-medium">{selected.experience}</p>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mb-2">Certifications</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.certifications.map((cert) => (
                        <span
                          key={cert}
                          className={`px-2 py-0.5 rounded-full text-xs ${BADGE_COLOURS[selectedIndex % BADGE_COLOURS.length]}`}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="border-t border-gray-200 dark:border-white/10 pt-4 space-y-2">
                    <a
                      href={`tel:${selected.phone}`}
                      className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span>{selected.phone}</span>
                    </a>
                    <a
                      href={`mailto:${selected.email}`}
                      className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span>{selected.email}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev / Next */}
            <div className="flex items-center gap-3 mt-5 justify-end">
              <button
                onClick={goPrev}
                className="w-11 h-11 rounded-2xl border border-cyan-500/30 bg-white dark:bg-white/5 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 hover:border-cyan-400/60 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white transition-all duration-200 shadow-sm"
                aria-label="Previous coach"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="w-11 h-11 rounded-2xl border border-cyan-500/30 bg-white dark:bg-white/5 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 hover:border-cyan-400/60 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-white transition-all duration-200 shadow-sm"
                aria-label="Next coach"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Grid of all coaches */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {COACHES.map((coach, index) => {
                const isActive = index === selectedIndex;
                const gridAccent = CARD_ACCENTS[index % CARD_ACCENTS.length];
                const gridGlow = GLOW_COLOURS[index % GLOW_COLOURS.length];

                return (
                  <motion.button
                    key={coach.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.4 }}
                    onClick={() => setSelectedIndex(index)}
                    className={`group relative rounded-2xl border bg-gradient-to-br bg-white dark:bg-transparent backdrop-blur-sm overflow-hidden text-left transition-all duration-300 ${gridAccent} ${
                      isActive ? `${gridGlow} scale-[1.03]` : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCoach"
                        className="absolute inset-0 border-2 border-cyan-400/50 rounded-2xl z-10 pointer-events-none"
                      />
                    )}

                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={coach.image}
                        alt={coach.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>

                    <div className="p-3">
                      <p className="text-gray-900 dark:text-white text-xs font-semibold leading-tight line-clamp-1">
                        {coach.name}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5 line-clamp-1">{coach.role}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Join CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 relative rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-600/10 to-blue-700/5 dark:from-cyan-600/15 dark:to-blue-700/10 backdrop-blur-sm overflow-hidden p-6"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] pointer-events-none" />
              <div className="relative">
                <h3 className="text-gray-900 dark:text-white font-bold mb-1">Are you a certified coach?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  We're always looking for passionate professionals to join our elite team.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:shadow-[0_0_24px_rgba(6,182,212,0.5)] transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                  Apply Now
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom: Full Roster strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-gray-900 dark:text-white font-bold text-xl">Full Roster</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
            <span className="text-gray-500 dark:text-gray-500 text-sm">{COACHES.length} coaches</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COACHES.map((coach, index) => (
              <motion.div
                key={coach.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.06 }}
                className={`flex items-center gap-4 rounded-2xl border bg-gradient-to-br bg-white dark:bg-transparent backdrop-blur-sm p-4 cursor-pointer transition-all duration-300 ${CARD_ACCENTS[index % CARD_ACCENTS.length]}`}
                onClick={() => {
                  setSelectedIndex(index);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-gray-900 dark:text-white text-sm font-semibold truncate">{coach.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs truncate">{coach.role}</p>
                  <p className="text-cyan-600 dark:text-cyan-500 text-xs mt-0.5">{coach.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}