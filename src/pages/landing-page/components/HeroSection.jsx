import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = ({ onGetStarted }) => {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 px-6 relative overflow-hidden">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/3 backdrop-blur-sm"></div>
      
      <div className="max-w-7xl mx-auto relative z-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold mb-8 shadow-lg hover:bg-white/15 transition-all duration-300">
            <Icon name="Sparkles" size={16} className="mr-2 text-yellow-300" />
            Next-Generation Event Management Platform
          </div>
          
          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-white drop-shadow-lg">Powerful Features for</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              Modern Events
            </span>
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto drop-shadow-sm">
            <span className="text-purple-300">Everything you need to succeed</span> creating, managing, and analyzing successful events. 
            From AI-powered insights to immersive experiences that captivate your audience.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
              size="lg"
            >
              <Icon name="ArrowRight" size={20} className="mr-2" />
              Get Started Free
            </Button>
          </div>
          
          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { icon: 'Brain', label: 'AI-Powered', color: 'text-purple-400' },
              { icon: 'BarChart3', label: 'Analytics', color: 'text-blue-400' },
              { icon: 'Users', label: 'Collaboration', color: 'text-emerald-400' },
              { icon: 'Shield', label: 'Secure', color: 'text-orange-400' }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center space-y-3 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                  <Icon name={feature.icon} size={28} className={`${feature.color} drop-shadow-sm`} />
                </div>
                <span className="text-base font-semibold text-white drop-shadow-sm">{feature.label}</span>
              </div>
            ))}
          </div>
          
          {/* Scroll indicator */}
          <div className="mt-16">
            <div className="flex flex-col items-center text-white/60 animate-bounce">
              <Icon name="ChevronDown" size={24} />
              <span className="text-sm mt-2">Scroll to explore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;