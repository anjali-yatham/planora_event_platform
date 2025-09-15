import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = ({ onGetStarted }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      id: 1,
      name: "Starter",
      description: "Perfect for small events and getting started",
      monthlyPrice: 0,
      annualPrice: 0,
      highlight: false,
      features: [
        "Up to 100 participants",
        "Basic analytics dashboard", 
        "Standard integrations",
        "Email support",
        "Mobile-responsive design",
        "Basic customization"
      ],
      limitations: [
        "Limited AI insights",
        "Standard templates only"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      id: 2,
      name: "Professional",
      description: "Advanced features for growing organizations",
      monthlyPrice: 1,
      annualPrice: 1,
      highlight: true,
      features: [
        "Up to 1,000 participants",
        "Advanced AI-powered analytics",
        "Custom branding & themes",
        "Priority support",
        "Advanced integrations",
        "Team collaboration tools",
        "Automated workflows",
        "Real-time insights"
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true
    },
    {
      id: 3,
      name: "Enterprise",
      description: "Full-scale solution for large organizations",
      monthlyPrice: 2,
      annualPrice: 2,
      highlight: false,
      features: [
        "Unlimited participants",
        "Complete AI suite",
        "White-label solution",
        "Dedicated success manager",
        "Custom integrations",
        "Advanced security & compliance",
        "Multi-tenant architecture",
        "24/7 phone support",
        "Custom analytics reports"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-8">
            <Icon name="CreditCard" size={16} className="mr-2" />
            Simple Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#5A4FCF] mb-6">
            Choose the{' '}
            <span className="text-[#5A4FCF]">
              Perfect Plan
            </span>
          </h2>
          <p className="text-xl text-[#2E2E2E] max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core features 
            with no hidden costs or setup fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-muted rounded-lg">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                !isAnnual ? 'bg-card text-foreground shadow-elevation-1' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                isAnnual ? 'bg-card text-foreground shadow-elevation-1' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-elevation-3 hover:-translate-y-1 ${
                plan.highlight 
                  ? 'border-primary shadow-elevation-2 scale-105' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-foreground">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      {plan.monthlyPrice === 0 ? 'forever' : '/month'}
                    </span>
                  </div>
                  {plan.monthlyPrice > 0 && isAnnual && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.annualPrice * 12}/year)
                    </div>
                  )}
                </div>

                <Button
                  onClick={plan.id === 3 ? undefined : onGetStarted}
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.highlight 
                      ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white border-0 shadow-elevation-1 hover:shadow-elevation-2' 
                      : 'border-2 border-border hover:border-primary hover:text-primary'
                  }`}
                  variant={plan.highlight ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Everything in {plan.name}:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Icon name="Check" size={16} className="text-secondary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, limitIndex) => (
                        <li key={limitIndex} className="flex items-start">
                          <Icon name="X" size={14} className="text-muted-foreground mt-1 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-[#5A4FCF] mb-4">
            Questions about pricing?
          </h3>
          <p className="text-[#2E2E2E] mb-6">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <Button
            variant="outline"
            className="border-2 border-border hover:border-primary hover:text-primary"
          >
            <Icon name="MessageCircle" size={18} className="mr-2" />
            Contact Sales
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;