import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ mode }) => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center mr-3">
          <Icon name="Zap" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">Planora</span>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          {mode === 'signin' ? 'Welcome back' : 'Get started'}
        </h1>
        <p className="text-muted-foreground text-lg">
          {mode === 'signin' ?'Sign in to your account to continue' :'Create your account to start planning amazing events'
          }
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center space-x-8 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">10K+</div>
          <div className="text-xs text-muted-foreground">Events Created</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">50K+</div>
          <div className="text-xs text-muted-foreground">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">98%</div>
          <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;