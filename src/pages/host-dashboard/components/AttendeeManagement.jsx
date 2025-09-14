import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AttendeeManagement = ({ attendeesData, onSendMessage, onExportData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showMessageModal, setShowMessageModal] = useState(false);

  const { attendees, totalAttendees, registrationTrends, communicationHistory } = attendeesData;

  const filteredAttendees = attendees?.filter(attendee => {
    const matchesSearch = attendee?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         attendee?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesFilter = filterStatus === 'all' || attendee?.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectAttendee = (attendeeId) => {
    setSelectedAttendees(prev => 
      prev?.includes(attendeeId) 
        ? prev?.filter(id => id !== attendeeId)
        : [...prev, attendeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedAttendees?.length === filteredAttendees?.length) {
      setSelectedAttendees([]);
    } else {
      setSelectedAttendees(filteredAttendees?.map(a => a?.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const MessageModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Send Message</h3>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={() => setShowMessageModal(false)}
          />
        </div>
        <div className="space-y-4">
          <Input
            label="Subject"
            placeholder="Enter message subject"
          />
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">Message</label>
            <textarea
              className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              rows={4}
              placeholder="Type your message here..."
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Sending to {selectedAttendees?.length} selected attendees
          </p>
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              onClick={() => {
                onSendMessage(selectedAttendees);
                setShowMessageModal(false);
              }}
              className="flex-1"
            >
              Send Message
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowMessageModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Attendee Management</h2>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={onExportData}
          >
            Export Data
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Mail"
            disabled={selectedAttendees?.length === 0}
            onClick={() => setShowMessageModal(true)}
          >
            Message ({selectedAttendees?.length})
          </Button>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Attendees</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">{totalAttendees}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Users" size={24} color="var(--color-primary)" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">
                {attendees?.filter(a => a?.status === 'confirmed')?.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">
                {attendees?.filter(a => a?.status === 'pending')?.length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
              <Icon name="Clock" size={24} color="var(--color-warning)" />
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Check-in Rate</p>
              <p className="text-2xl font-bold text-card-foreground mt-1">
                {Math.round((attendees?.filter(a => a?.checkedIn)?.length / attendees?.length) * 100)}%
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="UserCheck" size={24} color="var(--color-accent)" />
            </div>
          </div>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search attendees by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
              {['all', 'confirmed', 'pending', 'cancelled']?.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth capitalize ${
                    filterStatus === status
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Attendees Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-card-foreground">
              Attendees ({filteredAttendees?.length})
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedAttendees?.length === filteredAttendees?.length ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground w-12">
                  <input
                    type="checkbox"
                    checked={selectedAttendees?.length === filteredAttendees?.length && filteredAttendees?.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">Attendee</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Event</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Registration Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Check-in</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees?.map((attendee) => (
                <tr key={attendee?.id} className="border-t border-border hover:bg-muted/20 transition-smooth">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedAttendees?.includes(attendee?.id)}
                      onChange={() => handleSelectAttendee(attendee?.id)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {attendee?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-card-foreground">{attendee?.name}</h4>
                        <p className="text-sm text-muted-foreground">{attendee?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-card-foreground">{attendee?.event}</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(attendee?.status)}`}>
                      {attendee?.status?.charAt(0)?.toUpperCase() + attendee?.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-card-foreground">{attendee?.registrationDate}</span>
                  </td>
                  <td className="p-4">
                    {attendee?.checkedIn ? (
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="CheckCircle" size={16} />
                        <span className="text-sm">Checked In</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not checked in</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Mail"
                        onClick={() => console.log('Message attendee', attendee?.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={() => console.log('More actions', attendee?.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {filteredAttendees?.map((attendee) => (
            <div key={attendee?.id} className="p-4 border-b border-border last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedAttendees?.includes(attendee?.id)}
                    onChange={() => handleSelectAttendee(attendee?.id)}
                    className="rounded border-border mt-1"
                  />
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {attendee?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-card-foreground">{attendee?.name}</h4>
                    <p className="text-sm text-muted-foreground">{attendee?.email}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(attendee?.status)}`}>
                  {attendee?.status?.charAt(0)?.toUpperCase() + attendee?.status?.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Event</p>
                  <p className="text-sm font-medium text-card-foreground">{attendee?.event}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Registration</p>
                  <p className="text-sm font-medium text-card-foreground">{attendee?.registrationDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Check-in Status</p>
                  {attendee?.checkedIn ? (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="CheckCircle" size={14} />
                      <span className="text-sm">Checked In</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not checked in</span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mail"
                  onClick={() => console.log('Message attendee', attendee?.id)}
                  className="flex-1"
                >
                  Message
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={() => console.log('More actions', attendee?.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {filteredAttendees?.length === 0 && (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="Users" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground mb-2">No attendees found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? 'Try adjusting your search terms' : 'No attendees have registered yet'}
            </p>
          </div>
        )}
      </div>
      {showMessageModal && <MessageModal />}
    </div>
  );
};

export default AttendeeManagement;