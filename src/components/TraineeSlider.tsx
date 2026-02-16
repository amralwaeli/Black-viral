import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// Import the example image from figma
import exampleImage from 'figma:asset/9f692e88661359c535ba7534a01b2cc97dfe9d59.png';

// Add your custom training images here
const trainingImages = [
  exampleImage,
  "https://images.unsplash.com/photo-1765109396566-e315369d54e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1726800892503-6c440d2a0010?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1643142313247-412cded394c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1762392050946-685f2dec9da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1587166088004-bbd20854280f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  "https://images.unsplash.com/photo-1621046590909-be3de07237a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
];

export function TraineeSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setOffset((prev) => prev - 1);
    }, 20); // Smooth continuous scroll

    return () => clearInterval(interval);
  }, [isPaused]);

  // Triple the images for seamless infinite loop
  const infiniteImages = [...trainingImages, ...trainingImages, ...trainingImages];

  return (
    <div className="py-20 overflow-hidden bg-gradient-to-b from-transparent via-cyan-950/5 dark:via-cyan-950/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Training Programs</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">See our athletes in action across various disciplines</p>
        </motion.div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className="flex gap-6 will-change-transform"
          style={{
            transform: `translateX(${offset}px)`,
            transition: isPaused ? 'none' : undefined,
          }}
        >
          {infiniteImages.map((image, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden group relative cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image}
                alt={`Training ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-500 dark:text-gray-500 text-sm italic">
          {isPaused ? 'Scrolling paused' : 'Hover to pause'}
        </p>
      </div>
    </div>
  );
}
