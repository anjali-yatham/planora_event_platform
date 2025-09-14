import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySettings = ({ privacySettings, onPrivacyUpdate }) => {
  const [settings, setSettings] = useState(privacySettings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (category, setting, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings?.[category],
        [setting]: value
      }
    };
    setSettings(newSettings);
    setHasChanges(true);
  };

  const handleSave = () => {
    onPrivacyUpdate(settings);
    setHasChanges(false);
  };

  const handleReset = () => {
    setSettings(privacySettings);
    setHasChanges(false);
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', description: 'Visible to everyone' },
    { value: 'connections', label: 'Connections Only', description: 'Visible to your connections' },
    { value: 'private', label: 'Private', description: 'Only visible to you' }
  ];

  const settingsCategories = [
    {
      title: 'Profile Visibility',
      icon: 'Eye',
      settings: [
        { key: 'profilePhoto', label: 'Profile Photo', description: 'Who can see your profile photo' },
        { key: 'basicInfo', label: 'Basic Information', description: 'Name, title, and bio visibility' },
        { key: 'contactInfo', label: 'Contact Information', description: 'Email and phone number visibility' },
        { key: 'location', label: 'Location', description: 'Your location information' }
      ]
    },
    {
      title: 'Activity & Engagement',
      icon: 'Activity',
      settings: [
        { key: 'eventHistory', label: 'Event History', description: 'Your past event participation' },
        { key: 'achievements', label: 'Achievements', description: 'Badges and certificates earned' },
        { key: 'skills', label: 'Skills & Endorsements', description: 'Your skill list and endorsements' },
        { key: 'connections', label: 'Connection List', description: 'Who can see your connections' }
      ]
    },
    {
      title: 'Communication',
      icon: 'MessageSquare',
      settings: [
        { key: 'directMessages', label: 'Direct Messages', description: 'Who can send you messages' },
        { key: 'eventInvitations', label: 'Event Invitations', description: 'Who can invite you to events' },
        { key: 'connectionRequests', label: 'Connection Requests', description: 'Who can send connection requests' }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Privacy Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Control who can see your information and interact with you
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-primary" />
          {hasChanges && (
            <div className="w-2 h-2 bg-warning rounded-full"></div>
          )}
        </div>
      </div>
      <div className="space-y-8">
        {settingsCategories?.map((category) => (
          <div key={category?.title} className="space-y-4">
            <div className="flex items-center space-x-2 pb-2 border-b border-border">
              <Icon name={category?.icon} size={18} className="text-primary" />
              <h3 className="font-medium text-foreground">{category?.title}</h3>
            </div>
            
            <div className="space-y-4">
              {category?.settings?.map((setting) => (
                <div key={setting?.key} className="flex items-center justify-between py-3 px-4 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm">{setting?.label}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{setting?.description}</p>
                  </div>
                  <div className="ml-4">
                    <select
                      value={settings?.[category?.title?.toLowerCase()?.replace(/\s+/g, '')]?.[setting?.key] || 'public'}
                      onChange={(e) => handleSettingChange(
                        category?.title?.toLowerCase()?.replace(/\s+/g, ''),
                        setting?.key,
                        e?.target?.value
                      )}
                      className="text-sm px-3 py-1 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                    >
                      {privacyOptions?.map((option) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Data Management */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Database" size={18} className="mr-2 text-primary" />
          Data Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
            <h4 className="font-medium text-foreground text-sm mb-2">Download Your Data</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Get a copy of all your data including profile, events, and activities
            </p>
            <Button variant="outline" size="sm" iconName="Download">
              Request Download
            </Button>
          </div>
          <div className="p-4 bg-muted/20 rounded-lg border border-border/50">
            <h4 className="font-medium text-foreground text-sm mb-2">Delete Account</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Permanently delete your account and all associated data
            </p>
            <Button variant="destructive" size="sm" iconName="Trash2">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      {/* Save Changes */}
      {hasChanges && (
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between bg-warning/10 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
          <div className="flex items-center space-x-2 text-warning">
            <Icon name="AlertTriangle" size={16} />
            <span className="text-sm font-medium">You have unsaved changes</span>
          </div>
          <div className="flex space-x-3">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySettings;