import { motion } from 'motion/react';
import { Award, CheckCircle, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router';

export function Certifications() {
  const internationalFederations = [
    {
      name: 'IWSF',
      fullName: 'International Water Sports Federation',
      description: 'Global authority in aquatic sports and water safety',
    },
    {
      name: 'ILS',
      fullName: 'International Life Saving Federation',
      description: 'Worldwide leader in lifesaving and water rescue',
    },
    {
      name: 'NEAMT',
      fullName: 'National Emergency Aquatic Management Training',
      description: 'Specialized in emergency aquatic response',
    },
    {
      name: 'European Commission',
      fullName: 'European Commission Sports Programs',
      description: 'EU recognized sports training standards',
    },
    {
      name: 'CMAS',
      fullName: 'Confédération Mondiale des Activités Subaquatiques',
      description: 'World underwater activities confederation',
    },
  ];

  const nationalFederations = [
    {
      name: 'Emirates Ministry of Sports',
      region: 'UAE',
      description: 'Official sports governing body of the United Arab Emirates',
    },
    {
      name: 'Emirates Swimming Federation',
      region: 'UAE',
      description: 'National authority for swimming sports in UAE',
    },
    {
      name: 'Emirates Gymnastics Federation',
      region: 'UAE',
      description: 'Governing body for gymnastics in the UAE',
    },
    {
      name: 'Egyptian Swimming Federation',
      region: 'Egypt',
      description: 'National swimming authority in Egypt',
    },
    {
      name: 'Egyptian Diving and Rescue Federation',
      region: 'Egypt',
      description: 'National diving and rescue certification body',
    },
  ];

  const certificationBenefits = [
    {
      icon: Globe,
      title: 'Global Recognition',
      description: 'Our certificates are recognized in over 50 countries worldwide',
    },
    {
      icon: Shield,
      title: 'Industry Standard',
      description: 'Meet international safety and training requirements',
    },
    {
      icon: Award,
      title: 'Career Advancement',
      description: 'Open doors to professional opportunities worldwide',
    },
    {
      icon: CheckCircle,
      title: 'Lifetime Validity',
      description: 'Most certifications remain valid with periodic renewal',
    },
  ];

  const certificationPrograms = [
    {
      title: 'Lifeguard Certification',
      level: 'Professional',
      duration: '6 weeks',
      accreditation: ['ILS', 'CMAS'],
      description: 'Comprehensive lifeguard training with international certification',
      topics: ['Water Rescue', 'CPR & First Aid', 'Emergency Response', 'Pool Safety'],
    },
    {
      title: 'Swimming Instructor Certification',
      level: 'Professional',
      duration: '8 weeks',
      accreditation: ['IWSF', 'Emirates Swimming Federation'],
      description: 'Become a certified swimming instructor',
      topics: ['Teaching Methods', 'Stroke Techniques', 'Safety Protocols', 'Student Assessment'],
    },
    {
      title: 'First Aid & CPR Certification',
      level: 'Essential',
      duration: '4 weeks',
      accreditation: ['CMAS', 'ILS'],
      description: 'International first aid and CPR certification',
      topics: ['Basic Life Support', 'AED Usage', 'Wound Care', 'Medical Emergencies'],
    },
    {
      title: 'Water Rescue Specialist',
      level: 'Advanced',
      duration: '10 weeks',
      accreditation: ['ILS', 'NEAMT'],
      description: 'Advanced water rescue and emergency response',
      topics: ['Swift Water Rescue', 'Dive Rescue', 'Team Coordination', 'Advanced Techniques'],
    },
    {
      title: 'Pool Management Certification',
      level: 'Professional',
      duration: '6 weeks',
      accreditation: ['Emirates Ministry of Sports'],
      description: 'Professional pool facility management certification',
      topics: ['Water Chemistry', 'Facility Management', 'Safety Standards', 'Staff Training'],
    },
    {
      title: 'Sports Coach Certification',
      level: 'Professional',
      duration: '12 weeks',
      accreditation: ['European Commission', 'Emirates Ministry of Sports'],
      description: 'Multi-sport coaching certification program',
      topics: ['Coaching Psychology', 'Training Methods', 'Performance Analysis', 'Sports Science'],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section — always dark bg with image overlay, keep as-is */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-6 py-3 mb-8">
              <Award className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-400 font-medium">Internationally Accredited</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              World-Class <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Certifications</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Earn internationally recognized certifications from leading sports federations and regulatory bodies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* International Federations */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              International <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Federations</span>
            </h2>
            <p className="text-xl text-muted-foreground">Members of leading global sports organizations</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internationalFederations.map((federation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-1">{federation.name}</h3>
                    <p className="text-sm text-card-foreground mb-2">{federation.fullName}</p>
                    <p className="text-sm text-muted-foreground">{federation.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* National Federations */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              National <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Federations</span>
            </h2>
            <p className="text-xl text-muted-foreground">Accredited by regional sports authorities</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {nationalFederations.map((federation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-card-foreground mb-2">{federation.name}</h3>
                    <p className="text-sm text-muted-foreground">{federation.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm rounded-lg font-medium">
                    {federation.region}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification Programs */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Certification <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Programs</span>
            </h2>
            <p className="text-xl text-muted-foreground">Professional certification courses available</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificationPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs rounded-lg font-medium">
                    {program.level}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-card-foreground mb-2">{program.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{program.description}</p>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
                  <span>{program.duration}</span>
                </div>

                <div className="space-y-2 mb-4">
                  {program.topics.map((topic, tIndex) => (
                    <div key={tIndex} className="flex items-center space-x-2 text-sm text-card-foreground">
                      <CheckCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Accredited by:</p>
                  <div className="flex flex-wrap gap-2">
                    {program.accreditation.map((acc, aIndex) => (
                      <span key={aIndex} className="px-2 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs rounded">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/courses"
                  className="mt-6 w-full block text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Certified?</h2>
              <p className="text-xl text-white/90 mb-8">
                Start your professional certification journey with Black Viral AC
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/courses"
                  className="px-8 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
                >
                  Browse Certification Courses
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
