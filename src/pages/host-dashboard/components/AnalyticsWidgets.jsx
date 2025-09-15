import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AnalyticsWidgets = ({ analyticsData, onEventsClick, onAttendeesClick, mockEvents }) => {
  const [showEventsDropdown, setShowEventsDropdown] = useState(false);
  const { attendanceData, revenueData, demographicData, totalEvents, totalAttendees, totalRevenue, growthRate } = analyticsData;

  const COLORS = ['#7C3AED', '#6366F1', '#F59E0B', '#10B981', '#EF4444'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(value);
  };

  const StatCard = ({ title, value, change, icon, color = "primary", onClick, isClickable, showDropdown, dropdownContent }) => (
    <div className="relative">
      <div 
        className={`bg-card rounded-lg border border-border p-6 ${
          isClickable ? 'cursor-pointer hover:shadow-elevation-2 transition-smooth' : ''
        }`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-card-foreground mt-1">{value}</p>
            {change && (
              <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
                <Icon name={change >= 0 ? "TrendingUp" : "TrendingDown"} size={16} className="mr-1" />
                <span>{Math.abs(change)}% from last month</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center relative`}>
            <Icon name={icon} size={24} color={`var(--color-${color})`} />
            {isClickable && (
              <div className="absolute -top-1 -right-1">
                <Icon name="ArrowUpRight" size={14} className="text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg border border-border shadow-elevation-3 z-10 max-h-64 overflow-y-auto">
          {dropdownContent}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value={totalEvents}
          change={12}
          icon="Calendar"
          color="primary"
          isClickable={true}
          onClick={() => setShowEventsDropdown(!showEventsDropdown)}
          showDropdown={showEventsDropdown}
          dropdownContent={
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-card-foreground">All Events</h4>
                <button 
                  onClick={() => setShowEventsDropdown(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {mockEvents?.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
                    <div className="flex-1">
                      <h5 className="font-medium text-card-foreground text-sm">{event.title}</h5>
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
                        <span>{event.date} at {event.time}</span>
                        <span className={`px-2 py-1 rounded-full ${
                          event.status === 'published' ? 'bg-success/10 text-success' :
                          event.status === 'draft' ? 'bg-warning/10 text-warning' :
                          event.status === 'completed' ? 'bg-muted text-muted-foreground' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">{event.attendees}</p>
                      <p className="text-xs text-muted-foreground">attendees</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        <StatCard
          title="Total Attendees"
          value={totalAttendees?.toLocaleString()}
          change={8}
          icon="Users"
          color="secondary"
          isClickable={true}
          onClick={onAttendeesClick}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={15}
          icon="DollarSign"
          color="success"
        />
        <StatCard
          title="Growth Rate"
          value={`${growthRate}%`}
          change={growthRate}
          icon="TrendingUp"
          color="accent"
        />
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">Attendance Trends</h3>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="attendees" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Analysis */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">Revenue Analysis</h3>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [formatCurrency(value), 'Revenue']}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="var(--color-success)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Breakdown */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">Demographics</h3>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {demographicData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">AI Insights</h3>
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="Brain" size={16} color="var(--color-accent)" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="TrendingUp" size={16} color="var(--color-success)" className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success">Peak Performance</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your events perform 23% better on weekends. Consider scheduling more weekend events.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning">Optimization Opportunity</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Early bird pricing could increase your registration rate by 15-20%.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={16} color="var(--color-primary)" className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-primary">Recommendation</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tech workshops have 40% higher engagement. Consider adding more technical content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidgets;