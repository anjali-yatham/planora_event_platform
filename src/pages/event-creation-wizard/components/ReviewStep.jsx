import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewStep = ({ data, onPrevious, onPublish, onSaveDraft }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await onPublish();
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      await onSaveDraft();
    } finally {
      setIsSavingDraft(false);
    }
  };

  const formatDate = (date, time) => {
    if (!date || !time) return 'Not set';
    const dateTime = new Date(`${date}T${time}`);
    return dateTime?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventTypeDisplay = () => {
    switch (data?.eventType) {
      case 'physical': return 'Physical Location';
      case 'virtual': return 'Virtual Event';
      case 'hybrid': return 'Hybrid (Physical + Virtual)';
      default: return 'Not specified';
    }
  };

  const getTotalCapacity = () => {
    if (data?.ticketTiers && data?.ticketTiers?.length > 0) {
      return data?.ticketTiers?.reduce((sum, tier) => sum + (parseInt(tier?.capacity) || 0), 0);
    }
    return data?.maxCapacity || 0;
  };

  const getTotalRevenue = () => {
    if (data?.ticketTiers && data?.ticketTiers?.length > 0) {
      return data?.ticketTiers?.reduce((sum, tier) => {
        const price = parseFloat(tier?.price) || 0;
        const capacity = parseInt(tier?.capacity) || 0;
        return sum + (price * capacity);
      }, 0);
    }
    return 0;
  };

  const sections = [
    {
      title: 'Basic Details',
      icon: 'FileText',
      content: (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground">Event Title</p>
            <p className="text-muted-foreground">{data?.title || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Category</p>
            <p className="text-muted-foreground">{data?.category || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Description</p>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {data?.description || 'No description provided'}
            </p>
          </div>
          {data?.featuredImage && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Featured Image</p>
              <div className="w-32 h-20 rounded-lg overflow-hidden border border-border">
                <Image
                  src={data?.featuredImage}
                  alt="Event featured image"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Schedule',
      icon: 'Calendar',
      content: (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground">Start Date & Time</p>
            <p className="text-muted-foreground">{formatDate(data?.startDate, data?.startTime)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">End Date & Time</p>
            <p className="text-muted-foreground">{formatDate(data?.endDate, data?.endTime)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Timezone</p>
            <p className="text-muted-foreground">{data?.timezone || 'Not specified'}</p>
          </div>
          {data?.recurrence && data?.recurrence !== 'none' && (
            <div>
              <p className="text-sm font-medium text-foreground">Recurrence</p>
              <p className="text-muted-foreground capitalize">{data?.recurrence}</p>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Location & Platform',
      icon: 'MapPin',
      content: (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground">Event Type</p>
            <p className="text-muted-foreground">{getEventTypeDisplay()}</p>
          </div>
          {(data?.eventType === 'physical' || data?.eventType === 'hybrid') && (
            <>
              <div>
                <p className="text-sm font-medium text-foreground">Venue</p>
                <p className="text-muted-foreground">{data?.venueName || 'Not specified'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Address</p>
                <p className="text-muted-foreground">{data?.venueAddress || 'Not specified'}</p>
              </div>
            </>
          )}
          {(data?.eventType === 'virtual' || data?.eventType === 'hybrid') && (
            <>
              <div>
                <p className="text-sm font-medium text-foreground">Platform</p>
                <p className="text-muted-foreground">{data?.virtualPlatform || 'Not specified'}</p>
              </div>
              {data?.meetingLink && (
                <div>
                  <p className="text-sm font-medium text-foreground">Meeting Link</p>
                  <p className="text-muted-foreground text-sm break-all">{data?.meetingLink}</p>
                </div>
              )}
            </>
          )}
        </div>
      )
    },
    {
      title: 'Registration',
      icon: 'Users',
      content: (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-foreground">Registration Type</p>
            <p className="text-muted-foreground capitalize">{data?.registrationType || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Maximum Capacity</p>
            <p className="text-muted-foreground">{data?.maxCapacity || 'Unlimited'}</p>
          </div>
          {data?.ticketTiers && data?.ticketTiers?.length > 0 && (
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Ticket Tiers</p>
              <div className="space-y-2">
                {data?.ticketTiers?.map((tier, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-foreground">{tier?.name}</p>
                        <p className="text-sm text-muted-foreground">Capacity: {tier?.capacity}</p>
                      </div>
                      <p className="font-medium text-foreground">
                        ${parseFloat(tier?.price || 0)?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Review & Publish</h2>
        <p className="text-muted-foreground">
          Review all event details before publishing. You can still edit after publishing.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {sections?.map((section, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name={section?.icon} size={18} className="text-primary" />
              <h3 className="font-medium text-foreground">{section?.title}</h3>
            </div>
            {section?.content}
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6 mb-6">
        <h3 className="font-semibold text-foreground mb-4">Event Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{getTotalCapacity()}</div>
            <div className="text-sm text-muted-foreground">Total Capacity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">
              {data?.ticketTiers?.length || 1}
            </div>
            <div className="text-sm text-muted-foreground">Ticket Tiers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              ${getTotalRevenue()?.toFixed(2)}
            </div>
            <div className="text-sm text-muted-foreground">Potential Revenue</div>
          </div>
        </div>
      </div>
      <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Ready to Publish</h4>
            <p className="text-muted-foreground text-sm">
              Your event is complete and ready to go live. Once published, attendees can start registering 
              and you'll receive a shareable event link.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={onPrevious}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
        >
          Back to Customization
        </Button>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="secondary"
            onClick={handleSaveDraft}
            loading={isSavingDraft}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            Save as Draft
          </Button>
          <Button
            variant="default"
            onClick={handlePublish}
            loading={isPublishing}
            iconName="Send"
            iconPosition="left"
            iconSize={16}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
          >
            Publish Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;