import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', company: '', message: '' });
    
    // Show success message (in real app, you'd handle this properly)
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  const contactOptions = [
    {
      icon: 'Mail',
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'hello@planora.com',
      action: 'mailto:hello@planora.com'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Chat with support',
      contact: 'Available 24/7',
      action: '#'
    },
    {
      icon: 'MapPin',
      title: 'Visit Us',
      description: 'Our headquarters',
      contact: '123 Innovation St, Tech City, TC 12345',
      action: '#'
    }
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
            <Icon name="Headphones" size={16} className="mr-2" />
            Get In Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A4FCF] mb-6">
            Let's{' '}
            <span className="text-[#5A4FCF]">
              Connect
            </span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
            Have questions about Planora? Need a custom solution? Our team is here to help 
            you create extraordinary events.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-card rounded-2xl p-8 shadow-elevation-2 border border-border"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                  placeholder="Your company"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 py-3 font-semibold shadow-elevation-1 hover:shadow-elevation-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={18} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Other ways to reach us</h3>
              <div className="space-y-6">
                {contactOptions.map((option, index) => (
                  <motion.a
                    key={index}
                    href={option.action}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:shadow-elevation-2 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon name={option.icon} size={24} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{option.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                      <p className="text-sm font-medium text-primary">{option.contact}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">Need immediate help?</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Icon name="Clock" size={16} className="mr-3 text-primary" />
                  <span>Response time: Usually within 2 hours</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Globe" size={16} className="mr-3 text-primary" />
                  <span>Support available in 15+ languages</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Award" size={16} className="mr-3 text-primary" />
                  <span>99.9% customer satisfaction rate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;