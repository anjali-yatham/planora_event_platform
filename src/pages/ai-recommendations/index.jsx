import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AIRecommendations = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const recommendations = [
    {
      id: 1,
      category: 'timing',
      title: 'Optimize Event Timing',
      description: 'Based on your audience data, Tuesday 2-4 PM shows 34% higher engagement',
      priority: 'high',
      impact: 'High',
      effort: 'Low',
      icon: 'Clock',
      color: 'blue',
      details: [
        'Peak attendance hours: 2:00 PM - 4:00 PM',
        'Best days: Tuesday, Wednesday, Thursday',
        'Avoid: Monday mornings and Friday afternoons'
      ]
    },
    {
      id: 2,
      category: 'venue',
      title: 'Venue Capacity Optimization',
      description: 'Consider booking smaller venues - your average attendance is 70% of capacity',
      priority: 'medium',
      impact: 'Medium',
      effort: 'Medium',
      icon: 'MapPin',
      color: 'green',
      details: [
        'Average fill rate: 70%',
        'Recommended capacity: 80-90 people for better engagement',
        'Consider hybrid options for larger events'
      ]
    },
    {
      id: 3,
      category: 'marketing',
      title: 'Email Campaign Timing',
      description: 'Send registration reminders 3 days before - this increases attendance by 22%',
      priority: 'high',
      impact: 'High',
      effort: 'Low',
      icon: 'Mail',
      color: 'purple',
      details: [
        'Optimal reminder schedule: 1 week, 3 days, 1 day before',
        'Best sending time: 10 AM on weekdays',
        'Include event highlights and speaker info'
      ]
    },
    {
      id: 4,
      category: 'content',
      title: 'Interactive Elements',
      description: 'Add Q&A sessions and polls - events with interaction see 45% better feedback',
      priority: 'medium',
      impact: 'High',
      effort: 'Medium',
      icon: 'MessageCircle',
      color: 'orange',
      details: [
        'Include 15-20 min Q&A sessions',
        'Use live polls during presentations',
        'Encourage networking breaks'
      ]
    },
    {
      id: 5,
      category: 'pricing',
      title: 'Dynamic Pricing Strategy',
      description: 'Implement early bird pricing - can increase registrations by 28%',
      priority: 'low',
      impact: 'Medium',
      effort: 'Low',
      icon: 'DollarSign',
      color: 'indigo',
      details: [
        'Early bird: 25-30% discount for first 2 weeks',
        'Regular pricing: 4 weeks before event',
        'Last-minute deals: 48 hours before event'
      ]
    },
    {
      id: 6,
      category: 'engagement',
      title: 'Post-Event Follow-up',
      description: 'Send follow-up emails within 24 hours - improves repeat attendance by 40%',
      priority: 'high',
      impact: 'High',
      effort: 'Low',
      icon: 'Users',
      color: 'pink',
      details: [
        'Send thank you email within 24 hours',
        'Include event recap and key takeaways',
        'Announce upcoming events'
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Recommendations', count: recommendations.length },
    { id: 'timing', label: 'Timing & Scheduling', count: recommendations.filter(r => r.category === 'timing').length },
    { id: 'venue', label: 'Venue & Logistics', count: recommendations.filter(r => r.category === 'venue').length },
    { id: 'marketing', label: 'Marketing & Promotion', count: recommendations.filter(r => r.category === 'marketing').length },
    { id: 'content', label: 'Content & Engagement', count: recommendations.filter(r => r.category === 'content' || r.category === 'engagement').length },
    { id: 'pricing', label: 'Pricing Strategy', count: recommendations.filter(r => r.category === 'pricing').length }
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => {
        if (selectedCategory === 'content') return r.category === 'content' || r.category === 'engagement';
        return r.category === selectedCategory;
      });

  const getPriorityBadge = (priority) => {
    const config = {
      high: { color: 'bg-red-100 text-red-700 border-red-200', label: 'High Priority' },
      medium: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Medium Priority' },
      low: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Low Priority' }
    };
    return config[priority];
  };

  const [implementedIds, setImplementedIds] = useState([]);

  const handleImplement = (id) => {
    setImplementedIds([...implementedIds, id]);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">AI Recommendations</h1>
                <p className="text-muted-foreground">
                  Intelligent suggestions to improve your event management
                </p>
              </div>
              <Button
                variant="outline"
                iconName="ArrowLeft"
                onClick={() => navigate('/host-dashboard')}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>

          {/* AI Insights Header */}
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-200/20 p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">AI-Powered Insights</h2>
                <p className="text-muted-foreground">
                  Based on analysis of your 12 events and 1,250 attendees
                </p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-700">
                  Updated 2 hours ago
                </span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg border transition-smooth ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-card-foreground border-border hover:bg-muted'
                  }`}
                >
                  {category.label}
                  <span className="ml-2 text-xs opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredRecommendations.map((recommendation) => {
              const priorityBadge = getPriorityBadge(recommendation.priority);
              const isImplemented = implementedIds.includes(recommendation.id);
              
              return (
                <div
                  key={recommendation.id}
                  className={`bg-card rounded-lg border border-border p-6 transition-smooth ${
                    isImplemented ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg bg-${recommendation.color}-100 flex items-center justify-center`}>
                        <Icon name={recommendation.icon} size={20} className={`text-${recommendation.color}-600`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-card-foreground">{recommendation.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${priorityBadge.color}`}>
                          {priorityBadge.label}
                        </span>
                      </div>
                    </div>
                    {isImplemented && (
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Icon name="Check" size={16} color="white" />
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {recommendation.description}
                  </p>

                  <div className="flex items-center space-x-4 mb-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Target" size={14} className="text-blue-500" />
                      <span className="text-muted-foreground">Impact: {recommendation.impact}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={14} className="text-orange-500" />
                      <span className="text-muted-foreground">Effort: {recommendation.effort}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-card-foreground mb-2">Key Details:</h4>
                    <ul className="space-y-1">
                      {recommendation.details.map((detail, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="ChevronRight" size={12} className="mt-1 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center space-x-3">
                    {!isImplemented ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleImplement(recommendation.id)}
                        >
                          Implement
                        </Button>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Icon name="Check" size={16} />
                        <span className="text-sm font-medium">Implemented</span>
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      <Icon name="X" size={16} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Performance Summary */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Implementation Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                  <Icon name="TrendingUp" size={24} className="text-green-600" />
                </div>
                <p className="text-2xl font-bold text-card-foreground">+23%</p>
                <p className="text-sm text-muted-foreground">Expected attendance increase</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <Icon name="DollarSign" size={24} className="text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-card-foreground">+15%</p>
                <p className="text-sm text-muted-foreground">Revenue optimization</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Star" size={24} className="text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-card-foreground">+18%</p>
                <p className="text-sm text-muted-foreground">Satisfaction improvement</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIRecommendations;