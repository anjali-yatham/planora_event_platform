import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressCard = ({ title, value, total, icon, color = "primary", description, actionLabel, onAction }) => {
  const percentage = total > 0 ? Math.round((value / total) * 100) : 0;

  const getColorClasses = (colorName) => {
    const colors = {
      primary: 'text-primary bg-primary/10',
      success: 'text-success bg-success/10',
      accent: 'text-accent bg-accent/10',
      secondary: 'text-secondary bg-secondary/10'
    };
    return colors?.[colorName] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${getColorClasses(color)} flex items-center justify-center`}>
          <Icon name={icon} size={24} />
        </div>
        {onAction && actionLabel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}
      </div>

      <div className="mb-3">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">{title}</h3>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-card-foreground">{value}</span>
          {total && (
            <span className="text-sm text-muted-foreground">/ {total}</span>
          )}
        </div>
      </div>

      {total && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                color === 'success' ? 'bg-success' :
                color === 'accent' ? 'bg-accent' :
                color === 'secondary'? 'bg-secondary' : 'bg-primary'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default ProgressCard;