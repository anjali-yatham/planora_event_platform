import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ event, onRegister, onDismiss }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getRelevanceColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 70) return 'text-primary bg-primary/10';
    return 'text-accent bg-accent/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-smooth">
      <div className="relative h-40 overflow-hidden">
        <Image
          src={event?.image}
          alt={event?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRelevanceColor(event?.relevanceScore)}`}>
            {event?.relevanceScore}% Match
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <button
            onClick={() => onDismiss(event?.id)}
            className="w-6 h-6 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-smooth"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-semibold text-card-foreground mb-2 line-clamp-2">
          {event?.title}
        </h4>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Icon name="Calendar" size={14} className="mr-1" />
          <span>{formatDate(event?.startDate)}</span>
          <span className="mx-2">•</span>
          <Icon name={event?.type === 'virtual' ? 'Monitor' : 'MapPin'} size={14} className="mr-1" />
          <span className="line-clamp-1">{event?.type === 'virtual' ? 'Virtual' : 'In-person'}</span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Icon name="Tag" size={14} className="mr-1" />
          <span className="line-clamp-1">{event?.category}</span>
        </div>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Why recommended:</p>
          <p className="text-xs text-card-foreground">{event?.reason}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-card-foreground">
            {event?.isPaid ? `$${event?.price}` : 'Free'}
          </span>
          <Button
            variant="default"
            size="sm"
            onClick={() => onRegister(event)}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;