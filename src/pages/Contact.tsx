import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock } from 'lucide-react';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'admin@blackviral.club',
      description: 'For non-urgent requests, email us and hear back within 2 business days.',
      action: 'Send an Email',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+971 56 848 8141',
      description: 'Call us during business hours for immediate assistance.',
      action: 'Call Now',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      detail: 'Message us',
      description: "Message us on WhatsApp and we'll reply within 1-2 hours.",
      action: 'Message on WhatsApp',
      color: 'from-emerald-500 to-green-600',
    },
  ];

  const officeLocations = [
    {
      city: 'Black Viral Al Twar',
      address: 'Al Twar, Dubai, United Arab Emirates',
      hours: 'Mon-Fri: 8:00 AM - 8:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3073368311416!2d55.383490099999996!3d25.2602448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d7119890bdd%3A0xac2d22bc422b45ad!2sBlack%20Viral%20Al%20Twar!5e0!3m2!1sen!2sus!4v1771230235787!5m2!1sen!2sus',
    },
    {
      city: 'Black Viral Al Qusais',
      address: 'Al Qusais, Dubai, United Arab Emirates',
      hours: 'Mon-Fri: 8:00 AM - 8:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.727906782534!2d55.361457574523435!3d25.27973697765791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d1e0498f3d3%3A0x5634dada72c02ad3!2sBlack%20Viral%20Al%20Qusais!5e0!3m2!1sen!2sus!4v1771230327474!5m2!1sen!2sus',
    },
    {
      city: 'Black Viral Oud Metha',
      address: 'Oud Metha, Dubai, United Arab Emirates',
      hours: 'Mon-Fri: 8:00 AM - 8:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d827.3581800092662!2d55.314198456826574!3d25.238225869586536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d1049105325%3A0x5e50b0bc16747326!2sBlack%20Viral%20Oud%20Metha!5e0!3m2!1sen!2sus!4v1771230396427!5m2!1sen!2sus',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section — always dark bg with overlay, keep as-is */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contact <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're here to support your journey and we want to make it effortless. Get in touch with our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-card-foreground mb-2">{method.title}</h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-3">{method.detail}</p>
                <p className="text-muted-foreground text-sm mb-6">{method.description}</p>
                <button className={`w-full px-6 py-3 bg-gradient-to-r ${method.color} text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all`}>
                  {method.action}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card border border-cyan-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-card-foreground mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="Jack Stark"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                        placeholder="jack@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                        placeholder="+971 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="Course inquiry"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-card-foreground mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Your data is safe with us. Unsubscribe anytime.
                  </p>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Offices</h2>

              {officeLocations.map((location, index) => (
                <div
                  key={index}
                  className="bg-card border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">{location.city}</h3>
                      <p className="text-muted-foreground mb-3">{location.address}</p>
                      <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{location.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ Teaser */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                <p className="text-white/90 mb-6">
                  Browse answers to the frequently asked questions. Need more help? Reach out to us at our Support Centre.
                </p>
                <div className="space-y-3">
                  <details className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer">
                    <summary className="text-white font-medium">What does Black Viral AC offer?</summary>
                    <p className="text-white/80 mt-2 text-sm">
                      We offer comprehensive sports training across multiple disciplines including swimming, combat sports, team sports, and professional rescue & first aid certification.
                    </p>
                  </details>
                  <details className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer">
                    <summary className="text-white font-medium">Are online courses available?</summary>
                    <p className="text-white/80 mt-2 text-sm">
                      Yes! We offer both physical in-person courses and online training programs accessible via our website platform.
                    </p>
                  </details>
                  <details className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer">
                    <summary className="text-white font-medium">What certifications do you provide?</summary>
                    <p className="text-white/80 mt-2 text-sm">
                      All our certifications are internationally recognized and accredited by major federations including IWSF, ILS, CMAS, and various national sports authorities.
                    </p>
                  </details>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Maps Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Visit Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Locations</span>
            </h2>
            <p className="text-xl text-muted-foreground">Three locations across Dubai, UAE</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]"
              >
                <div className="aspect-video w-full bg-muted">
                  <iframe
                    src={location.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map of ${location.city}`}
                  ></iframe>
                </div>
                <div className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-1">{location.city}</h3>
                      <p className="text-muted-foreground text-sm">{location.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{location.hours}</span>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
                    Get Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}