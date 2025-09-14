import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AchievementsDisplay = ({ achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const categories = [
    { value: 'all', label: 'All', icon: 'Award' },
    { value: 'badges', label: 'Badges', icon: 'Shield' },
    { value: 'certificates', label: 'Certificates', icon: 'FileText' },
    { value: 'recognition', label: 'Recognition', icon: 'Star' }
  ];

  const filteredAchievements = achievements?.filter(achievement => 
    selectedCategory === 'all' || achievement?.category === selectedCategory
  );

  const getAchievementRarity = (rarity) => {
    switch (rarity) {
      case 'common': return { color: 'text-gray-600 bg-gray-100', label: 'Common' };
      case 'rare': return { color: 'text-blue-600 bg-blue-100', label: 'Rare' };
      case 'epic': return { color: 'text-purple-600 bg-purple-100', label: 'Epic' };
      case 'legendary': return { color: 'text-yellow-600 bg-yellow-100', label: 'Legendary' };
      default: return { color: 'text-gray-600 bg-gray-100', label: 'Common' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Trophy" size={16} className="mr-1" />
            <span>{filteredAchievements?.length} earned</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {categories?.map((category) => (
            <button
              key={category?.value}
              onClick={() => setSelectedCategory(category?.value)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-smooth ${
                selectedCategory === category?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAchievements?.map((achievement) => {
            const rarity = getAchievementRarity(achievement?.rarity);
            return (
              <div
                key={achievement?.id}
                onClick={() => setSelectedAchievement(achievement)}
                className="bg-muted/20 rounded-lg p-4 border border-border/50 cursor-pointer hover:bg-muted/40 transition-smooth group"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {achievement?.icon ? (
                      <Icon name={achievement?.icon} size={24} className="text-primary" />
                    ) : (
                      <Image
                        src={achievement?.image}
                        alt={achievement?.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                    {achievement?.name}
                  </h3>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${rarity?.color} mb-2`}>
                    <Icon name="Star" size={10} className="mr-1" />
                    <span>{rarity?.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(achievement?.earnedDate)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAchievements?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground mb-2">No achievements in this category</p>
            <p className="text-sm text-muted-foreground">
              Keep participating in events to earn more achievements
            </p>
          </div>
        )}

        {/* Achievement Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {achievements?.filter(a => a?.category === 'badges')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Badges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {achievements?.filter(a => a?.category === 'certificates')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Certificates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {achievements?.reduce((sum, a) => sum + (a?.points || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {achievements?.filter(a => a?.rarity === 'legendary' || a?.rarity === 'epic')?.length}
              </div>
              <div className="text-sm text-muted-foreground">Rare Items</div>
            </div>
          </div>
        </div>
      </div>
      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Achievement Details</h3>
              <button
                onClick={() => setSelectedAchievement(null)}
                className="text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                {selectedAchievement?.icon ? (
                  <Icon name={selectedAchievement?.icon} size={32} className="text-primary" />
                ) : (
                  <Image
                    src={selectedAchievement?.image}
                    alt={selectedAchievement?.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
              </div>
              <h4 className="text-xl font-bold text-foreground mb-2">{selectedAchievement?.name}</h4>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${getAchievementRarity(selectedAchievement?.rarity)?.color} mb-3`}>
                <Icon name="Star" size={12} className="mr-1" />
                <span>{getAchievementRarity(selectedAchievement?.rarity)?.label}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-foreground mb-2">Description</h5>
                <p className="text-muted-foreground text-sm">{selectedAchievement?.description}</p>
              </div>
              
              <div>
                <h5 className="font-medium text-foreground mb-2">Earning Criteria</h5>
                <p className="text-muted-foreground text-sm">{selectedAchievement?.criteria}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <h6 className="font-medium text-foreground text-sm">Earned Date</h6>
                  <p className="text-muted-foreground text-sm">{formatDate(selectedAchievement?.earnedDate)}</p>
                </div>
                <div>
                  <h6 className="font-medium text-foreground text-sm">Points Awarded</h6>
                  <p className="text-muted-foreground text-sm">{selectedAchievement?.points || 0} points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AchievementsDisplay;