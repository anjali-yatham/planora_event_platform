import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CampaignManagement = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "React Workshop Promo",
      status: "active",
      type: "Email Campaign",
      reach: 2500,
      engagement: 18.5,
      progress: 75,
      startDate: "2025-01-10",
      endDate: "2025-01-20"
    },
    {
      id: 2,
      name: "AI Conference Launch",
      status: "completed",
      type: "Social Media",
      reach: 15000,
      engagement: 12.3,
      progress: 100,
      startDate: "2024-12-15",
      endDate: "2025-01-05"
    },
    {
      id: 3,
      name: "Networking Event Push",
      status: "draft",
      type: "Multi-channel",
      reach: 0,
      engagement: 0,
      progress: 25,
      startDate: "2025-01-25",
      endDate: "2025-02-05"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'completed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'draft':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Campaign Management</h1>
              <p className="text-muted-foreground">Create, schedule, and monitor promotional campaigns for your events</p>
            </div>
            <Button
              variant="default"
              size="lg"
              iconName="Plus"
              iconPosition="left"
              onClick={() => console.log('Create new campaign')}
            >
              Create Campaign
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">
                    {campaigns.filter(c => c.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon name="Play" size={24} color="var(--color-success)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">17.5K</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" size={24} color="var(--color-primary)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Engagement</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">15.3%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">
                    {campaigns.filter(c => c.status === 'completed').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} color="var(--color-warning)" />
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-card-foreground">Your Campaigns</h3>
                <div className="flex items-center space-x-3">
                  <Input
                    type="search"
                    placeholder="Search campaigns..."
                    className="w-64"
                  />
                  <Button variant="outline" size="sm" iconName="Filter">
                    Filter
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Campaign</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Type</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Progress</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Reach</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Engagement</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-t border-border hover:bg-muted/20 transition-smooth">
                      <td className="p-4">
                        <div>
                          <h4 className="font-medium text-card-foreground">{campaign.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-card-foreground">{campaign.type}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{width: `${campaign.progress}%`}}
                            />
                          </div>
                          <span className="text-sm text-card-foreground">{campaign.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-card-foreground">
                          {campaign.reach.toLocaleString()}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-card-foreground">{campaign.engagement}%</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="sm" iconName="Edit" />
                          <Button variant="ghost" size="sm" iconName="Eye" />
                          <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="text-center">
                <Icon name="Mail" size={32} color="var(--color-primary)" className="mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Email Campaign</h3>
                <p className="text-sm text-muted-foreground mb-4">Create targeted email campaigns</p>
                <Button variant="outline" size="sm">Start Email Campaign</Button>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="text-center">
                <Icon name="Share2" size={32} color="var(--color-secondary)" className="mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">Social Media</h3>
                <p className="text-sm text-muted-foreground mb-4">Promote on social platforms</p>
                <Button variant="outline" size="sm">Create Social Campaign</Button>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="text-center">
                <Icon name="Smartphone" size={32} color="var(--color-accent)" className="mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">SMS Marketing</h3>
                <p className="text-sm text-muted-foreground mb-4">Direct SMS notifications</p>
                <Button variant="outline" size="sm">Setup SMS Campaign</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignManagement;