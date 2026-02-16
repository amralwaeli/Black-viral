import { motion } from 'motion/react';
import { Target, Users, Award, TrendingUp, Heart, Globe } from 'lucide-react';

const heroImage = "https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2ltbWluZyUyMHBvb2wlMjB0cmFpbmluZyUyMGF0aGxldGV8ZW58MXx8fHwxNzcwOTc4MDI2fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of training and certification',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our passion for sports drives us to deliver the best training experience',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong community of athletes and professionals worldwide',
    },
    {
      icon: TrendingUp,
      title: 'Growth',
      description: 'Committed to continuous improvement and athlete development',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'International standards with local expertise and support',
    },
    {
      icon: Award,
      title: 'Quality',
      description: 'Highest quality training programs and certification standards',
    },
  ];

  const clients = [
    { name: 'Leejam Sports Company', description: 'Leading fitness chain in the Middle East' },
    { name: 'Fitness Time', description: 'Premier fitness and wellness centers' },
    { name: 'Future Champions Academy', description: 'Youth sports development organization' },
  ];

  const milestones = [
    { year: '2025', title: 'Founded', description: 'Black Viral AC was established in UAE' },
    { year: '2025', title: 'International Accreditation', description: 'Received IWSF and ILS certification' },
    { year: '2026', title: 'Rapid Growth', description: 'Expanded across multiple UAE locations' },
    { year: '2026', title: 'Online Platform', description: 'Launched comprehensive online training platform' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About Black Viral AC"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/90 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-3 mb-8">
              <span className="text-cyan-400 font-medium">Est. 2025</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Black Viral Sports Managements and Academies</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              A premier international sports academy dedicated to excellence in athletic training, professional certification, and sports development across multiple disciplines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <div className="relative">
                <Target className="w-12 h-12 text-white mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-white/90 text-lg leading-relaxed">
                  To provide world-class sports training and internationally recognized certifications, empowering athletes of all levels to achieve their full potential through expert coaching, comprehensive programs, and cutting-edge facilities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-cyan-500/20 rounded-3xl p-12 hover:border-cyan-500/50 transition-all"
            >
              <TrendingUp className="w-12 h-12 text-cyan-600 dark:text-cyan-400 mb-6" />
              <h2 className="text-3xl font-bold text-card-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be the leading sports academy in the Middle East and beyond, recognized globally for excellence in athletic training, safety certification, and sports development while fostering a culture of champions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              What We <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Offer</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-card border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-6">Sports Programs</h3>
                <div className="space-y-4">
                  {[
                    'Swimming for all ages (Toddlers to Seniors)',
                    'Fins Swimming',
                    'Combat Sports (Boxing, Kickboxing, MMA, Karate, Taekwondo)',
                    'Gymnastics',
                    'Team Sports (Football, Basketball)',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-card border border-cyan-500/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-6">Additional Services</h3>
                <div className="space-y-4">
                  {[
                    'Rescue & First Aid Training with International Certification',
                    'Physical In-Person Courses',
                    'Online Training Programs via Website',
                    'Pool Management Services',
                    'Pool Maintenance & Operations',
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">Key milestones in our growth</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-blue-600 hidden lg:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-card border border-cyan-500/20 rounded-2xl p-6 inline-block">
                      <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="hidden lg:block w-4 h-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]"></div>
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Clients</span>
            </h2>
            <p className="text-xl text-muted-foreground">Trusted by leading organizations</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-cyan-500/20 rounded-2xl p-8 text-center hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{client.name}</h3>
                <p className="text-muted-foreground">{client.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
