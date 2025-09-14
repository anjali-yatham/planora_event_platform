import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ onGetStarted }) => {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Plan Smarter,
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Connect Faster
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Revolutionize your event management with AI-powered personalization, 
              immersive virtual experiences, and comprehensive analytics that help you 
              celebrate better.
            </p>
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="pt-4"
          >
            <Button
              variant="default"
              size="xl"
              onClick={onGetStarted}
              className="px-12 py-4 text-lg font-semibold shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300"
              iconName="ArrowRight"
              iconPosition="right"
            >
              Get Started Free
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center space-x-8 pt-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} className="text-success" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span>10,000+ Events Hosted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-accent" />
              <span>4.9/5 Rating</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;