import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EventCard = ({ event, onJoinEvent, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'live':
        return 'text-success bg-success/10';
      case 'upcoming':
        return 'text-primary bg-primary/10';
      case 'completed':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event?.status)}`}>
            {event?.status?.charAt(0)?.toUpperCase() + event?.status?.slice(1)}
          </span>
        </div>
        {event?.isPaid && (
          <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            ${event?.price}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-card-foreground line-clamp-2 flex-1">
            {event?.title}
          </h3>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Icon name="Calendar" size={16} className="mr-2" />
          <span>{formatDate(event?.startDate)} at {formatTime(event?.startDate)}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Icon name={event?.type === 'virtual' ? 'Monitor' : 'MapPin'} size={16} className="mr-2" />
          <span className="line-clamp-1">{event?.location}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Icon name="Users" size={16} className="mr-2" />
          <span>{event?.attendees} / {event?.capacity} attendees</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event?.description}
        </p>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(event)}
          >
            View Details
          </Button>
          
          {event?.status === 'live' && (
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              onClick={() => onJoinEvent(event)}
            >
              Join Now
            </Button>
          )}
          
          {event?.status === 'upcoming' && (
            <Button
              variant="secondary"
              size="sm"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => onJoinEvent(event)}
            >
              Add to Calendar
            </Button>
          )}
          
          {event?.status === 'completed' && event?.certificateAvailable && (
            <Button
              variant="success"
              size="sm"
              iconName="Award"
              iconPosition="left"
              onClick={() => onJoinEvent(event)}
            >
              Get Certificate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;