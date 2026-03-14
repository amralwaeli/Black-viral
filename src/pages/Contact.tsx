import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, X, Headphones, ChevronRight, Lock, UserPlus, LogIn } from 'lucide-react';
import { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase/client';
import { toast } from 'sonner';

// ── Auth Required Modal ───────────────────────────────────────────────────────
// Shown when a guest tries to access the live support chat.
function AuthRequiredModal({ onClose }: { onClose: () => void }) {

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-[var(--background)] dark:bg-gray-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400" />

        {/* Content */}
        <div className="px-8 py-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Headphones className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                <Lock className="w-3.5 h-3.5 text-white" />
              </div>
            </div>
          </div>

          {/* Text */}
          <h3 className="text-xl font-bold text-foreground text-center mb-2">
            Sign In to Access Live Support
          </h3>
          <p className="text-muted-foreground text-sm text-center leading-relaxed mb-8">
            Our live support chat is available exclusively to registered members.
            Please sign in or create a free account to connect with our support team.
          </p>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => { onClose(); window.location.href = '/signin'; }}
              className="w-full flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_24px_rgba(6,182,212,0.5)] transition-all duration-300"
            >
              <LogIn className="w-4.5 h-4.5 w-[18px] h-[18px]" />
              <span>Sign In to Your Account</span>
            </button>
            <button
              onClick={() => { onClose(); window.location.href = '/signup'; }}
              className="w-full flex items-center justify-center space-x-2.5 px-6 py-3.5 bg-card border border-cyan-500/30 text-foreground rounded-xl font-semibold hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all duration-300"
            >
              <UserPlus className="w-[18px] h-[18px]" />
              <span>Create a Free Account</span>
            </button>
          </div>

          {/* Dismiss */}
          <button
            onClick={onClose}
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            Maybe later
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Validation helpers ────────────────────────────────────────────────────────
function validateContactForm(data: { name: string; email: string; phone: string; subject: string; message: string }) {
  if (!data.name.trim() || data.name.trim().length < 2) return 'Please enter your full name (at least 2 characters).';
  if (data.name.trim().length > 100) return 'Name must be under 100 characters.';
  if (!data.email.trim()) return 'Please enter your email address.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return 'Please enter a valid email address.';
  if (data.email.trim().length > 254) return 'Email address is too long.';
  if (data.phone && data.phone.trim().length > 0) {
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) return 'Phone number must be between 7 and 15 digits.';
  }
  if (!data.subject.trim() || data.subject.trim().length < 3) return 'Please enter a subject (at least 3 characters).';
  if (data.subject.trim().length > 200) return 'Subject must be under 200 characters.';
  if (!data.message.trim() || data.message.trim().length < 10) return 'Message must be at least 10 characters.';
  if (data.message.trim().length > 5000) return 'Message must be under 5000 characters.';
  return null;
}

// ── Main Contact Page ────────────────────────────────────────────────────────
export function Contact() {
  usePageTitle('Contact Us');
  const { profile } = useAuth();
  const isSignedIn = !!profile;

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic rate limiting: 60 seconds between submissions
    const now = Date.now();
    if (now - lastSubmitTime < 60_000) {
      toast.error('Please wait a moment before submitting another message.');
      return;
    }

    // Validate form
    const validationError = validateContactForm(formData);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert message into Supabase
      const { data: insertedMsg, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim() || null,
            subject: formData.subject.trim(),
            message: formData.message.trim(),
            user_id: profile?.id || null,
            status: 'unread',
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error submitting contact form:', error);
        toast.error('Failed to send message. Please try again.');
        return;
      }

      setLastSubmitTime(Date.now());
      toast.success("Message sent! We'll get back to you within 2 business days.");
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

      // Trigger email notifications via edge function (fire-and-forget)
      if (insertedMsg?.id) {
        try {
          await supabase.functions.invoke('send-contact-emails', {
            body: {
              messageId: insertedMsg.id,
              name: formData.name.trim(),
              email: formData.email.trim().toLowerCase(),
              subject: formData.subject.trim(),
              message: formData.message.trim(),
            },
          });
        } catch (emailErr) {
          // Email sending failure should not break the UX — message is already saved
          console.warn('Email notification failed (non-critical):', emailErr);
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleSupportClick() {
    if (isSignedIn) {
      window.dispatchEvent(new CustomEvent('open-chat-support'));
    } else {
      setShowAuthModal(true);
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      detail: 'admin@blackviral.club',
      description: 'For non-urgent requests, email us and hear back within 2 business days.',
      action: 'Send an Email',
      color: 'from-cyan-500 to-blue-600',
      onClick: () => window.location.href = 'mailto:admin@blackviral.club',
    },
    {
      icon: Phone,
      title: 'Phone',
      detail: '+971 56 848 8141',
      description: 'Call us during business hours for immediate assistance.',
      action: 'Call Now',
      color: 'from-green-500 to-emerald-600',
      onClick: () => window.location.href = 'tel:+971568488141',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      detail: 'Message us',
      description: "Message us on WhatsApp and we'll reply within 1–2 hours.",
      action: 'Message on WhatsApp',
      color: 'from-emerald-500 to-green-600',
      onClick: () => window.open('https://wa.me/971568488141', '_blank'),
    },
  ];

  const officeLocations = [
    {
      city: 'Black Viral Al Twar',
      address: 'Al Twar, Dubai, United Arab Emirates',
      hours: 'Mon–Fri: 8:00 AM – 8:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3073368311416!2d55.383490099999996!3d25.2602448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d7119890bdd%3A0xac2d22bc422b45ad!2sBlack%20Viral%20Al%20Twar!5e0!3m2!1sen!2sus!4v1771230235787!5m2!1sen!2sus',
    },
    {
      city: 'Black Viral Al Qusais',
      address: 'Al Qusais, Dubai, United Arab Emirates',
      hours: 'Mon–Fri: 8:00 AM – 8:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.727906782534!2d55.361457574523435!3d25.27973697765791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d1e0498f3d3%3A0x5634dada72c02ad3!2sBlack%20Viral%20Al%20Qusais!5e0!3m2!1sen!2sus!4v1771230327474!5m2!1sen!2sus',
    },
    {
      city: 'Black Viral Oud Metha',
      address: 'Oud Metha, Dubai, United Arab Emirates',
      hours: 'Mon–Fri: 8:00 AM – 8:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d827.3581800092662!2d55.314198456826574!3d25.238225869586536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d1049105325%3A0x5e50b0bc16747326!2sBlack%20Viral%20Oud%20Metha!5e0!3m2!1sen!2sus!4v1771230396427!5m2!1sen!2sus',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-cyan-950">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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

      {/* Contact Methods + Support Agent CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Live Support CTA banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 border border-cyan-500/20 p-8"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex items-center space-x-5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                  <Headphones className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Chat with Support</h3>
                  <p className="text-white/60 text-sm mt-0.5">
                    {isSignedIn
                      ? 'Talk directly to our support team — get answers fast.'
                      : 'Sign in or create an account to connect with our support team.'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleSupportClick}
                className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-semibold transition-all flex-shrink-0 group ${
                  isSignedIn
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]'
                    : 'bg-white/5 border border-white/10 text-white/50 cursor-pointer hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {isSignedIn ? (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    <span>Open Live Chat</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Sign In to Chat</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* 3 contact method cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all`}>
                  <method.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-card-foreground mb-2">{method.title}</h3>
                <p className="text-cyan-600 dark:text-cyan-400 font-medium mb-3">{method.detail}</p>
                <p className="text-muted-foreground text-sm mb-6">{method.description}</p>
                <button
                  onClick={method.onClick}
                  className={`w-full px-6 py-3 bg-gradient-to-r ${method.color} text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all`}
                >
                  {method.action}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Contact Form & Office Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="bg-card border border-cyan-500/20 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-card-foreground mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">Your Name *</label>
                    <input type="text" id="name" required maxLength={100} value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="Jack Stark" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">Email Address *</label>
                      <input type="email" id="email" required maxLength={254} value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                        placeholder="jack@example.com" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-card-foreground mb-2">Phone Number</label>
                      <input type="tel" id="phone" value={formData.phone} maxLength={20}
                        onChange={e => setFormData({ ...formData, phone: e.target.value.replace(/[^+\d\s\-().]/g, '') })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                        placeholder="+971 XX XXX XXXX" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-card-foreground mb-2">Subject *</label>
                    <input type="text" id="subject" required maxLength={200} value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all"
                      placeholder="Course inquiry" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="message" className="block text-sm font-medium text-card-foreground">Your Message *</label>
                      <span className={`text-xs ${formData.message.length > 4800 ? 'text-red-400' : formData.message.length > 4000 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                        {formData.message.length}/5000
                      </span>
                    </div>
                    <textarea id="message" required rows={6} maxLength={5000} value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-cyan-500/50 transition-all resize-none"
                      placeholder="Tell us how we can help you..." />
                  </div>
                  <p className="text-sm text-muted-foreground">Your data is safe with us. You'll receive a confirmation email after submitting.</p>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Offices */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Offices</h2>
              {officeLocations.map((location, index) => (
                <div key={index} className="bg-card border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">{location.city}</h3>
                      <p className="text-muted-foreground mb-3">{location.address}</p>
                      <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400">
                        <Clock className="w-4 h-4" /><span className="text-sm">{location.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* FAQ */}
              <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h3>
                <p className="text-white/90 mb-6">Browse answers to frequently asked questions. Need more help? Reach out to us at our Support Centre.</p>
                <div className="space-y-3">
                  {[
                    { q: 'What does Black Viral AC offer?', a: 'We offer comprehensive sports training across multiple disciplines including swimming, combat sports, team sports, and professional rescue & first aid certification.' },
                    { q: 'Are online courses available?', a: 'Yes! We offer both physical in-person courses and online training programs accessible via our website platform.' },
                    { q: 'What certifications do you provide?', a: 'All our certifications are internationally recognized and accredited by major federations including IWSF, ILS, CMAS, and various national sports authorities.' },
                  ].map((faq, i) => (
                    <details key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 cursor-pointer">
                      <summary className="text-white font-medium">{faq.q}</summary>
                      <p className="text-white/80 mt-2 text-sm">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Maps */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Visit Our <span className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent">Locations</span>
            </h2>
            <p className="text-xl text-muted-foreground">Three locations across Dubai, UAE</p>
          </motion.div>
          <div className="grid lg:grid-cols-3 gap-8">
            {officeLocations.map((location, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-card border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div className="aspect-video w-full bg-muted">
                  <iframe src={location.mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" title={`Map of ${location.city}`} />
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
                  <div className="flex items-center space-x-2 text-cyan-600 dark:text-cyan-400 text-sm mb-4">
                    <Clock className="w-4 h-4" /><span>{location.hours}</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
                    Get Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Auth required modal */}
      <AnimatePresence>
        {showAuthModal && <AuthRequiredModal onClose={() => setShowAuthModal(false)} />}
      </AnimatePresence>
    </div>
  );
}