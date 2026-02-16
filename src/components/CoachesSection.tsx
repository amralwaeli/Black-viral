import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, Mail, UserPlus } from 'lucide-react';
import { Link } from 'react-router';

// Import the coaches example image
import coachesExample from 'figma:asset/8f06d2b4e4e537021e3a600126bd01a50c280665.png';

const coaches = [
  {
    id: 1,
    name: 'Coach Ahmed Al Mansouri',
    role: 'Head Swimming Coach',
    specialty: 'Olympic Swimming & Fins Swimming',
    image: 'https://images.unsplash.com/photo-1726800892503-6c440d2a0010?w=400',
    bio: 'Former National Team swimmer with 15+ years coaching experience. Certified by IWSF and ILS.',
    certifications: ['IWSF Master Coach', 'ILS Instructor', 'CMAS Level 3'],
    social: {
      facebook: '#',
      instagram: '#',
      linkedin: '#',
    },
  },
  {
    id: 2,
    name: 'Dr. Fatima Al Sharbagy',
    role: 'First Aid & Rescue Specialist',
    specialty: 'Emergency Response & Medical Training',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    bio: 'Medical professional specializing in sports emergency care. Over 20 years experience in rescue operations.',
    certifications: ['NEAMT Certified', 'ILS Advanced', 'Medical Director'],
    social: {
      facebook: '#',
      instagram: '#',
      linkedin: '#',
    },
  },
  {
    id: 3,
    name: 'Coach Kareem Mohammad',
    role: 'Combat Sports Director',
    specialty: 'MMA, Boxing & Kickboxing',
    image: 'https://images.unsplash.com/photo-1590070714379-e894212d7838?w=400',
    bio: 'Professional MMA fighter turned coach. Multiple championship wins and certified instructor across 5 combat disciplines.',
    certifications: ['UFC Certified', 'Boxing Council', 'Muay Thai Master'],
    social: {
      facebook: '#',
      instagram: '#',
      linkedin: '#',
    },
  },
  {
    id: 4,
    name: 'Coach Asmaa Khalil',
    role: 'Gymnastics & Fitness Coach',
    specialty: 'Gymnastics & Athletic Training',
    image: 'https://images.unsplash.com/photo-1643142313247-412cded394c1?w=400',
    bio: 'Former national gymnast with expertise in youth development and athletic conditioning programs.',
    certifications: ['UAE Gymnastics Fed', 'Fitness Specialist', 'Youth Coach'],
    social: {
      facebook: '#',
      instagram: '#',
      linkedin: '#',
    },
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Expert Coaches</span>
          </h2>
          <p className="text-xl text-gray-400">World-class professionals dedicated to your success</p>
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
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
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
                  <p className="text-gray-400 text-sm mb-4">{coach.bio}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Specialization:</p>
                    <p className="text-white text-sm">{coach.specialty}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">Certifications:</p>
                    {coach.certifications.map((cert, i) => (
                      <div key={i} className="inline-block mr-2 mb-2">
                        <span className="px-2 py-1 bg-cyan-500/10 text-cyan-400 text-xs rounded">
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