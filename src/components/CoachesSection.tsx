import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, Mail, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import the coaches example image
import coachesExample from '../assets/8f06d2b4e4e537021e3a600126bd01a50c280665.png';

const coaches = [
  {
    id: 1,
    name: 'Dr. Usama Abdelmubdy',
    role: 'Chairman',
    specialty: 'Sports Management & Emergency Medical Training',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'Former coach of the Egyptian National Team and Former Executive Director of Sports Programs at Leejam (Fitness Time), overseeing over 150 branches in 5 Arab countries.',
    certifications: ['NAEMT Certified (USA)', 'European Resuscitation Council (ERC)', 'Egyptian National Team Coach'],
    social: { facebook: '#', instagram: '#', linkedin: '#' },
  },
  {
    id: 2,
    name: 'Dr. Fatima Al Shorbagy',
    role: 'BOD Member',
    specialty: 'Speech & Language Pathology / Behavioral Modification',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'Specialist in Speech & Language Pathology with over 20 years of experience in Egypt and Saudi Arabia. ABA Specialist (Board Certified, USA) and Behavioral Modification Specialist.',
    certifications: ['ABA Specialist – Board Certified (USA)', 'Montessori Teacher – American Montessori Board', 'MSc Speech & Language Disorders'],
    social: { facebook: '#', instagram: '#', linkedin: '#' },
  },
  {
    id: 3,
    name: 'C. Kariem Mohamed',
    role: 'BOD Member',
    specialty: 'Open Water & Competitive Swimming',
    image: 'https://images.unsplash.com/photo-1677170274581-b85e8469846c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'Former Egyptian National Team swimmer ranked among the world\'s Top 10 open-water swimmers in 2012. Senior technical director in the UAE for over 5 years.',
    certifications: ['Top 10 World Open Water (2012)', 'Egyptian National Team', 'Senior Technical Director UAE'],
    social: { facebook: '#', instagram: '#', linkedin: '#' },
  },
  {
    id: 4,
    name: 'C. Asmaa Khalil',
    role: 'BOD Member',
    specialty: 'International Gymnastics & Athlete Development',
    image: 'https://images.unsplash.com/photo-1669627960958-b4a809aa76ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800',
    bio: 'International gymnast and FIG-certified coach who has trained and supervised more than 10,000 athletes throughout her distinguished career.',
    certifications: ['FIG Certified Coach', 'International Gymnast', '10,000+ Athletes Trained'],
    social: { facebook: '#', instagram: '#', linkedin: '#' },
  },
];

export function CoachesSection() {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our <span className="bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Expert Coaches</span>
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400">World-class professionals dedicated to your success</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {coaches.map((coach, index) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white dark:bg-gradient-to-br dark:from-white/5 dark:to-white/[0.02] backdrop-blur-sm border border-gray-200 dark:border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] shadow-sm dark:shadow-none">
                {/* Coach Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"></div>
                  
                  {/* Social Links - Show on Hover */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={coach.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-cyan-500/30 transition-all"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a
                      href={coach.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-cyan-500/30 transition-all"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={coach.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-cyan-500/30 transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Basic Info - Always Visible */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-white mb-1">{coach.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium">{coach.role}</p>
                  </div>
                </div>

                {/* Detailed Info - Show on Hover */}
                <div className="p-6 max-h-0 group-hover:max-h-96 overflow-hidden transition-all duration-500">
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{coach.bio}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Specialization:</p>
                    <p className="text-gray-800 dark:text-white text-sm">{coach.specialty}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 dark:text-gray-500">Certifications:</p>
                    {coach.certifications.map((cert, i) => (
                      <div key={i} className="inline-block mr-2 mb-2">
                        <span className="px-2 py-1 bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs rounded border border-cyan-200 dark:border-transparent">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Link
            to="/our-team"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/40 bg-white dark:bg-white/5 backdrop-blur-sm text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 hover:border-cyan-500 dark:hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 shadow-sm dark:shadow-none"
          >
            <span>Meet Our Full Team</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </motion.div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          
          <div className="relative text-center">
            <UserPlus className="w-12 h-12 text-white mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-3">Join Our Team</h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Are you a certified coach or instructor? We're always looking for passionate professionals to join our elite team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span>Apply Now</span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}