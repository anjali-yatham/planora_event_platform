import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      id: 1,
      icon: "Brain",
      title: "AI-Powered Personalization",
      description: "Intelligent event recommendations and dynamic content adaptation based on user preferences and behavior patterns.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      id: 2,
      icon: "Globe",
      title: "Immersive Virtual Events",
      description: "VR/AR support with interactive networking spaces and virtual lobbies for engaging remote experiences.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      id: 3,
      icon: "BarChart3",
      title: "Comprehensive Analytics",
      description: "Real-time attendance tracking, revenue insights, and demographic breakdowns with AI-generated recommendations.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      icon: "Users",
      title: "Smart Collaboration Hub",
      description: "Integrated chat, digital whiteboards, live coding environments, and seamless file sharing capabilities.",
      gradient: "from-cyan-500 to-teal-500"
    },
    {
      id: 5,
      icon: "Trophy",
      title: "Advanced Gamification",
      description: "Challenges, badges, points system, and real-time leaderboards to boost engagement and participation.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      id: 6,
      icon: "Leaf",
      title: "Sustainability Impact",
      description: "Carbon footprint tracking and green recommendations to make your events environmentally responsible.",
      gradient: "from-green-500 to-emerald-500"
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
    <section className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Succeed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-driven insights to immersive virtual experiences, Planora provides 
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
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureHighlights;