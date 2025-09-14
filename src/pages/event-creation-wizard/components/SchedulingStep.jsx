import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SchedulingStep = ({ data, onUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});

  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' }
  ];

  const recurrenceOptions = [
    { value: 'none', label: 'No Recurrence' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!data?.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!data?.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    
    if (!data?.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    if (!data?.endTime) {
      newErrors.endTime = 'End time is required';
    }
    
    if (!data?.timezone) {
      newErrors.timezone = 'Please select a timezone';
    }

    // Validate that end date/time is after start date/time
    if (data?.startDate && data?.endDate && data?.startTime && data?.endTime) {
      const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
      const endDateTime = new Date(`${data.endDate}T${data.endTime}`);
      
      if (endDateTime <= startDateTime) {
        newErrors.endDate = 'End date and time must be after start date and time';
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

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now?.toISOString()?.split('T')?.[0];
    const time = now?.toTimeString()?.slice(0, 5);
    return { date, time };
  };

  const { date: currentDate, time: currentTime } = getCurrentDateTime();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Event Scheduling</h2>
        <p className="text-muted-foreground">
          Set the date, time, and duration for your event. Consider your target audience's timezone.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input
            label="Start Date"
            type="date"
            value={data?.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e?.target?.value)}
            error={errors?.startDate}
            required
            min={currentDate}
          />

          <Input
            label="Start Time"
            type="time"
            value={data?.startTime || ''}
            onChange={(e) => handleInputChange('startTime', e?.target?.value)}
            error={errors?.startTime}
            required
          />
        </div>

        <div className="space-y-4">
          <Input
            label="End Date"
            type="date"
            value={data?.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e?.target?.value)}
            error={errors?.endDate}
            required
            min={data?.startDate || currentDate}
          />

          <Input
            label="End Time"
            type="time"
            value={data?.endTime || ''}
            onChange={(e) => handleInputChange('endTime', e?.target?.value)}
            error={errors?.endTime}
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <Select
          label="Timezone"
          placeholder="Select timezone"
          options={timezones}
          value={data?.timezone || ''}
          onChange={(value) => handleInputChange('timezone', value)}
          error={errors?.timezone}
          required
          searchable
          className="mb-6"
        />
      </div>
      <div className="bg-muted/30 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Clock" size={20} className="text-primary mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-1">Duration Estimate</h3>
            <p className="text-muted-foreground text-sm">
              {data?.startDate && data?.endDate && data?.startTime && data?.endTime ? (
                (() => {
                  const start = new Date(`${data.startDate}T${data.startTime}`);
                  const end = new Date(`${data.endDate}T${data.endTime}`);
                  const diffMs = end - start;
                  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                  
                  if (diffHours > 0) {
                    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes > 0 ? `and ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}` : ''}`;
                  } else {
                    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
                  }
                })()
              ) : (
                'Please set start and end times to see duration'
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Recurrence"
          placeholder="Select recurrence pattern"
          options={recurrenceOptions}
          value={data?.recurrence || 'none'}
          onChange={(value) => handleInputChange('recurrence', value)}
          className="mb-4"
        />

        {data?.recurrence && data?.recurrence !== 'none' && (
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Repeat" size={20} className="text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Recurring Event</h4>
                <p className="text-muted-foreground text-sm">
                  This event will repeat {data?.recurrence} starting from the selected date.
                </p>
              </div>
            </div>
          </div>
        )}

        <Checkbox
          label="All-day event"
          description="This event runs for the entire day"
          checked={data?.isAllDay || false}
          onChange={(e) => handleInputChange('isAllDay', e?.target?.checked)}
        />

        <Checkbox
          label="Send calendar invitations"
          description="Automatically send calendar invites to registered attendees"
          checked={data?.sendCalendarInvites || false}
          onChange={(e) => handleInputChange('sendCalendarInvites', e?.target?.checked)}
        />
      </div>
      <div className="flex justify-between pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
        >
          Back to Details
        </Button>
        <Button
          variant="default"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          Continue to Location
        </Button>
      </div>
    </div>
  );
};

export default SchedulingStep;