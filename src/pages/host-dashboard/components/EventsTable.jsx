import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EventsTable = ({ events, onEditEvent, onViewAnalytics, onManageAttendees }) => {
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-success/10 text-success border-success/20';
      case 'draft':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'completed':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const sortedEvents = [...events]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];

    if (sortBy === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Your Events</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Event</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('attendees')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Attendees</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('revenue')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Revenue</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedEvents?.map((event) => (
              <tr key={event?.id} className="border-t border-border hover:bg-muted/20 transition-smooth">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Calendar" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h4 className="font-medium text-card-foreground">{event?.title}</h4>
                      <p className="text-sm text-muted-foreground">{event?.type}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-card-foreground">{formatDate(event?.date)}</div>
                    <div className="text-muted-foreground">{event?.time}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(event?.status)}`}>
                    {event?.status?.charAt(0)?.toUpperCase() + event?.status?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-card-foreground">{event?.attendees}/{event?.capacity}</div>
                    <div className="text-muted-foreground">
                      {Math.round((event?.attendees / event?.capacity) * 100)}% filled
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-card-foreground">{formatCurrency(event?.revenue)}</div>
                    <div className="text-muted-foreground">{event?.ticketsSold} tickets sold</div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onEditEvent(event?.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="BarChart3"
                      onClick={() => onViewAnalytics(event?.id)}
                    >
                      Analytics
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Users"
                      onClick={() => onManageAttendees(event?.id)}
                    >
                      Attendees
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {sortedEvents?.map((event) => (
          <div key={event?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Calendar" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">{event?.title}</h4>
                  <p className="text-sm text-muted-foreground">{event?.type}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(event?.status)}`}>
                {event?.status?.charAt(0)?.toUpperCase() + event?.status?.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p className="text-sm font-medium text-card-foreground">{formatDate(event?.date)}</p>
                <p className="text-xs text-muted-foreground">{event?.time}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Attendees</p>
                <p className="text-sm font-medium text-card-foreground">{event?.attendees}/{event?.capacity}</p>
                <p className="text-xs text-muted-foreground">{Math.round((event?.attendees / event?.capacity) * 100)}% filled</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-sm font-medium text-card-foreground">{formatCurrency(event?.revenue)}</p>
                <p className="text-xs text-muted-foreground">{event?.ticketsSold} tickets sold</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={() => onEditEvent(event?.id)}
                className="flex-1"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="BarChart3"
                onClick={() => onViewAnalytics(event?.id)}
                className="flex-1"
              >
                Analytics
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Users"
                onClick={() => onManageAttendees(event?.id)}
                className="flex-1"
              >
                Attendees
              </Button>
            </div>
          </div>
        ))}
      </div>
      {events?.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-card-foreground mb-2">No events yet</h3>
          <p className="text-muted-foreground mb-4">Create your first event to get started with event management.</p>
          <Button variant="default" iconName="Plus">
            Create Event
          </Button>
        </div>
      )}
    </div>
  );
};

export default EventsTable;