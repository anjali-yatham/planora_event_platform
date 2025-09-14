import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ data, onUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const eventTypes = [
    { value: 'physical', label: 'Physical Location' },
    { value: 'virtual', label: 'Virtual Event' },
    { value: 'hybrid', label: 'Hybrid (Physical + Virtual)' }
  ];

  const virtualPlatforms = [
    { value: 'zoom', label: 'Zoom' },
    { value: 'teams', label: 'Microsoft Teams' },
    { value: 'meet', label: 'Google Meet' },
    { value: 'webex', label: 'Cisco Webex' },
    { value: 'gotomeeting', label: 'GoToMeeting' },
    { value: 'custom', label: 'Custom Platform' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!data?.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (data?.eventType === 'physical' || data?.eventType === 'hybrid') {
      if (!data?.venueName?.trim()) {
        newErrors.venueName = 'Venue name is required';
      }
      if (!data?.venueAddress?.trim()) {
        newErrors.venueAddress = 'Venue address is required';
      }
    }

    if (data?.eventType === 'virtual' || data?.eventType === 'hybrid') {
      if (!data?.virtualPlatform) {
        newErrors.virtualPlatform = 'Please select a virtual platform';
      }
      if (data?.virtualPlatform === 'custom' && !data?.customPlatformName?.trim()) {
        newErrors.customPlatformName = 'Custom platform name is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  const isPhysical = data?.eventType === 'physical' || data?.eventType === 'hybrid';
  const isVirtual = data?.eventType === 'virtual' || data?.eventType === 'hybrid';

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Event Location & Platform</h2>
        <p className="text-muted-foreground">
          Choose how attendees will join your event - in person, online, or both.
        </p>
      </div>
      <div className="space-y-6">
        <Select
          label="Event Type"
          placeholder="Select event type"
          options={eventTypes}
          value={data?.eventType || ''}
          onChange={(value) => handleInputChange('eventType', value)}
          error={errors?.eventType}
          required
          className="mb-6"
        />

        {isPhysical && (
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="MapPin" size={20} className="text-primary" />
              <h3 className="font-medium text-foreground">Physical Location Details</h3>
            </div>

            <Input
              label="Venue Name"
              type="text"
              placeholder="Enter venue or location name"
              value={data?.venueName || ''}
              onChange={(e) => handleInputChange('venueName', e?.target?.value)}
              error={errors?.venueName}
              required
            />

            <Input
              label="Venue Address"
              type="text"
              placeholder="Enter complete address"
              value={data?.venueAddress || ''}
              onChange={(e) => handleInputChange('venueAddress', e?.target?.value)}
              error={errors?.venueAddress}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                type="text"
                placeholder="Enter city"
                value={data?.venueCity || ''}
                onChange={(e) => handleInputChange('venueCity', e?.target?.value)}
              />

              <Input
                label="Postal Code"
                type="text"
                placeholder="Enter postal code"
                value={data?.venuePostalCode || ''}
                onChange={(e) => handleInputChange('venuePostalCode', e?.target?.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Additional Location Notes
              </label>
              <textarea
                placeholder="Parking instructions, building access, room details, etc."
                value={data?.locationNotes || ''}
                onChange={(e) => handleInputChange('locationNotes', e?.target?.value)}
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm transition-smooth resize-none focus:border-primary focus:ring-primary/20 focus:outline-none focus:ring-2"
              />
            </div>

            <Checkbox
              label="Provide directions and parking information"
              description="Include detailed directions in event confirmation emails"
              checked={data?.includeDirections || false}
              onChange={(e) => handleInputChange('includeDirections', e?.target?.checked)}
            />
          </div>
        )}

        {isVirtual && (
          <div className="bg-muted/30 rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Monitor" size={20} className="text-secondary" />
              <h3 className="font-medium text-foreground">Virtual Platform Settings</h3>
            </div>

            <Select
              label="Virtual Platform"
              placeholder="Select virtual platform"
              options={virtualPlatforms}
              value={data?.virtualPlatform || ''}
              onChange={(value) => handleInputChange('virtualPlatform', value)}
              error={errors?.virtualPlatform}
              required
            />

            {data?.virtualPlatform === 'custom' && (
              <Input
                label="Custom Platform Name"
                type="text"
                placeholder="Enter platform name"
                value={data?.customPlatformName || ''}
                onChange={(e) => handleInputChange('customPlatformName', e?.target?.value)}
                error={errors?.customPlatformName}
                required
              />
            )}

            <Input
              label="Meeting Link/URL"
              type="url"
              placeholder="https://zoom.us/j/123456789 or platform-specific link"
              value={data?.meetingLink || ''}
              onChange={(e) => handleInputChange('meetingLink', e?.target?.value)}
              description="This will be shared with registered attendees"
            />

            <Input
              label="Meeting ID/Room Number"
              type="text"
              placeholder="Enter meeting ID or room number"
              value={data?.meetingId || ''}
              onChange={(e) => handleInputChange('meetingId', e?.target?.value)}
            />

            <Input
              label="Access Password"
              type="text"
              placeholder="Enter meeting password (if required)"
              value={data?.meetingPassword || ''}
              onChange={(e) => handleInputChange('meetingPassword', e?.target?.value)}
            />

            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-accent mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Security Note</h4>
                  <p className="text-muted-foreground text-sm">
                    Meeting links and passwords will only be shared with registered attendees via email confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Checkbox
                label="Enable waiting room"
                description="Attendees will wait for host approval before joining"
                checked={data?.enableWaitingRoom || false}
                onChange={(e) => handleInputChange('enableWaitingRoom', e?.target?.checked)}
              />

              <Checkbox
                label="Record session"
                description="Automatically record the event for later viewing"
                checked={data?.recordSession || false}
                onChange={(e) => handleInputChange('recordSession', e?.target?.checked)}
              />

              <Checkbox
                label="Enable chat"
                description="Allow attendees to chat during the event"
                checked={data?.enableChat || false}
                onChange={(e) => handleInputChange('enableChat', e?.target?.checked)}
              />
            </div>
          </div>
        )}

        {data?.eventType === 'hybrid' && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Users" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Hybrid Event</h4>
                <p className="text-muted-foreground text-sm">
                  You're creating a hybrid event with both physical and virtual attendance options. 
                  Make sure to coordinate between both audiences during the event.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
        >
          Back to Scheduling
        </Button>
        <Button
          variant="default"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          Continue to Registration
        </Button>
      </div>
    </div>
  );
};

export default LocationStep;