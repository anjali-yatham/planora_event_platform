import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ notifications = [], onMarkAsRead, onClearAll }) => {
  const [showAll, setShowAll] = useState(false);

  const mockNotifications = [
    {
      id: 1,
      type: 'registration',
      title: 'New Registration',
      message: 'Sarah Johnson registered for React Advanced Workshop',
      timestamp: '2 minutes ago',
      isRead: false,
      icon: 'UserPlus',
      color: 'success'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      message: '$250 payment received for AI Conference ticket',
      timestamp: '15 minutes ago',
      isRead: false,
      icon: 'DollarSign',
      color: 'success'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Mike Chen asked a question about the venue location',
      timestamp: '1 hour ago',
      isRead: false,
      icon: 'MessageCircle',
      color: 'primary'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Event Reminder',
      message: 'React Workshop starts in 2 days - 5 seats remaining',
      timestamp: '2 hours ago',
      isRead: true,
      icon: 'Clock',
      color: 'warning'
    },
    {
      id: 5,
      type: 'update',
      title: 'Event Update',
      message: 'Venue confirmed for Digital Marketing Masterclass',
      timestamp: '1 day ago',
      isRead: true,
      icon: 'CheckCircle',
      color: 'primary'
    }
  ];

  const allNotifications = notifications.length > 0 ? notifications : mockNotifications;
  const unreadCount = allNotifications.filter(n => !n.isRead).length;
  const displayNotifications = showAll ? allNotifications : allNotifications.slice(0, 3);

  const getNotificationIcon = (type) => {
    const iconMap = {
      registration: 'UserPlus',
      payment: 'DollarSign',
      message: 'MessageCircle',
      reminder: 'Clock',
      update: 'CheckCircle',
      default: 'Bell'
    };
    return iconMap[type] || iconMap.default;
  };

  const getNotificationColor = (type) => {
    const colorMap = {
      registration: 'success',
      payment: 'success',
      message: 'primary',
      reminder: 'warning',
      update: 'primary',
      default: 'muted-foreground'
    };
    return colorMap[type] || colorMap.default;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Bell" size={20} color="var(--color-primary)" />
            <h3 className="font-semibold text-card-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          {allNotifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onClearAll && onClearAll()}
              className="text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {displayNotifications.length === 0 ? (
          <div className="p-6 text-center">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {displayNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/30 transition-smooth cursor-pointer ${
                  !notification.isRead ? 'bg-primary/5' : ''
                }`}
                onClick={() => onMarkAsRead && onMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-${getNotificationColor(notification.type)}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={14} 
                      color={`var(--color-${getNotificationColor(notification.type)})`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <p className={`text-sm font-medium ${!notification.isRead ? 'text-card-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {allNotifications.length > 3 && (
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll ? 'Show Less' : `View All (${allNotifications.length - 3} more)`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;