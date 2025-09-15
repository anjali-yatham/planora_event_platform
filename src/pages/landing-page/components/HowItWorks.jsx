import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      step: "01",
      title: "Sign Up",
      description: "Create your account in seconds and choose your role as an organizer or participant.",
      icon: "UserPlus",
      color: "primary"
    },
    {
      id: 2,
      step: "02",
      title: "Set Up Your Event",
      description: "Use our intuitive drag-and-drop builder with AI-suggested layouts and customizable themes.",
      icon: "Settings",
      color: "secondary"
    },
    {
      id: 3,
      step: "03",
      title: "Launch & Track",
      description: "Go live with comprehensive analytics, real-time insights, and automated engagement tools.",
      icon: "Rocket",
      color: "accent"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="how-it-works" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
            <Icon name="Workflow" size={16} className="mr-2" />
            Simple Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Get Started in{' '}
            <span className="text-white">
              3 Easy Steps
            </span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-medium drop-shadow-md">
            From signup to launch, our streamlined process gets you up and running 
            with professional events in minutes, not hours.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connection Lines - Desktop Only */}
          <div className="hidden md:block absolute top-20 left-0 right-0 z-0">
            <div className="flex items-center justify-between px-32">
              <div className="w-32 h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30"></div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-secondary to-accent opacity-30"></div>
            </div>
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative z-10 text-center"
            >
              <div className="mb-8">
                {/* Step Number Circle */}
                <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center relative ${
                  step.color === 'primary' ? 'bg-gradient-to-br from-primary to-primary/80' :
                  step.color === 'secondary' ? 'bg-gradient-to-br from-secondary to-secondary/80' :
                  'bg-gradient-to-br from-accent to-accent/80'
                } shadow-elevation-2`}>
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                  {/* Icon in corner */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-card rounded-full shadow-elevation-1 flex items-center justify-center border-2 border-background">
                    <Icon name={step.icon} size={14} className={`${
                      step.color === 'primary' ? 'text-primary' :
                      step.color === 'secondary' ? 'text-secondary' :
                      'text-accent'
                    }`} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                  {step.title}
                </h3>
                <p className="text-white/90 leading-relaxed max-w-sm mx-auto font-medium drop-shadow-md">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-card rounded-2xl p-8 shadow-elevation-2 border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to revolutionize your events?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of organizers who've already made the switch to smarter event management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transform hover:-translate-y-0.5 transition-all duration-300">
                <Icon name="ArrowRight" size={18} className="mr-2" />
                Start Free Trial
              </button>
              <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-all duration-300">
                <Icon name="Calendar" size={18} className="mr-2" />
                Schedule Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;