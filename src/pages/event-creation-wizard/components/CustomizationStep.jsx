import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CustomizationStep = ({ data, onUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const colorThemes = [
    { value: 'purple', label: 'Purple (Default)' },
    { value: 'blue', label: 'Professional Blue' },
    { value: 'green', label: 'Nature Green' },
    { value: 'orange', label: 'Energetic Orange' },
    { value: 'red', label: 'Bold Red' },
    { value: 'gray', label: 'Minimal Gray' }
  ];

  const templates = [
    { value: 'conference', label: 'Conference Template' },
    { value: 'workshop', label: 'Workshop Template' },
    { value: 'networking', label: 'Networking Template' },
    { value: 'webinar', label: 'Webinar Template' },
    { value: 'training', label: 'Training Template' },
    { value: 'custom', label: 'Custom Design' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    // All fields in this step are optional, but we can add validation if needed
    if (data?.customDomain && !data?.customDomain?.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)) {
      newErrors.customDomain = 'Please enter a valid domain name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Event Customization</h2>
        <p className="text-muted-foreground">
          Customize the look and feel of your event page and add advanced features.
        </p>
      </div>
      <div className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Palette" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Branding & Design</h3>
          </div>

          <div className="space-y-4">
            <Select
              label="Color Theme"
              placeholder="Select color theme"
              options={colorThemes}
              value={data?.colorTheme || 'purple'}
              onChange={(value) => handleInputChange('colorTheme', value)}
              className="mb-4"
            />

            <Select
              label="Page Template"
              placeholder="Select page template"
              options={templates}
              value={data?.template || 'conference'}
              onChange={(value) => handleInputChange('template', value)}
              className="mb-4"
            />

            <Input
              label="Custom Event URL"
              type="text"
              placeholder="my-awesome-event"
              value={data?.customSlug || ''}
              onChange={(e) => handleInputChange('customSlug', e?.target?.value?.toLowerCase()?.replace(/[^a-z0-9-]/g, ''))}
              description="This will create a custom URL: planora.com/events/your-slug"
            />

            <Input
              label="Custom Domain"
              type="text"
              placeholder="events.yourcompany.com"
              value={data?.customDomain || ''}
              onChange={(e) => handleInputChange('customDomain', e?.target?.value)}
              error={errors?.customDomain}
              description="Use your own domain for the event page (Pro feature)"
            />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Settings" size={20} className="text-secondary" />
            <h3 className="font-medium text-foreground">Advanced Features</h3>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Enable networking features"
              description="Allow attendees to connect and chat with each other"
              checked={data?.enableNetworking || false}
              onChange={(e) => handleInputChange('enableNetworking', e?.target?.checked)}
            />

            <Checkbox
              label="Enable Q&A sessions"
              description="Allow attendees to submit questions during the event"
              checked={data?.enableQA || false}
              onChange={(e) => handleInputChange('enableQA', e?.target?.checked)}
            />

            <Checkbox
              label="Enable live polls"
              description="Create interactive polls during your event"
              checked={data?.enablePolls || false}
              onChange={(e) => handleInputChange('enablePolls', e?.target?.checked)}
            />

            <Checkbox
              label="Enable breakout rooms"
              description="Create smaller discussion groups during the event"
              checked={data?.enableBreakoutRooms || false}
              onChange={(e) => handleInputChange('enableBreakoutRooms', e?.target?.checked)}
            />

            <Checkbox
              label="Enable screen sharing"
              description="Allow attendees to share their screens"
              checked={data?.enableScreenSharing || false}
              onChange={(e) => handleInputChange('enableScreenSharing', e?.target?.checked)}
            />

            <Checkbox
              label="Enable event analytics"
              description="Track detailed attendance and engagement metrics"
              checked={data?.enableAnalytics !== false}
              onChange={(e) => handleInputChange('enableAnalytics', e?.target?.checked)}
            />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Share2" size={20} className="text-accent" />
            <h3 className="font-medium text-foreground">Social & Marketing</h3>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Enable social sharing"
              description="Add social media sharing buttons to the event page"
              checked={data?.enableSocialSharing !== false}
              onChange={(e) => handleInputChange('enableSocialSharing', e?.target?.checked)}
            />

            <Checkbox
              label="Enable referral tracking"
              description="Track how attendees found your event"
              checked={data?.enableReferralTracking || false}
              onChange={(e) => handleInputChange('enableReferralTracking', e?.target?.checked)}
            />

            <Checkbox
              label="Enable email reminders"
              description="Send automatic reminder emails to registered attendees"
              checked={data?.enableEmailReminders !== false}
              onChange={(e) => handleInputChange('enableEmailReminders', e?.target?.checked)}
            />

            <Checkbox
              label="Enable post-event survey"
              description="Collect feedback from attendees after the event"
              checked={data?.enablePostEventSurvey || false}
              onChange={(e) => handleInputChange('enablePostEventSurvey', e?.target?.checked)}
            />
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Shield" size={20} className="text-success" />
            <h3 className="font-medium text-foreground">Security & Privacy</h3>
          </div>

          <div className="space-y-4">
            <Checkbox
              label="Require registration approval"
              description="Manually approve each registration request"
              checked={data?.requireApproval || false}
              onChange={(e) => handleInputChange('requireApproval', e?.target?.checked)}
            />

            <Checkbox
              label="Enable password protection"
              description="Require a password to access the event page"
              checked={data?.enablePasswordProtection || false}
              onChange={(e) => handleInputChange('enablePasswordProtection', e?.target?.checked)}
            />

            {data?.enablePasswordProtection && (
              <Input
                label="Event Password"
                type="password"
                placeholder="Enter event password"
                value={data?.eventPassword || ''}
                onChange={(e) => handleInputChange('eventPassword', e?.target?.value)}
                description="Attendees will need this password to access the event"
              />
            )}

            <Checkbox
              label="Enable GDPR compliance"
              description="Add privacy policy and data consent options"
              checked={data?.enableGDPR !== false}
              onChange={(e) => handleInputChange('enableGDPR', e?.target?.checked)}
            />
          </div>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Sparkles" size={20} className="text-accent mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Pro Features</h4>
              <p className="text-muted-foreground text-sm">
                Some advanced features like custom domains, advanced analytics, and unlimited breakout rooms 
                are available with Planora Pro. Upgrade to unlock all customization options.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
        >
          Back to Registration
        </Button>
        <Button
          variant="default"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          Review & Publish
        </Button>
      </div>
    </div>
  );
};

export default CustomizationStep;