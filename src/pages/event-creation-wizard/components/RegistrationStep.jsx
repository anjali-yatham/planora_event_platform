import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationStep = ({ data, onUpdate, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [ticketTiers, setTicketTiers] = useState(data?.ticketTiers || [
    { id: 1, name: 'General Admission', price: 0, capacity: 100, description: '' }
  ]);

  const registrationTypes = [
    { value: 'open', label: 'Open Registration' },
    { value: 'approval', label: 'Approval Required' },
    { value: 'invite', label: 'Invite Only' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleTicketTierChange = (index, field, value) => {
    const updatedTiers = ticketTiers?.map((tier, i) => 
      i === index ? { ...tier, [field]: value } : tier
    );
    setTicketTiers(updatedTiers);
    onUpdate({ ticketTiers: updatedTiers });
  };

  const addTicketTier = () => {
    const newTier = {
      id: Date.now(),
      name: '',
      price: 0,
      capacity: 50,
      description: ''
    };
    const updatedTiers = [...ticketTiers, newTier];
    setTicketTiers(updatedTiers);
    onUpdate({ ticketTiers: updatedTiers });
  };

  const removeTicketTier = (index) => {
    if (ticketTiers?.length > 1) {
      const updatedTiers = ticketTiers?.filter((_, i) => i !== index);
      setTicketTiers(updatedTiers);
      onUpdate({ ticketTiers: updatedTiers });
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!data?.registrationType) {
      newErrors.registrationType = 'Please select a registration type';
    }

    if (!data?.maxCapacity || data?.maxCapacity < 1) {
      newErrors.maxCapacity = 'Maximum capacity must be at least 1';
    }

    // Validate ticket tiers
    ticketTiers?.forEach((tier, index) => {
      if (!tier?.name?.trim()) {
        newErrors[`tier_${index}_name`] = 'Ticket tier name is required';
      }
      if (tier?.capacity < 1) {
        newErrors[`tier_${index}_capacity`] = 'Capacity must be at least 1';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  const totalTierCapacity = ticketTiers?.reduce((sum, tier) => sum + (parseInt(tier?.capacity) || 0), 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Registration Configuration</h2>
        <p className="text-muted-foreground">
          Set up how attendees can register for your event and manage capacity limits.
        </p>
      </div>
      <div className="space-y-6">
        <Select
          label="Registration Type"
          placeholder="Select registration type"
          options={registrationTypes}
          value={data?.registrationType || ''}
          onChange={(value) => handleInputChange('registrationType', value)}
          error={errors?.registrationType}
          required
          className="mb-4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Maximum Capacity"
            type="number"
            placeholder="Enter maximum attendees"
            value={data?.maxCapacity || ''}
            onChange={(e) => handleInputChange('maxCapacity', parseInt(e?.target?.value))}
            error={errors?.maxCapacity}
            required
            min="1"
          />

          <Input
            label="Registration Deadline"
            type="datetime-local"
            value={data?.registrationDeadline || ''}
            onChange={(e) => handleInputChange('registrationDeadline', e?.target?.value)}
            description="Leave empty for no deadline"
          />
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Icon name="Ticket" size={20} className="text-primary" />
              <h3 className="font-medium text-foreground">Ticket Tiers & Pricing</h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={addTicketTier}
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
            >
              Add Tier
            </Button>
          </div>

          <div className="space-y-4">
            {ticketTiers?.map((tier, index) => (
              <div key={tier?.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">Tier {index + 1}</h4>
                  {ticketTiers?.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTicketTier(index)}
                      iconName="Trash2"
                      iconSize={14}
                      className="text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    label="Tier Name"
                    type="text"
                    placeholder="e.g., Early Bird, VIP"
                    value={tier?.name}
                    onChange={(e) => handleTicketTierChange(index, 'name', e?.target?.value)}
                    error={errors?.[`tier_${index}_name`]}
                    required
                  />

                  <Input
                    label="Price ($)"
                    type="number"
                    placeholder="0"
                    value={tier?.price}
                    onChange={(e) => handleTicketTierChange(index, 'price', parseFloat(e?.target?.value) || 0)}
                    min="0"
                    step="0.01"
                  />

                  <Input
                    label="Capacity"
                    type="number"
                    placeholder="50"
                    value={tier?.capacity}
                    onChange={(e) => handleTicketTierChange(index, 'capacity', parseInt(e?.target?.value) || 0)}
                    error={errors?.[`tier_${index}_capacity`]}
                    required
                    min="1"
                  />
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe what's included in this tier"
                    value={tier?.description}
                    onChange={(e) => handleTicketTierChange(index, 'description', e?.target?.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm transition-smooth resize-none focus:border-primary focus:ring-primary/20 focus:outline-none focus:ring-2"
                  />
                </div>
              </div>
            ))}
          </div>

          {totalTierCapacity > 0 && (
            <div className="mt-4 p-3 bg-accent/10 border border-accent/20 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-medium">Total tier capacity:</span> {totalTierCapacity} attendees
                {data?.maxCapacity && totalTierCapacity > data?.maxCapacity && (
                  <span className="text-destructive ml-2">
                    (Exceeds maximum capacity of {data?.maxCapacity})
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Enable waitlist"
            description="Allow attendees to join a waitlist when event is full"
            checked={data?.enableWaitlist || false}
            onChange={(e) => handleInputChange('enableWaitlist', e?.target?.checked)}
          />

          <Checkbox
            label="Require attendee information"
            description="Collect additional information during registration"
            checked={data?.requireAttendeeInfo || false}
            onChange={(e) => handleInputChange('requireAttendeeInfo', e?.target?.checked)}
          />

          <Checkbox
            label="Send confirmation emails"
            description="Automatically send registration confirmation emails"
            checked={data?.sendConfirmationEmails !== false}
            onChange={(e) => handleInputChange('sendConfirmationEmails', e?.target?.checked)}
          />

          <Checkbox
            label="Allow cancellations"
            description="Let attendees cancel their registration"
            checked={data?.allowCancellations || false}
            onChange={(e) => handleInputChange('allowCancellations', e?.target?.checked)}
          />
        </div>

        {data?.registrationType === 'approval' && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="UserCheck" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Approval Required</h4>
                <p className="text-muted-foreground text-sm">
                  Registrations will require your approval before attendees can access the event. 
                  You'll receive notifications for pending approvals.
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
          Back to Location
        </Button>
        <Button
          variant="default"
          onClick={handleNext}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
        >
          Continue to Customization
        </Button>
      </div>
    </div>
  );
};

export default RegistrationStep;