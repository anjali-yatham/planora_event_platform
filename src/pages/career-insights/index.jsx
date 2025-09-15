import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const CareerInsights = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const COLORS = ['#7C3AED', '#6366F1', '#F59E0B', '#10B981', '#EF4444'];

  const careerPredictions = [
    {
      trend: 'Tech Event Specialist',
      confidence: 92,
      description: 'Based on your successful tech-focused events, you\'re trending to become a specialized tech event organizer.',
      growth: '+15%',
      icon: 'Code',
      color: 'primary'
    },
    {
      trend: 'Corporate Event Manager',
      confidence: 78,
      description: 'Your professional networking events show potential for corporate event management roles.',
      growth: '+8%',
      icon: 'Building',
      color: 'secondary'
    },
    {
      trend: 'Conference Producer',
      confidence: 85,
      description: 'Large-scale event management skills indicate strong conference production capabilities.',
      growth: '+12%',
      icon: 'Users',
      color: 'success'
    }
  ];

  const skillsAnalysis = [
    { skill: 'Event Planning', current: 85, market: 78, demand: 'High' },
    { skill: 'Digital Marketing', current: 72, market: 65, demand: 'Very High' },
    { skill: 'Vendor Management', current: 88, market: 70, demand: 'Medium' },
    { skill: 'Budget Management', current: 75, market: 72, demand: 'High' },
    { skill: 'Technology Integration', current: 69, market: 58, demand: 'Very High' },
    { skill: 'Crisis Management', current: 80, market: 66, demand: 'Medium' }
  ];

  const marketTrends = [
    { month: 'Jul', techEvents: 45, corporateEvents: 62, virtualEvents: 38 },
    { month: 'Aug', techEvents: 52, corporateEvents: 58, virtualEvents: 45 },
    { month: 'Sep', techEvents: 48, corporateEvents: 65, virtualEvents: 52 },
    { month: 'Oct', techEvents: 65, corporateEvents: 70, virtualEvents: 58 },
    { month: 'Nov', techEvents: 72, corporateEvents: 68, virtualEvents: 62 },
    { month: 'Dec', techEvents: 78, corporateEvents: 75, virtualEvents: 68 }
  ];

  const industryDemand = [
    { name: 'Technology', value: 35, growth: '+18%' },
    { name: 'Healthcare', value: 22, growth: '+12%' },
    { name: 'Finance', value: 18, growth: '+8%' },
    { name: 'Education', value: 15, growth: '+15%' },
    { name: 'Entertainment', value: 10, growth: '+5%' }
  ];

  const salaryInsights = {
    currentEstimate: 68000,
    marketAverage: 65000,
    topPercentile: 95000,
    projectedGrowth: 12,
    regions: [
      { city: 'San Francisco', salary: 95000, demand: 'Very High' },
      { city: 'New York', salary: 85000, demand: 'High' },
      { city: 'Los Angeles', salary: 78000, demand: 'High' },
      { city: 'Chicago', salary: 72000, demand: 'Medium' },
      { city: 'Austin', salary: 70000, demand: 'High' }
    ]
  };

  const recommendations = [
    {
      type: 'Skill Development',
      title: 'Master AI-Powered Event Analytics',
      description: 'The market is moving towards data-driven event planning. Learning AI analytics tools could increase your market value by 25%.',
      priority: 'High',
      timeframe: '3-6 months',
      icon: 'Brain',
      color: 'primary'
    },
    {
      type: 'Certification',
      title: 'Get Certified in Sustainable Event Management',
      description: 'Sustainability is becoming crucial. This certification is in demand and could lead to premium opportunities.',
      priority: 'Medium',
      timeframe: '2-4 months',
      icon: 'Leaf',
      color: 'success'
    },
    {
      type: 'Networking',
      title: 'Join Tech Event Professionals Network',
      description: 'Connect with industry leaders in your specialized field. 78% of job opportunities come through networking.',
      priority: 'High',
      timeframe: '1-2 months',
      icon: 'Users',
      color: 'accent'
    },
    {
      type: 'Portfolio',
      title: 'Showcase Virtual Event Expertise',
      description: 'Create case studies of your virtual events. This is a rapidly growing segment with 45% year-over-year growth.',
      priority: 'Medium',
      timeframe: '1-3 months',
      icon: 'Monitor',
      color: 'secondary'
    }
  ];

  const PredictionCard = ({ prediction }) => (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${prediction.color}/10 flex items-center justify-center`}>
          <Icon name={prediction.icon} size={24} color={`var(--color-${prediction.color})`} />
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-success">{prediction.growth}</span>
          <p className="text-xs text-muted-foreground">Growth Potential</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{prediction.trend}</h3>
      <p className="text-sm text-muted-foreground mb-4">{prediction.description}</p>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-muted rounded-full h-2">
          <div 
            className={`bg-${prediction.color} h-2 rounded-full transition-smooth`}
            style={{ width: `${prediction.confidence}%` }}
          />
        </div>
        <span className="text-sm font-medium text-card-foreground">{prediction.confidence}%</span>
      </div>
    </div>
  );

  const RecommendationCard = ({ recommendation }) => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg bg-${recommendation.color}/10 flex items-center justify-center`}>
          <Icon name={recommendation.icon} size={20} color={`var(--color-${recommendation.color})`} />
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            recommendation.priority === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-warning/10 text-warning'
          }`}>
            {recommendation.priority} Priority
          </span>
        </div>
      </div>
      <div className="mb-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{recommendation.type}</span>
        <h3 className="text-lg font-semibold text-card-foreground">{recommendation.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{recommendation.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{recommendation.timeframe}</span>
        </div>
        <Button variant="outline" size="sm">
          Learn More
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cyan-50">
      <Header userRole="host" isAuthenticated={true} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="TrendingUp" size={32} color="var(--color-primary)" />
              <h1 className="text-3xl font-bold text-foreground">AI Career Insights</h1>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                AI-Powered
              </span>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Get personalized career predictions and recommendations based on your event hosting performance, 
              market trends, and industry data analysis powered by artificial intelligence.
            </p>
          </div>

          {/* Career Predictions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Your Career Trajectory Predictions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {careerPredictions.map((prediction, index) => (
                <PredictionCard key={index} prediction={prediction} />
              ))}
            </div>
          </div>

          {/* Market Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Market Demand Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={marketTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="techEvents" stroke="#7C3AED" strokeWidth={2} />
                    <Line type="monotone" dataKey="corporateEvents" stroke="#6366F1" strokeWidth={2} />
                    <Line type="monotone" dataKey="virtualEvents" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Tech Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Corporate Events</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Virtual Events</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Industry Demand Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={industryDemand}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {industryDemand.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {industryDemand.map((industry, index) => (
                  <div key={industry.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                      <span className="text-xs text-muted-foreground">{industry.name}</span>
                    </div>
                    <span className="text-xs font-medium text-success">{industry.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Skills Competitive Analysis</h2>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="space-y-6">
                {skillsAnalysis.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-card-foreground">{skill.skill}</span>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          skill.demand === 'Very High' ? 'bg-destructive/10 text-destructive' :
                          skill.demand === 'High' ? 'bg-warning/10 text-warning' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {skill.demand} Demand
                        </span>
                        <span className="text-sm text-muted-foreground">
                          You: {skill.current}% | Market: {skill.market}%
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-smooth"
                          style={{ width: `${skill.current}%` }}
                        />
                      </div>
                      <div 
                        className="absolute top-0 w-1 bg-secondary h-2"
                        style={{ left: `${skill.market}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Salary Insights */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Salary Insights & Market Positioning</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-card-foreground mb-4">Regional Salary Comparison</h3>
                <div className="space-y-4">
                  {salaryInsights.regions.map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-card-foreground">{region.city}</span>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          region.demand === 'Very High' ? 'bg-destructive/10 text-destructive' :
                          region.demand === 'High' ? 'bg-warning/10 text-warning' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {region.demand}
                        </span>
                      </div>
                      <span className="font-semibold text-success">${region.salary.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="font-semibold text-card-foreground mb-4">Your Salary Position</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Current Estimate</span>
                      <span className="font-bold text-primary">${salaryInsights.currentEstimate.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Market Average</span>
                      <span className="font-medium">${salaryInsights.marketAverage.toLocaleString()}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Top 10%</span>
                      <span className="font-medium text-success">${salaryInsights.topPercentile.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">+{salaryInsights.projectedGrowth}%</p>
                      <p className="text-xs text-muted-foreground">Projected Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Personalized Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((recommendation, index) => (
                <RecommendationCard key={index} recommendation={recommendation} />
              ))}
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Next Steps for Career Growth</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Target" size={24} color="var(--color-primary)" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Set Clear Goals</h3>
                <p className="text-sm text-muted-foreground">Define specific career objectives based on these insights</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="BookOpen" size={24} color="var(--color-success)" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Develop Skills</h3>
                <p className="text-sm text-muted-foreground">Focus on high-demand skills identified in the analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Users" size={24} color="var(--color-accent)" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Network Actively</h3>
                <p className="text-sm text-muted-foreground">Connect with professionals in your predicted specialty areas</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerInsights;