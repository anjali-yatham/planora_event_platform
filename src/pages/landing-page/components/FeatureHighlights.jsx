import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Powered Insights",
      description: "Intelligent event recommendations and dynamic content adaptation based on user preferences and behavior patterns.",
      gradient: "from-primary to-secondary"
    },
    {
      id: 2,
      icon: "BarChart3",
      title: "Real-time Analytics",
      description: "Comprehensive attendance tracking, engagement metrics, and predictive analytics with actionable insights.",
      gradient: "from-secondary to-accent"
    },
    {
      id: 3,
      icon: "Target",
      title: "Smart Targeting",
      description: "AI-driven participant matching and personalized event recommendations for maximum engagement.",
      gradient: "from-accent to-primary"
    },
    {
      id: 4,
      icon: "Zap",
      title: "Automated Workflows",
      description: "Streamlined processes with intelligent automation for registration, notifications, and follow-ups.",
      gradient: "from-primary to-secondary"
    },
    {
      id: 5,
      icon: "Shield",
      title: "Enterprise Security",
      description: "Role-based access control, end-to-end encryption, and GDPR/CCPA compliance for secure events.",
      gradient: "from-secondary to-accent"
    },
    {
      id: 6,
      icon: "Smartphone",
      title: "Mobile First",
      description: "Progressive web app with offline capabilities, push notifications, and native-like performance.",
      gradient: "from-accent to-primary"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
    <section id="features" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
            Everything You Need to
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
            From AI-driven insights to real-time analytics, Planora provides 
            the complete toolkit for modern event management.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features?.map((feature) => (
            <motion.div
              key={feature?.id}
              variants={itemVariants}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-elevation-3 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature?.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature?.icon} size={28} color="white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {feature?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature?.description}
                  </p>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlights;