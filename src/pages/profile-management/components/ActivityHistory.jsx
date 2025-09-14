import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityHistory = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: 'Activity' },
    { value: 'events', label: 'Events', icon: 'Calendar' },
    { value: 'achievements', label: 'Achievements', icon: 'Award' },
    { value: 'connections', label: 'Connections', icon: 'Users' }
  ];

  const filteredActivities = activities?.filter(activity => {
    const matchesFilter = filter === 'all' || activity?.type === filter;
    const matchesSearch = activity?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         activity?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'events': return 'Calendar';
      case 'achievements': return 'Award';
      case 'connections': return 'Users';
      case 'profile': return 'User';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'events': return 'text-blue-600 bg-blue-100';
      case 'achievements': return 'text-yellow-600 bg-yellow-100';
      case 'connections': return 'text-green-600 bg-green-100';
      case 'profile': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Activity History</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Clock" size={16} className="mr-1" />
          <span>{filteredActivities?.length} activities</span>
        </div>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex-1 relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            placeholder="Search activities..."
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {filterOptions?.map((option) => (
            <button
              key={option?.value}
              onClick={() => setFilter(option?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                filter === option?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon name={option?.icon} size={16} />
              <span>{option?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Activity Timeline */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities?.map((activity) => (
          <div key={activity?.id} className="flex space-x-4 p-4 bg-muted/20 rounded-lg border border-border/50">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground truncate">{activity?.title}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {formatDate(activity?.date)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{activity?.description}</p>
              {activity?.metadata && (
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  {activity?.metadata?.participants && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{activity?.metadata?.participants} participants</span>
                    </div>
                  )}
                  {activity?.metadata?.duration && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{activity?.metadata?.duration}</span>
                    </div>
                  )}
                  {activity?.metadata?.points && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} />
                      <span>+{activity?.metadata?.points} points</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            {activity?.image && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={activity?.image}
                  alt={activity?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredActivities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-2">
            {searchTerm || filter !== 'all' ? 'No activities match your criteria' : 'No activities yet'}
          </p>
          <p className="text-sm text-muted-foreground">
            {searchTerm || filter !== 'all' ? 'Try adjusting your search or filter' : 'Start participating in events to see your activity history'}
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityHistory;