import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadge = ({ achievement, onClick }) => {
  const getBadgeColor = (type) => {
    switch (type) {
      case 'gold':
        return 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white';
      case 'silver':
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white';
      case 'bronze':
        return 'bg-gradient-to-br from-amber-600 to-amber-800 text-white';
      default:
        return 'bg-gradient-to-br from-primary to-secondary text-white';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth cursor-pointer"
      onClick={() => onClick && onClick(achievement)}
    >
      <div className="flex items-center space-x-3 mb-3">
        <div className={`w-12 h-12 rounded-full ${getBadgeColor(achievement?.type)} flex items-center justify-center shadow-elevation-1`}>
          <Icon name={achievement?.icon} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-card-foreground line-clamp-1">
            {achievement?.title}
          </h4>
          <p className="text-sm text-muted-foreground">
            Earned {formatDate(achievement?.earnedDate)}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
        {achievement?.description}
      </p>
      {achievement?.points && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            +{achievement?.points} points
          </span>
          {achievement?.isRare && (
            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
              Rare
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;