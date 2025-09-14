import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevenueTracking = ({ revenueData }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [viewType, setViewType] = useState('overview');

  const { totalRevenue, monthlyRevenue, ticketSales, paymentStatus, revenueByEvent } = revenueData;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const RevenueCard = ({ title, amount, change, icon, color = "primary" }) => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground mt-1">{formatCurrency(amount)}</p>
          {change && (
            <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-success' : 'text-destructive'}`}>
              <Icon name={change >= 0 ? "TrendingUp" : "TrendingDown"} size={16} className="mr-1" />
              <span>{Math.abs(change)}% from last period</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg bg-${color}/10 flex items-center justify-center`}>
          <Icon name={icon} size={24} color={`var(--color-${color})`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Revenue Tracking</h2>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
            {['7d', '30d', '90d', '1y']?.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
        </div>
      </div>
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <RevenueCard
          title="Total Revenue"
          amount={totalRevenue}
          change={12}
          icon="DollarSign"
          color="success"
        />
        <RevenueCard
          title="This Month"
          amount={monthlyRevenue?.current}
          change={8}
          icon="TrendingUp"
          color="primary"
        />
        <RevenueCard
          title="Tickets Sold"
          amount={ticketSales?.total}
          change={15}
          icon="Ticket"
          color="secondary"
        />
        <RevenueCard
          title="Average per Event"
          amount={totalRevenue / revenueByEvent?.length}
          change={-3}
          icon="BarChart3"
          color="accent"
        />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewType === 'overview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('overview')}
              >
                Overview
              </Button>
              <Button
                variant={viewType === 'detailed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewType('detailed')}
              >
                Detailed
              </Button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue?.data}>
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
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Event */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">Revenue by Event</h3>
            <Button variant="outline" size="sm" iconName="MoreHorizontal">
              More
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByEvent?.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
                  fill="var(--color-primary)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Payment Status & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Status */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Payment Status</h3>
          <div className="space-y-4">
            {paymentStatus?.map((status) => (
              <div key={status?.status} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status?.status)}`}>
                    {status?.status?.charAt(0)?.toUpperCase() + status?.status?.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">{status?.count} transactions</span>
                </div>
                <span className="font-semibold text-card-foreground">{formatCurrency(status?.amount)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Transactions</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {ticketSales?.recent?.map((transaction) => (
              <div key={transaction?.id} className="flex items-center justify-between p-3 hover:bg-muted/20 rounded-lg transition-smooth">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="CreditCard" size={16} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{transaction?.event}</p>
                    <p className="text-xs text-muted-foreground">{transaction?.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-card-foreground">{formatCurrency(transaction?.amount)}</p>
                  <p className="text-xs text-muted-foreground">{transaction?.tickets} tickets</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTracking;