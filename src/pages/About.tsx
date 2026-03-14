import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import {
  Target, Users, Award, TrendingUp, Heart, Globe,
  CheckCircle, ArrowRight, Star, Shield, Zap, Clock,
  Building2, Handshake, Trophy, BookOpen, ChevronRight,
} from 'lucide-react';

const heroImage = 'https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const values = [
  { icon: Heart,      title: 'Life Skills',            description: 'Learning and participating in a sport you love with your friends and teammates teaches valuable life lessons — respect, dedication, punctuality, and strong work ethic.' },
  { icon: TrendingUp, title: 'Intrinsic Motivation',   description: 'No long-term results can ever be achieved through external motivation. We teach goal-setting and commitment to foster internal motivation that drives athletes to improve themselves.' },
  { icon: Users,      title: 'Child-Focused Learning', description: 'Our customers may be the parents, but our clients and main priority will always be our players.' },
  { icon: Shield,     title: 'Healthy Environment',    description: 'We strive to create a healthy and stimulating environment for our players, parents, and co-workers. We maintain a positive outlook toward everyone around us.' },
  { icon: Award,      title: 'Loyalty',                description: "We understand, agree with, and represent the Academy's concept, policies, and principles with confidence and commitment." },
  { icon: Clock,      title: 'On Time',                description: 'Employees always arrive at least 30 minutes before lessons begin to ensure smooth and efficient operations.' },
  { icon: Zap,        title: 'Fun, Fun, Fun!',         description: 'Sports, work, and life are meant to be enjoyable. We create a positive and fun experience for everyone involved.' },
];

const goals = [
  { number: '75',   label: 'Certified Safety Personnel', description: 'We aim to certify at least 75 safety personnel annually with internationally recognized safety certification to boost aquatic safety standards.', color: 'from-cyan-500 to-blue-600' },
  { number: '400',  label: 'New Competitive Swimmers',   description: 'Instilling a love for the sport in more than 400 swimmers annually to continue competitively in our teams after becoming water safe.', color: 'from-blue-500 to-indigo-600' },
  { number: '10',   label: 'Safe & Fun Locations',       description: 'Expanding accessibility through at least 10 water safety facilities across the Kingdom in the coming years.', color: 'from-teal-500 to-cyan-600' },
  { number: '2000', label: 'Children Water Safe',        description: 'Each Academy facility aims to help more than 2000 children annually become water safe, prevent drowning, and promote healthy lifestyles.', color: 'from-sky-500 to-blue-600' },
];

const trainingLevels = [
  { level: 'Beginners',      color: 'from-cyan-500 to-blue-500',    description: 'We start with the child from scratch, assess their level, and place them in the appropriate group and training system.' },
  { level: 'Middle Level',   color: 'from-blue-500 to-indigo-500',  description: 'The child begins to interact more confidently, and skills become more advanced, enabling progression to a higher level.' },
  { level: 'Advanced Level', color: 'from-indigo-500 to-purple-500', description: 'We prepare the child for higher-level training where they become eligible to participate in internal Academy tournaments.' },
  { level: 'Champions',      color: 'from-amber-500 to-orange-500', description: 'Selected athletes join elite teams to participate in major tournaments at the Kingdom and international levels.' },
];

const howWeTeach = [
  { title: 'Aquatic Safety',           description: 'We provide students with comprehensive aquatic safety education.' },
  { title: 'a Healthy Lifestyle',      description: 'Students understand the importance of exercise, discipline, and the consequences of healthy habits.' },
  { title: 'Values',                   description: 'Students learn discipline, commitment, respect, and responsibility from an early age.' },
  { title: 'Well-Rounded Individuals', description: 'Through structured drills and engaging exercises, students connect physical development with life skills.' },
  { title: 'Sports',                   description: 'Children learn the fundamentals of sport that translate into a competitive athletic pathway.' },
  { title: 'Themselves & Others',      description: 'Students develop self-awareness, teamwork skills, and respect for authority figures such as teachers, organizers, and lifeguards.' },
];

const operations = [
  'The Academy offers operational solutions for sports centers, clubs, and residential complexes.',
  'We provide certified trainers and managers at the highest levels.',
  'Our services include complete operational packages starting from planning, followed by management and full operational execution.',
];

const onboardingSteps = [
  { step: 'FIRST',  title: 'Interview',                       description: 'To allow both parties the opportunity to introduce themselves.' },
  { step: '2ND',    title: 'In-House Training',               description: 'Athlete protection course and police clearance verification.' },
  { step: 'THIRD',  title: 'Elite Athlete Observation',       description: 'Observation of elite squads to understand expected performance standards.' },
  { step: '4TH',    title: 'Expert Teacher Observation & Assisting', description: 'Practical teaching assistance under expert supervision.' },
  { step: 'FIFTH',  title: 'Solo Teaching & Accreditation',   description: 'Independent teaching with supervision while achieving accreditation.' },
  { step: '6TH',    title: 'Final Assessment & Employment',   description: 'Three-month probation period before final confirmation.' },
];

const certifications = [
  { name: 'NAEMT',    full: 'National Association of Emergency Medical Technicians (USA)', logo: '' },
  { name: 'ERC',      full: 'European Resuscitation Council',                              logo: '' },
  { name: 'ASCA',     full: 'American Swimming Coaches Association',                       logo: '' },
  { name: 'EBBF',     full: 'Emirates Bodybuilding & Fitness Federation',                  logo: '' },
  { name: 'ISSA',     full: 'International Sports Sciences Association',                    logo: '' },
  { name: 'REPs UAE', full: 'Registered Exercise Professional (UAE)',                      logo: '' },
  { name: 'IOC',      full: 'International Olympic Committee — Professional Development',  logo: '' },
  { name: 'IWSF',     full: 'International Water Sports Federation',                       logo: '' },
];

const partnerships = [
  { name: 'Ukraine National Team',          logo: '' },
  { name: 'China National Team',            logo: '' },
  { name: 'Go Swim — Technology Partner',   logo: '' },
  { name: 'Yakovlev Fins — Equipment',      logo: '' },
  { name: 'Jet Fins — Equipment',           logo: '' },
  { name: 'Yingfa — Equipment',             logo: '' },
];

const performanceCredentials = [
  { value: 'Guinness', label: 'World Record Holder' },
  { value: 'Rank #1',  label: 'World — 2008 & 2021' },
  { value: '2022',     label: 'World Games (USA)' },
  { value: '100+',     label: 'International Medals' },
  { value: '1600+',    label: 'National Medals' },
  { value: '100K+',    label: 'Training Hours' },
];

const clients = [
  { name: 'Leejam Sports Company',                       category: 'Sports & Fitness',   logo: '' },
  { name: 'Fitness Time',                                category: 'Fitness Centers',     logo: '' },
  { name: 'Princess Nourah bint Abdulrahman University', category: 'Higher Education',    logo: '' },
  { name: 'Sport Clubs Company',                         category: 'Sports Management',   logo: '' },
  { name: 'Master Legends Sports & Services',            category: 'Sports Services',     logo: '' },
  { name: 'Body Masters',                                category: 'Fitness',             logo: '' },
  { name: 'Future Champion Academy',                     category: 'Youth Development',   logo: '' },
  { name: 'JTA',                                         category: 'Sports Training',     logo: '' },
  { name: 'Cleopatra Sport Services',                    category: 'Sports Services',     logo: '' },
];

export function About() {
  usePageTitle('About Us');
  return (
    <div className="pt-20">

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="About Black Viral AC" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <div className="inline-flex items-center bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-3 mb-8">
              <span className="text-cyan-400 font-medium">From the Beginning to Professionalism</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Black Viral Academy</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Established with the vision of developing sports excellence from the foundation level to professional performance — a premier international sports academy dedicated to excellence across multiple disciplines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                Who We <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Are</span>
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>Black Viral Academy was established with the vision of developing sports excellence from the foundation level to professional performance.</p>
                <p className="text-cyan-700 dark:text-cyan-400 font-medium">From the beginning to professionalism, the Academy focuses on structured athletic development, water safety, competitive swimming, and multi-sport training programs.</p>
                <p>We aim to provide a safe, professional, and growth-oriented environment for children and athletes to develop their skills, character, and long-term athletic potential.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { icon: Target,    label: 'Sports Programs',      sub: 'Swimming, Combat, Team & More' },
                { icon: Award,     label: 'International Certs',  sub: 'IWSF, NAEMT, ASCA & More' },
                { icon: Users,     label: 'Expert Coaches',       sub: 'Internationally Certified' },
                { icon: Globe,     label: 'UAE & Regional',       sub: 'Growing Across the Kingdom' },
              ].map(({ icon: Icon, label, sub }, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-cyan-500/40 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-bold text-foreground text-sm">{label}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{sub}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-20 bg-card/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_white_0%,_transparent_60%)]" />
              <div className="relative">
                <Target className="w-10 h-10 text-white/80 mb-5" />
                <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
                <p className="text-white/90 text-base leading-relaxed mb-4">The Academy mission is to be the benchmark deliverer of water safety, water competency, and competitive swimming development.</p>
                <p className="text-white/75 text-sm leading-relaxed">Our vision includes making aquatics more accessible to the masses. Our internationally accredited curriculum focuses on foundation skills development that will translate into long-term participation and improvement in swimming. Our dedicated staff are unmatched in experience — all staff members are internationally certified in swim instructing and safety.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-card border border-cyan-500/20 rounded-3xl p-10 hover:border-cyan-500/40 transition-all">
              <TrendingUp className="w-10 h-10 text-cyan-600 dark:text-cyan-400 mb-5" />
              <h2 className="text-3xl font-black text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-4">We align ourselves with the UAE vision in promoting quality of life through increased sports and athletic participation, reaching regional and global excellence in sport, and encouraging and developing female participation in both sport and the workplace.</p>
              <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium leading-relaxed">The UAE has a bright aquatic sports future, and we hope to play a vital role in its development.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Core Principles</span>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Our Values</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The principles that guide everything we do — in every session, every interaction, every achievement.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 group">
                <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-black text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Goals ── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-950 to-cyan-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-16 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-600 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Our Goals</h2>
            <p className="text-gray-300 max-w-xl mx-auto">Annual targets that keep us accountable to our community and athletes.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goals.map((g, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:bg-white/8 hover:border-white/20 transition-all duration-500 group">
                <p className={`text-6xl font-black bg-gradient-to-r ${g.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform inline-block`}>{g.number}</p>
                <h3 className="font-black text-white text-sm mb-3 uppercase tracking-wide">{g.label}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{g.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Training Levels ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Progression</span>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Training Levels</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A clear developmental pathway from first entry to elite competition.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-amber-500 opacity-30" />
            {trainingLevels.map((lvl, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="bg-card border border-border rounded-3xl p-8 hover:border-cyan-500/40 hover:shadow-[0_0_24px_rgba(6,182,212,0.12)] transition-all duration-300 group text-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lvl.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <Trophy className="w-7 h-7 text-white" />
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${lvl.color} text-white mb-3`}>{lvl.level}</span>
                <p className="text-muted-foreground text-sm leading-relaxed">{lvl.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Teach ── */}
      <section className="py-20 bg-card/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Methodology</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                How We Teach &{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">How They Learn</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">Our teaching philosophy goes beyond sport — we build confident, disciplined, and well-rounded individuals who carry what they learn in the pool into every aspect of life.</p>
              <Link to="/courses" className="inline-flex items-center space-x-2 px-7 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 group">
                <BookOpen className="w-5 h-5" />
                <span>Explore Our Courses</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-3">
              {howWeTeach.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-start space-x-4 bg-card border border-border rounded-2xl p-5 hover:border-cyan-500/40 transition-all duration-300 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-0.5">To Learn About {item.title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sports Activities ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Sports Activities</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">A wide range of sports disciplines designed to develop every athlete from beginner to champion level.</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { label: 'Swimming',       img: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', color: 'from-cyan-500 to-blue-600' },
              { label: 'Group Exercise', img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', color: 'from-teal-500 to-cyan-600' },
              { label: 'Boxing',         img: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', color: 'from-red-500 to-orange-600' },
              { label: 'Gymnastics',     img: 'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', color: 'from-purple-500 to-pink-600' },
              { label: 'Kick Boxing',    img: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', color: 'from-amber-500 to-orange-600' },
              { label: 'Basketball',     img: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', color: 'from-orange-500 to-red-600' },
              { label: 'Football',       img: 'https://images.unsplash.com/photo-1486286701208-1d58e9338013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', color: 'from-green-500 to-emerald-600' },
            ].map((sport, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
              >
                <img
                  src={sport.img}
                  alt={sport.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} opacity-50 group-hover:opacity-70 transition-opacity duration-300`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <p className="text-white font-black text-xs sm:text-sm leading-tight">{sport.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Company Operations ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-last lg:order-first">
              <div className="space-y-4">
                {operations.map((op, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className={`flex items-start space-x-4 rounded-2xl p-6 border ${i === 1 ? 'bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-400' : 'bg-card border-border text-muted-foreground'}`}>
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm leading-relaxed font-medium">{op}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">B2B Services</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                Company <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Operations</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">Black Viral Academy delivers end-to-end operational solutions for sports facilities — from planning and staffing to day-to-day management and full execution.</p>
              <Link to="/contact" className="inline-flex items-center space-x-2 px-7 py-3.5 bg-card border border-cyan-500/30 text-foreground rounded-2xl font-bold hover:border-cyan-500/60 transition-all duration-300 group">
                <span>Request Operational Package</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Onboarding Process ── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-gray-950 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3">Onboarding Process</h2>
            <p className="text-gray-300 max-w-xl mx-auto">How we bring exceptional coaches onto our team — a structured 6-step journey from interview to full employment.</p>
          </motion.div>
          <div className="space-y-4">
            {onboardingSteps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start space-x-5 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-xs uppercase">{step.step}</span>
                </div>
                <div>
                  <p className="font-black text-white mb-1">{step.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Credentials, Accreditations & Partners ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Recognition</span>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Credentials, Accreditations<br />&amp; Strategic Partners</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Black Viral Academy operates with internationally recognized certifications and strategic collaborations to ensure world-class training standards.</p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-black text-foreground text-xl mb-6 text-center">International Certifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {certifications.map((c, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <div className="w-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-4 flex flex-col items-center hover:border-cyan-500/50 hover:shadow-[0_0_16px_rgba(6,182,212,0.15)] transition-all duration-300">
                      {c.logo ? (
                        <img src={c.logo} alt={c.name} className="w-14 h-14 object-contain mb-2" />
                      ) : (
                        <span className="text-xl font-black text-cyan-600 dark:text-cyan-400 mb-2 text-center leading-tight">{c.name}</span>
                      )}
                      <span className="text-muted-foreground text-[10px] leading-tight text-center">{c.full}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }} className="bg-card border border-border rounded-3xl p-8">
              <h3 className="font-black text-foreground text-xl mb-6 text-center">Strategic Partnerships</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {partnerships.map((p, i) => (
                  <div key={i} className="bg-gradient-to-br from-teal-500/10 to-cyan-600/10 border border-teal-500/20 rounded-2xl p-4 hover:border-teal-500/50 hover:shadow-[0_0_16px_rgba(20,184,166,0.15)] transition-all duration-300 text-center flex flex-col items-center">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="w-14 h-14 object-contain mb-2" />
                    ) : (
                      <Handshake className="w-6 h-6 text-teal-500 mx-auto mb-2" />
                    )}
                    <span className="text-foreground text-xs font-semibold leading-tight">{p.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Clients ── */}
      <section className="py-20 bg-card/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold text-sm uppercase tracking-wider">Trusted By</span>
              <div className="w-10 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-3">Our Clients</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">At Black Viral Academy, we proudly serve a diverse portfolio of corporate, institutional, and individual clients across the UAE and the region. Our current clients include World and International Champions with high academic achievements.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {clients.map((client, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded-2xl p-6 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all duration-300 group flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-4 group-hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{client.name.charAt(0)}</span>
                  )}
                </div>
                <h3 className="font-black text-foreground text-sm mb-1">{client.name}</h3>
                <p className="text-muted-foreground text-xs">{client.category}</p>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-muted-foreground text-sm mt-8 italic">
            We continue to build long-term partnerships based on performance, trust, and measurable results.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_50%,_white_0%,_transparent_60%)]" />
            <div className="relative">
              <Globe className="w-12 h-12 text-white/80 mx-auto mb-4" />
              <h2 className="text-4xl font-black text-white mb-4">Join the Black Viral Family</h2>
              <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">Whether you're starting from scratch or aiming for championship level — we have the program, the coaches, and the pathway for you.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/courses" className="px-8 py-4 bg-white text-cyan-600 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all">Browse Courses</Link>
                <Link to="/contact" className="px-8 py-4 bg-white/10 border border-white/30 text-white rounded-2xl font-bold hover:bg-white/20 transition-all">Contact Us</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}