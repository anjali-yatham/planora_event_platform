import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = ({ insights, onRefresh, onViewAll, onTakeAction }) => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'recommendation':
        return 'Lightbulb';
      case 'achievement':
        return 'Trophy';
      case 'trend':
        return 'TrendingUp';
      case 'reminder':
        return 'Bell';
      default:
        return 'Info';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'recommendation':
        return 'text-primary bg-primary/10';
      case 'achievement':
        return 'text-success bg-success/10';
      case 'trend':
        return 'text-accent bg-accent/10';
      case 'reminder':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Brain" size={16} className="text-primary" />
            </div>
            <h3 className="font-semibold text-card-foreground">AI Insights</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={onRefresh}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={onViewAll}
            >
              View All
            </Button>
          </div>
        </div>
      </div>
      <div className="p-4">
        {insights?.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Brain" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No insights available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights?.map((insight) => (
              <div key={insight?.id} className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg ${getInsightColor(insight?.type)} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={getInsightIcon(insight?.type)} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-card-foreground text-sm mb-1">
                    {insight?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {insight?.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(insight?.timestamp)}
                    </span>
                    {insight?.actionable && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs h-6 px-2"
                        onClick={() => onTakeAction?.(insight)}
                      >
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;