import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AuthForm = ({ mode, onModeChange, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors?.[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex?.test(formData?.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData?.password) {
      errors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation (only for sign up)
    if (mode === 'signup') {
      if (!formData?.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getPasswordStrength = (password) => {
    if (password?.length === 0) return { strength: 0, label: '' };
    if (password?.length < 6) return { strength: 1, label: 'Weak' };
    if (password?.length < 10) return { strength: 2, label: 'Medium' };
    return { strength: 3, label: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Navigation */}
      <div className="flex bg-muted rounded-lg p-1 mb-8">
        <button
          type="button"
          onClick={() => onModeChange('signin')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
            mode === 'signin' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => onModeChange('signup')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-smooth ${
            mode === 'signup' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sign Up
        </button>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Role Selection (Sign Up Only) */}
        {mode === 'signup' && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                className={`p-4 rounded-lg border-2 transition-smooth text-left ${
                  formData?.role === 'student' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="GraduationCap" size={20} />
                  <div>
                    <div className="font-medium">Student</div>
                    <div className="text-xs opacity-70">Join events & learn</div>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: 'host' }))}
                className={`p-4 rounded-lg border-2 transition-smooth text-left ${
                  formData?.role === 'host' ?'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-muted-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={20} />
                  <div>
                    <div className="font-medium">Host</div>
                    <div className="text-xs opacity-70">Create & manage events</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Email Input */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={validationErrors?.email}
          required
        />

        {/* Password Input */}
        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={validationErrors?.password}
            required
          />
          
          {/* Password Strength Indicator (Sign Up Only) */}
          {mode === 'signup' && formData?.password && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Password strength</span>
                <span className={`font-medium ${
                  passwordStrength?.strength === 1 ? 'text-error' :
                  passwordStrength?.strength === 2 ? 'text-warning' :
                  passwordStrength?.strength === 3 ? 'text-success' : ''
                }`}>
                  {passwordStrength?.label}
                </span>
              </div>
              <div className="flex space-x-1">
                {[1, 2, 3]?.map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-smooth ${
                      level <= passwordStrength?.strength
                        ? passwordStrength?.strength === 1 ? 'bg-error' :
                          passwordStrength?.strength === 2 ? 'bg-warning': 'bg-success' :'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Input (Sign Up Only) */}
        {mode === 'signup' && (
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData?.confirmPassword}
            onChange={handleInputChange}
            error={validationErrors?.confirmPassword}
            required
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-lg bg-error/10 border border-error/20 text-error text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={loading}
          className="h-12"
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </Button>

        {/* Forgot Password Link (Sign In Only) */}
        {mode === 'signin' && (
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Forgot your password?
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;