import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEventsList = ({ events, onJoinEvent, onViewDetails }) => {
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date?.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    };
  };

  const getTimeUntilEvent = (dateString) => {
    const now = new Date();
    const eventDate = new Date(dateString);
    const diffMs = eventDate - now;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `in ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffMs > 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return `in ${diffMinutes} min${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'Starting now';
    }
  };

  if (events?.length === 0) {
    return (
      <div className="text-center py-8">
        <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No upcoming events</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {events?.map((event) => {
        const { date, time } = formatDateTime(event?.startDate);
        const timeUntil = getTimeUntilEvent(event?.startDate);
        
        return (
          <div key={event?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-center min-w-0">
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                      {date?.split(' ')?.[0]}
                    </div>
                    <div className="text-lg font-bold text-card-foreground">
                      {date?.split(' ')?.[1]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-card-foreground line-clamp-1 mb-1">
                      {event?.title}
                    </h4>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <span>{time}</span>
                      <span>•</span>
                      <span className="line-clamp-1">{timeUntil}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name={event?.type === 'virtual' ? 'Monitor' : 'MapPin'} size={14} className="mr-1" />
                  <span className="line-clamp-1">{event?.location}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(event)}
                >
                  <Icon name="Eye" size={16} />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="left"
                  onClick={() => onJoinEvent(event)}
                >
                  Join
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingEventsList;