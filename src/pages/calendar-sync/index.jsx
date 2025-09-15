import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CalendarSync = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  const handleGoogleConnect = () => {
    // Mock Google Calendar connection
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
  };

  const availableDates = [
    { date: '2025-01-20', available: true },
    { date: '2025-01-25', available: true },
    { date: '2025-02-01', available: false },
    { date: '2025-02-10', available: true },
    { date: '2025-02-15', available: true },
    { date: '2025-02-20', available: false }
  ];

  return (
    <div className="min-h-screen bg-purple-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Calendar Sync</h1>
                <p className="text-muted-foreground">
                  Integrate with Google Calendar and manage your event scheduling
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Google Calendar Integration */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon name="Calendar" size={24} color="#1a73e8" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">Google Calendar</h2>
                  <p className="text-muted-foreground">Connect your Google Calendar</p>
                </div>
              </div>

              {!isConnected ? (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-card-foreground mb-2">
                    Connect Your Google Calendar
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Sync your events and manage availability seamlessly
                  </p>
                  <Button
                    variant="default"
                    size="lg"
                    iconName="ExternalLink"
                    iconPosition="left"
                    onClick={handleGoogleConnect}
                    className="bg-[#1a73e8] hover:bg-[#1557b0]"
                  >
                    Connect Google Calendar
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Icon name="Check" size={16} color="white" />
                      </div>
                      <div>
                        <p className="font-medium text-green-800">Calendar Connected</p>
                        <p className="text-sm text-green-600">john.doe@gmail.com</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                      Disconnect
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-medium text-card-foreground">Sync Options</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Auto-create calendar events for published events</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">Send calendar invites to attendees</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Block calendar during event hours</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Availability Management */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-card-foreground">Availability Calendar</h2>
                  <p className="text-muted-foreground">Mark your available event dates</p>
                </div>
                <Button variant="outline" size="sm" iconName="Calendar">
                  View Full Calendar
                </Button>
              </div>

              <div className="space-y-4">
                {availableDates.map((dateInfo, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${
                        dateInfo.available ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <span className="font-medium">{new Date(dateInfo.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={dateInfo.available ? 'text-green-600' : 'text-red-600'}
                    >
                      {dateInfo.available ? 'Available' : 'Busy'}
                    </Button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium text-card-foreground mb-2">Quick Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" iconName="Plus">
                    Add Available Date
                  </Button>
                  <Button variant="outline" size="sm" iconName="Clock">
                    Set Working Hours
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download">
                    Export Calendar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Synced Events */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Upcoming Synced Events</h2>
            <div className="space-y-4">
              {[
                {
                  title: "React Advanced Workshop",
                  date: "2025-01-15",
                  time: "10:00 AM",
                  synced: true
                },
                {
                  title: "AI in Business Conference",
                  date: "2025-01-22",
                  time: "9:00 AM",
                  synced: true
                },
                {
                  title: "Digital Marketing Masterclass",
                  date: "2025-02-05",
                  time: "2:00 PM",
                  synced: false
                }
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="Calendar" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground">{event.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {event.synced ? (
                      <span className="flex items-center space-x-2 text-green-600">
                        <Icon name="Check" size={16} />
                        <span className="text-sm">Synced</span>
                      </span>
                    ) : (
                      <Button variant="outline" size="sm">
                        Sync Now
                      </Button>
                    )}
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

export default CalendarSync;