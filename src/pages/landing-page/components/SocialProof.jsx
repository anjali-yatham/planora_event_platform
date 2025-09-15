import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Event Director",
      company: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Planora transformed how we manage corporate events. The AI recommendations helped us increase attendance by 40% and the analytics provided insights we never had before.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Conference Organizer",
      company: "Global Events Inc",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "The virtual event capabilities are outstanding. Our hybrid conferences now reach global audiences with seamless networking and engagement features.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Marketing Manager",
      company: "StartupHub",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "From planning to execution, Planora streamlined our entire event workflow. The collaboration tools made team coordination effortless.",
      rating: 5
    }
  ];

  const stats = [
    { label: "Events Hosted", value: "10,000+", icon: "Calendar" },
    { label: "Active Users", value: "50,000+", icon: "Users" },
    { label: "Countries", value: "120+", icon: "Globe" },
    { label: "Success Rate", value: "99.9%", icon: "TrendingUp" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative z-10 py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <Icon name={stat?.icon} size={24} color="white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {stat?.value}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat?.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A4FCF] mb-6">
            Trusted by Event
            <span className="text-[#5A4FCF]"> Professionals</span>
          </h2>
          <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-md">
            Join thousands of event organizers who have transformed their events with Planora
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials?.map((testimonial) => (
            <motion.div
              key={testimonial?.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-2xl p-8 hover:shadow-elevation-2 transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-card-foreground leading-relaxed">
                  "{testimonial?.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">
                      {testimonial?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial?.role}, {testimonial?.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enterprise Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span className="font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={20} className="text-primary" />
              <span className="font-medium">GDPR Ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-accent" />
              <span className="font-medium">ISO 27001</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;