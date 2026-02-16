import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const events = [
  {
    id: 1,
    title: 'International Swimming Championship',
    date: 'March 15-17, 2026',
    location: 'Dubai Sports City',
    participants: '500+ Athletes',
    image: 'https://images.unsplash.com/photo-1762392050946-685f2dec9da7?w=800',
    description: 'Join the biggest swimming competition in the Middle East',
    category: 'Competition',
  },
  {
    id: 2,
    title: 'MMA Training Camp',
    date: 'March 22-24, 2026',
    location: 'Abu Dhabi, Yas Island',
    participants: '100 Fighters',
    image: 'https://images.unsplash.com/photo-1633715398353-1faf3874a597?w=800',
    description: 'Intensive 3-day training camp with international coaches',
    category: 'Workshop',
  },
  {
    id: 3,
    title: 'Youth Basketball Tournament',
    date: 'April 5-7, 2026',
    location: 'Sharjah Sports Complex',
    participants: '32 Teams',
    image: 'https://images.unsplash.com/photo-1587166088004-bbd20854280f?w=800',
    description: 'Annual youth basketball championship for all skill levels',
    category: 'Tournament',
  },
  {
    id: 4,
    title: 'First Aid Certification Workshop',
    date: 'March 30, 2026',
    location: 'Dubai & Abu Dhabi',
    participants: 'Open Registration',
    image: 'https://images.unsplash.com/photo-1770215252183-da5f44f2851c?w=800',
    description: 'Get certified in life-saving first aid techniques',
    category: 'Certification',
  },
  {
    id: 5,
    title: 'Gymnastics Showcase',
    date: 'April 12, 2026',
    location: 'Dubai Sports City',
    participants: '200+ Gymnasts',
    image: 'https://images.unsplash.com/photo-1621046590909-be3de07237a3?w=800',
    description: 'Annual gymnastics performance and competition',
    category: 'Showcase',
  },
];

export function EventsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/5 dark:from-cyan-950/10 via-transparent to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Compete, learn, and grow with our community</p>
        </motion.div>

        <div className="relative">
          {/* Main Event Display */}
          <div className="relative h-[500px] md:h-[600px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                  {/* Background Image */}
                  <img
                    src={events[currentIndex].image}
                    alt={events[currentIndex].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-3xl">
                      <span className="inline-block px-4 py-2 bg-cyan-500/90 backdrop-blur-sm text-white text-sm rounded-full font-medium mb-4">
                        {events[currentIndex].category}
                      </span>
                      
                      <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {events[currentIndex].title}
                      </h3>
                      
                      <p className="text-xl text-gray-200 mb-6">
                        {events[currentIndex].description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center space-x-3 text-white">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">Date</p>
                            <p className="font-semibold">{events[currentIndex].date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-white">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">Location</p>
                            <p className="font-semibold">{events[currentIndex].location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3 text-white">
                          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-300">Participants</p>
                            <p className="font-semibold">{events[currentIndex].participants}</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        to="/contact"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300"
                      >
                        <span>Register Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-full flex items-center justify-center text-white hover:bg-cyan-500 hover:border-cyan-500 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-cyan-500 to-blue-600'
                    : 'w-2 h-2 bg-gray-400 dark:bg-gray-600 hover:bg-cyan-500/50'
                } rounded-full`}
              />
            ))}
          </div>
        </div>

        {/* View All Events Link */}
        <div className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
          >
            <span>View All Events</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
