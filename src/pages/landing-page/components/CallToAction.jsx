import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CallToAction = ({ onGetStarted }) => {
  return (
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full"></div>
            <div className="absolute top-20 right-8 w-16 h-16 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-8 left-12 w-12 h-12 border border-white/20 rounded-full"></div>
            <div className="absolute bottom-16 right-16 w-24 h-24 border border-white/20 rounded-full"></div>
          </div>

          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Ready to Transform
                <br />
                Your Events?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Join thousands of event professionals who are already creating 
                extraordinary experiences with Planora's AI-powered platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="xl"
                onClick={onGetStarted}
                className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg font-semibold shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Start Free Trial
              </Button>
              <div className="flex items-center space-x-2 text-white/80 text-sm">
                <Icon name="Check" size={16} />
                <span>No credit card required</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-8 pt-8 text-white/70 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={16} />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;