import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialAuth = ({ onSocialAuth, loading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Mail',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: 'Linkedin',
      bgColor: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: 'Github',
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-gray-900'
    },
    {
      id: 'apple',
      name: 'iOS',
      icon: 'Apple',
      bgColor: 'bg-black hover:bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-black'
    }
  ];

  const handleSocialClick = (providerId) => {
    onSocialAuth(providerId);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      {/* Social Auth Buttons */}
      <div className="space-y-3">
        {socialProviders?.map((provider) => (
          <button
            key={provider?.id}
            type="button"
            onClick={() => handleSocialClick(provider?.id)}
            disabled={loading}
            className={`w-full flex items-center justify-center space-x-3 py-3 px-4 rounded-lg border transition-smooth ${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Icon name={provider?.icon} size={20} />
            <span className="font-medium">Continue with {provider?.name}</span>
          </button>
        ))}
      </div>
      {/* Trust Signals */}
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={14} />
            <span>SSL Secured</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={14} />
            <span>256-bit Encryption</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialAuth;