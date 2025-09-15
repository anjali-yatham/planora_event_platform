import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Gamification = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('achievements');

  const userStats = {
    level: 12,
    currentXP: 1250,
    nextLevelXP: 1500,
    totalEvents: 23,
    totalAttendees: 1840,
    successRate: 92,
    streakDays: 15
  };

  const achievements = [
    {
      id: 1,
      title: 'First Event',
      description: 'Successfully hosted your first event',
      icon: 'Trophy',
      color: 'success',
      unlocked: true,
      unlockedDate: 'Jan 15, 2024',
      xpReward: 100
    },
    {
      id: 2,
      title: 'Event Master',
      description: 'Host 10 successful events',
      icon: 'Crown',
      color: 'warning',
      unlocked: true,
      unlockedDate: 'Dec 10, 2024',
      xpReward: 500
    },
    {
      id: 3,
      title: 'Crowd Pleaser',
      description: 'Achieve 95% satisfaction rating',
      icon: 'Heart',
      color: 'destructive',
      unlocked: true,
      unlockedDate: 'Dec 20, 2024',
      xpReward: 300
    },
    {
      id: 4,
      title: 'Social Butterfly',
      description: 'Get 1000+ attendees across all events',
      icon: 'Users',
      color: 'primary',
      unlocked: true,
      unlockedDate: 'Jan 5, 2025',
      xpReward: 750
    },
    {
      id: 5,
      title: 'Marketing Guru',
      description: 'Achieve 80% attendance rate',
      icon: 'Megaphone',
      color: 'accent',
      unlocked: false,
      progress: 72,
      target: 80,
      xpReward: 400
    },
    {
      id: 6,
      title: 'Tech Savvy',
      description: 'Host 5 virtual/hybrid events',
      icon: 'Monitor',
      color: 'secondary',
      unlocked: false,
      progress: 3,
      target: 5,
      xpReward: 350
    },
    {
      id: 7,
      title: 'Revenue King',
      description: 'Generate $50,000 in total revenue',
      icon: 'DollarSign',
      color: 'success',
      unlocked: false,
      progress: 38500,
      target: 50000,
      xpReward: 1000
    },
    {
      id: 8,
      title: 'Sustainability Champion',
      description: 'Reduce carbon footprint by 30%',
      icon: 'Leaf',
      color: 'success',
      unlocked: false,
      progress: 18,
      target: 30,
      xpReward: 600
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', level: 18, xp: 2850, events: 45, badge: 'Event Legend' },
    { rank: 2, name: 'Michael Chen', level: 16, xp: 2420, events: 38, badge: 'Master Host' },
    { rank: 3, name: 'Emily Rodriguez', level: 14, xp: 2100, events: 32, badge: 'Rising Star' },
    { rank: 4, name: 'You', level: 12, xp: 1250, events: 23, badge: 'Event Master', isUser: true },
    { rank: 5, name: 'David Thompson', level: 11, xp: 1180, events: 22, badge: 'Event Master' },
    { rank: 6, name: 'Lisa Wang', level: 10, xp: 980, events: 18, badge: 'Event Pro' },
    { rank: 7, name: 'James Wilson', level: 9, xp: 850, events: 15, badge: 'Event Pro' },
    { rank: 8, name: 'Maria Garcia', level: 8, xp: 720, events: 12, badge: 'Rising Host' }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Weekend Warrior',
      description: 'Host an event this weekend',
      difficulty: 'Easy',
      xpReward: 150,
      deadline: '2 days',
      icon: 'Calendar',
      color: 'success'
    },
    {
      id: 2,
      title: 'Social Media Boost',
      description: 'Share event on 3 social platforms',
      difficulty: 'Easy',
      xpReward: 100,
      deadline: '5 days',
      icon: 'Share2',
      color: 'primary'
    },
    {
      id: 3,
      title: 'Feedback Collection',
      description: 'Collect feedback from 20+ attendees',
      difficulty: 'Medium',
      xpReward: 250,
      deadline: '1 week',
      icon: 'MessageSquare',
      color: 'warning'
    },
    {
      id: 4,
      title: 'Sponsor Collaboration',
      description: 'Secure a sponsor for your next event',
      difficulty: 'Hard',
      xpReward: 500,
      deadline: '2 weeks',
      icon: 'Handshake',
      color: 'destructive'
    }
  ];

  const AchievementCard = ({ achievement }) => (
    <div className={`bg-card rounded-lg border border-border p-6 transition-smooth ${
      achievement.unlocked ? 'hover:shadow-elevation-2' : 'opacity-60'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${achievement.color}/10 flex items-center justify-center`}>
          <Icon name={achievement.icon} size={24} color={`var(--color-${achievement.color})`} />
        </div>
        <div className="text-right">
          {achievement.unlocked ? (
            <div className="flex items-center space-x-1">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" />
              <span className="text-xs text-success font-medium">Unlocked</span>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground">
              {achievement.progress && achievement.target ? 
                `${Math.round((achievement.progress / achievement.target) * 100)}% Complete` : 
                'Locked'
              }
            </div>
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-card-foreground mb-2">{achievement.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
      
      {!achievement.unlocked && achievement.progress && achievement.target && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs text-muted-foreground">
              {achievement.progress.toLocaleString()} / {achievement.target.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`bg-${achievement.color} h-2 rounded-full transition-smooth`}
              style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Icon name="Star" size={14} className="text-warning" />
          <span className="text-sm font-medium text-warning">{achievement.xpReward} XP</span>
        </div>
        {achievement.unlocked && (
          <span className="text-xs text-muted-foreground">{achievement.unlockedDate}</span>
        )}
      </div>
    </div>
  );

  const ChallengeCard = ({ challenge }) => (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg bg-${challenge.color}/10 flex items-center justify-center`}>
          <Icon name={challenge.icon} size={20} color={`var(--color-${challenge.color})`} />
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 text-xs rounded-full ${
            challenge.difficulty === 'Easy' ? 'bg-success/10 text-success' :
            challenge.difficulty === 'Medium' ? 'bg-warning/10 text-warning' :
            'bg-destructive/10 text-destructive'
          }`}>
            {challenge.difficulty}
          </span>
        </div>
      </div>
      
      <h3 className="font-semibold text-card-foreground mb-2">{challenge.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning" />
            <span className="text-sm font-medium text-warning">{challenge.xpReward} XP</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{challenge.deadline}</span>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Start Challenge
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-violet-50">
      <Header userRole="host" isAuthenticated={true} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Trophy" size={32} color="var(--color-primary)" />
              <h1 className="text-3xl font-bold text-foreground">Gamification Center</h1>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Level up your event hosting journey! Earn XP, unlock achievements, complete challenges, 
              and compete with other hosts in our gamified experience.
            </p>
          </div>

          {/* User Stats */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{userStats.level}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-card-foreground">Level {userStats.level} Event Master</h2>
                    <p className="text-muted-foreground">Keep growing your event empire!</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">XP Progress</span>
                    <span className="font-medium">{userStats.currentXP} / {userStats.nextLevelXP} XP</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-smooth"
                      style={{ width: `${(userStats.currentXP / userStats.nextLevelXP) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {userStats.nextLevelXP - userStats.currentXP} XP to Level {userStats.level + 1}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.totalEvents}</p>
                  <p className="text-sm text-muted-foreground">Events Hosted</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{userStats.totalAttendees.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Attendees</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{userStats.successRate}%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{userStats.streakDays}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {[
                  { id: 'achievements', label: 'Achievements', icon: 'Award' },
                  { id: 'challenges', label: 'Challenges', icon: 'Target' },
                  { id: 'leaderboard', label: 'Leaderboard', icon: 'BarChart3' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-2">Active Challenges</h2>
                <p className="text-muted-foreground">Complete challenges to earn bonus XP and unlock special rewards</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {challenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leaderboard' && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-card-foreground mb-2">Global Leaderboard</h2>
                <p className="text-muted-foreground">See how you rank against other event hosts worldwide</p>
              </div>
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                {leaderboard.map((user) => (
                  <div key={user.rank} className={`flex items-center justify-between p-6 border-b border-border last:border-b-0 ${
                    user.isUser ? 'bg-primary/5 ring-2 ring-primary/20' : 'hover:bg-muted/50'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                        user.rank === 2 ? 'bg-gray-100 text-gray-700' :
                        user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {user.rank}
                      </div>
                      <div>
                        <p className="font-semibold text-card-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.badge}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="font-semibold text-card-foreground">Level {user.level}</p>
                          <p className="text-xs text-muted-foreground">{user.xp.toLocaleString()} XP</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-card-foreground">{user.events}</p>
                          <p className="text-xs text-muted-foreground">Events</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Gamification;