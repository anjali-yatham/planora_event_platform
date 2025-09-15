import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AttendeesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');

  const attendeesData = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      event: "React Advanced Workshop",
      eventDate: "2025-01-15",
      status: "confirmed",
      registrationDate: "2024-12-10",
      checkedIn: true,
      ticketType: "Early Bird",
      phone: "+1 234 567 8901"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      event: "AI in Business Conference",
      eventDate: "2025-01-22",
      status: "confirmed",
      registrationDate: "2024-12-08",
      checkedIn: false,
      ticketType: "Regular",
      phone: "+1 234 567 8902"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      event: "Digital Marketing Masterclass",
      eventDate: "2025-02-05",
      status: "pending",
      registrationDate: "2024-12-12",
      checkedIn: false,
      ticketType: "Student",
      phone: "+1 234 567 8903"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@email.com",
      event: "Tech Innovation Summit",
      eventDate: "2024-12-15",
      status: "confirmed",
      registrationDate: "2024-11-20",
      checkedIn: true,
      ticketType: "VIP",
      phone: "+1 234 567 8904"
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      event: "Startup Networking Event",
      eventDate: "2025-01-28",
      status: "cancelled",
      registrationDate: "2024-12-05",
      checkedIn: false,
      ticketType: "Regular",
      phone: "+1 234 567 8905"
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@email.com",
      event: "React Advanced Workshop",
      eventDate: "2025-01-15",
      status: "confirmed",
      registrationDate: "2024-12-15",
      checkedIn: true,
      ticketType: "Regular",
      phone: "+1 234 567 8906"
    }
  ];

  const filteredAttendees = attendeesData.filter(attendee => {
    const matchesSearch = attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         attendee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || attendee.status === statusFilter;
    const matchesEvent = eventFilter === 'all' || attendee.event === eventFilter;
    
    return matchesSearch && matchesStatus && matchesEvent;
  });

  const uniqueEvents = [...new Set(attendeesData.map(a => a.event))];

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Confirmed' },
      pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Pending' },
      cancelled: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Cancelled' },
    };
    
    return statusConfig[status] || statusConfig.pending;
  };

  const handleExportData = () => {
    const csvData = filteredAttendees.map(attendee => ({
      'Name': attendee.name,
      'Email': attendee.email,
      'Event': attendee.event,
      'Status': attendee.status,
      'Registration Date': attendee.registrationDate,
      'Check-in Status': attendee.checkedIn ? 'Checked In' : 'Not Checked In',
      'Ticket Type': attendee.ticketType,
      'Phone': attendee.phone
    }));

    const csvContent = "data:text/csv;charset=utf-8," + 
      Object.keys(csvData[0]).join(",") + "\n" +
      csvData.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendees_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Event Attendees</h1>
                <p className="text-muted-foreground">
                  Manage and communicate with your event participants
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  onClick={handleExportData}
                >
                  Export CSV
                </Button>
                <Button
                  variant="outline"
                  iconName="ArrowLeft"
                  onClick={() => navigate('/host-dashboard')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{attendeesData.length}</p>
                  <p className="text-sm text-muted-foreground">Total Attendees</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {attendeesData.filter(a => a.status === 'confirmed').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Confirmed</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Icon name="UserCheck" size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {attendeesData.filter(a => a.checkedIn).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Checked In</p>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-card-foreground">
                    {attendeesData.filter(a => a.status === 'pending').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <select
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value)}
              >
                <option value="all">All Events</option>
                {uniqueEvents.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Attendees Table */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Attendee</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Event</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Registration Date</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Check-in</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAttendees.map((attendee) => {
                    const statusBadge = getStatusBadge(attendee.status);
                    
                    return (
                      <tr key={attendee.id} className="hover:bg-muted/30 transition-smooth">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                              <span className="text-sm font-medium text-card-foreground">
                                {attendee.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-card-foreground">{attendee.name}</p>
                              <p className="text-sm text-muted-foreground">{attendee.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-card-foreground">{attendee.event}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(attendee.eventDate).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}>
                            {statusBadge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-card-foreground">
                            {new Date(attendee.registrationDate).toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {attendee.checkedIn ? (
                              <>
                                <Icon name="Check" size={16} className="text-green-600" />
                                <span className="text-sm text-green-600">Checked In</span>
                              </>
                            ) : (
                              <>
                                <Icon name="X" size={16} className="text-gray-400" />
                                <span className="text-sm text-gray-400">Not Checked In</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Icon name="Mail" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Phone" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="MoreHorizontal" size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredAttendees.length === 0 && (
              <div className="text-center py-12">
                <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No attendees found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== 'all' || eventFilter !== 'all' 
                    ? 'Try adjusting your filters' 
                    : 'Your attendees will appear here once people register for your events'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" iconName="Mail">
                Email All Attendees
              </Button>
              <Button variant="outline" iconName="MessageSquare">
                Send SMS Update
              </Button>
              <Button variant="outline" iconName="UserPlus">
                Bulk Check-in
              </Button>
              <Button variant="outline" iconName="FileText">
                Generate Report
              </Button>
              <Button variant="outline" iconName="Download">
                Export to Excel
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendeesPage;