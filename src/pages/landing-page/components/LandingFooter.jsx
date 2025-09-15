import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LandingFooter = () => {
  const navigate = useNavigate();

  const footerLinks = {
    product: {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Security', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'API Documentation', href: '#' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Templates', href: '#' },
        { label: 'Webinars', href: '#' },
        { label: 'Case Studies', href: '#' },
        { label: 'Status Page', href: '#' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'GDPR', href: '#' },
        { label: 'Data Processing', href: '#' },
        { label: 'Security', href: '#' }
      ]
    }
  };

  const socialLinks = [
    { name: 'Twitter', icon: 'Twitter', href: '#', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#', color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: 'Github', href: '#', color: 'hover:text-gray-400' },
    { name: 'Facebook', icon: 'Facebook', href: '#', color: 'hover:text-blue-500' },
    { name: 'Instagram', icon: 'Instagram', href: '#', color: 'hover:text-pink-500' }
  ];

  const handleLinkClick = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="bg-gradient-to-b from-purple-100 to-purple-200 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <span className="text-2xl font-bold text-white drop-shadow-md">Planora</span>
              </div>
              <p className="text-white mb-8 leading-relaxed drop-shadow-sm font-medium">
                The next-generation event management platform that empowers organizers 
                with AI-driven insights and modern collaboration tools.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {Object.entries(footerLinks).map(([key, section]) => (
                  <div key={key}>
                    <h4 className="font-bold text-white mb-4 drop-shadow-sm text-lg">
                      {section.title}
                    </h4>
                    <ul className="space-y-3">
                      {section.links.map((link, index) => (
                        <li key={index}>
                          <button
                            onClick={() => handleLinkClick(link.href)}
                            className="text-white hover:text-white/80 transition-smooth text-sm font-medium drop-shadow-sm"
                          >
                            {link.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0">
            <div className="max-w-md">
              <h4 className="font-bold text-white mb-2 drop-shadow-sm text-lg">
                Stay updated with Planora
              </h4>
              <p className="text-white text-sm font-medium drop-shadow-sm">
                Get the latest features, tips, and event management insights delivered to your inbox.
              </p>
            </div>
            
            <div className="flex w-full md:w-auto max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-r-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-white">
              <span className="font-medium drop-shadow-sm">© {new Date().getFullYear()} Planora. All rights reserved.</span>
              <button 
                onClick={() => navigate('/user-authentication')}
                className="hover:text-white/80 transition-smooth font-medium drop-shadow-sm"
              >
                Sign In
              </button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2 text-white">
                <Icon name="Shield" size={16} className="text-white drop-shadow-sm" />
                <span className="font-medium drop-shadow-sm">SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Icon name="Lock" size={16} className="text-white drop-shadow-sm" />
                <span className="font-medium drop-shadow-sm">GDPR Ready</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Icon name="Award" size={16} className="text-white drop-shadow-sm" />
                <span className="font-medium drop-shadow-sm">99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;