import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Play } from 'lucide-react';

// Import the testimonial example image
import testimonialExample from 'figma:asset/e54d979e79a685cc4f1ed32b8103cd97c46626cb.png';

const testimonials = [
  {
    id: 1,
    name: 'Ahmed Al Mazrouei',
    role: 'Professional Swimmer',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    quote: 'Black Viral AC transformed my swimming technique completely. The coaches are world-class and the facilities are exceptional.',
    rating: 5,
    course: 'Advanced Swimming',
    hasVideo: false,
  },
  {
    id: 2,
    name: 'Sara Mohammed',
    role: 'Kickboxing Instructor',
    location: 'Abu Dhabi, UAE',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    quote: 'The kickboxing certification program here is outstanding. I gained incredible skills and confidence to teach professionally.',
    rating: 5,
    course: 'Kickboxing Certification',
    hasVideo: true,
  },
  {
    id: 3,
    name: 'Omar Hassan',
    role: 'Fitness Entrepreneur',
    location: 'Sharjah, UAE',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    quote: 'The first aid and rescue certification saved my career. Now I can confidently manage my own sports facility with proper safety protocols.',
    rating: 5,
    course: 'First Aid & Rescue',
    hasVideo: false,
  },
  {
    id: 4,
    name: 'Fatima Ali',
    role: 'Swimming Coach',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    quote: 'The online platform made it so easy to get certified while managing my schedule. Highly recommend to anyone serious about sports education.',
    rating: 5,
    course: 'Swimming Instructor',
    hasVideo: false,
  },
  {
    id: 5,
    name: 'Khalid Rahman',
    role: 'MMA Fighter',
    location: 'Abu Dhabi, UAE',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    quote: 'Training with Black Viral AC took my MMA skills to the next level. The structured program and expert coaching made all the difference.',
    rating: 5,
    course: 'Advanced MMA',
    hasVideo: true,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/10 dark:via-cyan-950/10 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Success <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-slate-700 dark:text-gray-400">Hear from our community of champions</p>
        </motion.div>

        <div className="relative">
          {/* Main Testimonial Display */}
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto relative">
                  <Quote className="absolute top-8 right-8 w-16 h-16 text-cyan-500/10" />
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Profile Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-cyan-500/30">
                        <img
                          src={testimonials[currentIndex].image}
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {testimonials[currentIndex].hasVideo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-cyan-500/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-6 h-6 text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
                        "{testimonials[currentIndex].quote}"
                      </p>

                      <div className="space-y-2">
                        <h4 className="text-xl font-semibold text-cyan-400">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-gray-400">{testimonials[currentIndex].role}</p>
                        <p className="text-sm text-gray-500">{testimonials[currentIndex].location}</p>
                        <div className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm mt-2">
                          {testimonials[currentIndex].course}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-cyan-500 to-blue-600'
                    : 'w-2 h-2 bg-gray-600 hover:bg-cyan-500/50'
                } rounded-full`}
              />
            ))}
          </div>
        </div>

        {/* Browse More Link */}
        <div className="text-center mt-12">
          <p className="text-cyan-400 font-medium">
            Browse 500+ success stories →
          </p>
        </div>
      </div>
    </section>
  );
}