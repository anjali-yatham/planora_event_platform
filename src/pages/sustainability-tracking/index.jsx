import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const SustainabilityTracking = () => {
  const navigate = useNavigate();

  const sustainabilityData = {
    paperSaved: 2450,
    carbonReduced: 1.2,
    digitalTickets: 850,
    virtualAttendees: 320,
    totalEvents: 12
  };

  const impactData = [
    { name: 'Paper Saved', value: 2450, unit: 'sheets', color: '#10b981' },
    { name: 'CO2 Reduced', value: 1.2, unit: 'tons', color: '#3b82f6' },
    { name: 'Digital Tickets', value: 850, unit: 'tickets', color: '#8b5cf6' },
    { name: 'Virtual Attendees', value: 320, unit: 'people', color: '#f59e0b' }
  ];

  const monthlyImpact = [
    { month: 'Aug', paper: 180, carbon: 0.08, digital: 65 },
    { month: 'Sep', paper: 220, carbon: 0.12, digital: 85 },
    { month: 'Oct', paper: 290, carbon: 0.15, digital: 110 },
    { month: 'Nov', paper: 340, carbon: 0.18, digital: 140 },
    { month: 'Dec', paper: 450, carbon: 0.22, digital: 180 },
    { month: 'Jan', paper: 520, carbon: 0.28, digital: 210 }
  ];

  const badges = [
    {
      id: 1,
      name: 'Eco Warrior',
      description: 'Saved 1000+ sheets of paper',
      icon: 'Leaf',
      earned: true,
      color: 'green'
    },
    {
      id: 2,
      name: 'Digital Pioneer',
      description: 'Issued 500+ digital tickets',
      icon: 'Smartphone',
      earned: true,
      color: 'blue'
    },
    {
      id: 3,
      name: 'Carbon Reducer',
      description: 'Reduced 1 ton of CO2',
      icon: 'Cloud',
      earned: true,
      color: 'purple'
    },
    {
      id: 4,
      name: 'Sustainability Master',
      description: 'Complete 10 sustainable events',
      icon: 'Award',
      earned: false,
      color: 'yellow'
    }
  ];

  const ImpactCard = ({ title, value, unit, icon, color, description }) => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-${color}-100 flex items-center justify-center`}>
          <Icon name={icon} size={24} className={`text-${color}-600`} />
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-card-foreground">
            {value.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">{unit}</p>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-card-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-100">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Sustainability Impact</h1>
                <p className="text-muted-foreground">
                  Track your environmental impact and earn sustainability badges
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

          {/* Impact Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <ImpactCard
              title="Paper Saved"
              value={sustainabilityData.paperSaved}
              unit="sheets"
              icon="FileText"
              color="green"
              description="Through digital registration"
            />
            <ImpactCard
              title="CO₂ Reduced"
              value={sustainabilityData.carbonReduced}
              unit="tons"
              icon="Cloud"
              color="blue"
              description="Virtual and hybrid events"
            />
            <ImpactCard
              title="Digital Tickets"
              value={sustainabilityData.digitalTickets}
              unit="issued"
              icon="Smartphone"
              color="purple"
              description="Paperless ticketing system"
            />
            <ImpactCard
              title="Virtual Participants"
              value={sustainabilityData.virtualAttendees}
              unit="people"
              icon="Users"
              color="orange"
              description="Remote event attendance"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Impact Breakdown */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-card-foreground">Impact Breakdown</h2>
                <Button variant="outline" size="sm" iconName="Download">
                  Export Report
                </Button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={impactData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-card-foreground">Monthly Progress</h2>
                <select className="px-3 py-1 text-sm border border-border rounded">
                  <option>Paper Saved</option>
                  <option>Carbon Reduced</option>
                  <option>Digital Tickets</option>
                </select>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="paper" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Sustainability Badges */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-card-foreground">Sustainability Badges</h2>
              <div className="text-sm text-muted-foreground">
                {badges.filter(b => b.earned).length} of {badges.length} earned
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`relative p-4 rounded-lg border ${
                    badge.earned
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg ${
                      badge.earned
                        ? `bg-${badge.color}-100`
                        : 'bg-gray-100'
                    } flex items-center justify-center`}>
                      <Icon
                        name={badge.icon}
                        size={20}
                        className={badge.earned ? `text-${badge.color}-600` : 'text-gray-400'}
                      />
                    </div>
                    {badge.earned && (
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Icon name="Check" size={12} color="white" />
                      </div>
                    )}
                  </div>
                  <h3 className={`font-medium ${badge.earned ? 'text-card-foreground' : 'text-gray-400'}`}>
                    {badge.name}
                  </h3>
                  <p className={`text-sm ${badge.earned ? 'text-muted-foreground' : 'text-gray-400'}`}>
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sustainability Tips */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <Icon name="Lightbulb" size={24} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-card-foreground">Sustainability Tips</h2>
                <p className="text-muted-foreground">Ways to make your events more eco-friendly</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Go Paperless',
                  description: 'Use digital tickets, programs, and registration forms',
                  icon: 'FileText'
                },
                {
                  title: 'Hybrid Events',
                  description: 'Allow virtual participation to reduce travel emissions',
                  icon: 'Globe'
                },
                {
                  title: 'Local Sourcing',
                  description: 'Use local vendors and suppliers to reduce transportation',
                  icon: 'MapPin'
                },
                {
                  title: 'Waste Reduction',
                  description: 'Provide recycling stations and minimize single-use items',
                  icon: 'Trash2'
                }
              ].map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Icon name={tip.icon} size={16} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SustainabilityTracking;