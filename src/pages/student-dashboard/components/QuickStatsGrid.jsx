import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsGrid = ({ stats }) => {
  const getStatIcon = (type) => {
    switch (type) {
      case 'events':
        return 'Calendar';
      case 'hours':
        return 'Clock';
      case 'certificates':
        return 'Award';
      case 'points':
        return 'Star';
      case 'streak':
        return 'Flame';
      case 'network':
        return 'Users';
      default:
        return 'BarChart3';
    }
  };

  const getStatColor = (type) => {
    switch (type) {
      case 'events':
        return 'text-primary bg-primary/10';
      case 'hours':
        return 'text-secondary bg-secondary/10';
      case 'certificates':
        return 'text-success bg-success/10';
      case 'points':
        return 'text-accent bg-accent/10';
      case 'streak':
        return 'text-orange-500 bg-orange-500/10';
      case 'network':
        return 'text-purple-500 bg-purple-500/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatValue = (value, type) => {
    if (type === 'hours' && value >= 1000) {
      return `${(value / 1000)?.toFixed(1)}k`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000)?.toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000)?.toFixed(1)}k`;
    }
    return value?.toString();
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats?.map((stat) => (
        <div key={stat?.type} className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-smooth">
          <div className={`w-10 h-10 rounded-lg ${getStatColor(stat?.type)} flex items-center justify-center mb-3`}>
            <Icon name={getStatIcon(stat?.type)} size={20} />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-card-foreground">
                {formatValue(stat?.value, stat?.type)}
              </span>
              {stat?.unit && (
                <span className="text-sm text-muted-foreground">
                  {stat?.unit}
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-1">
              {stat?.label}
            </p>
            
            {stat?.change && (
              <div className={`flex items-center text-xs ${
                stat?.change > 0 ? 'text-success' : stat?.change < 0 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {stat?.change > 0 && <Icon name="TrendingUp" size={12} className="mr-1" />}
                {stat?.change < 0 && <Icon name="TrendingDown" size={12} className="mr-1" />}
                <span>
                  {stat?.change > 0 ? '+' : ''}{stat?.change}%
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsGrid;