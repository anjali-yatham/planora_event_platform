import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import Toast from '../../components/ui/Toast';

const CalendarPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  useEffect(() => {
    // If navigated with event data, populate form
    if (location.state?.newEvent) {
      const { newEvent } = location.state;
      const eventDate = new Date(newEvent.date);
      setEventForm({
        title: newEvent.title || '',
        date: eventDate.toISOString().split('T')[0],
        time: eventDate.toTimeString().slice(0, 5),
        description: newEvent.description || ''
      });
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCalendar = () => {
    if (!eventForm.title || !eventForm.date || !eventForm.time) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    // Create Google Calendar URL
    const startDateTime = new Date(`${eventForm.date}T${eventForm.time}`);
    const endDateTime = new Date(startDateTime.getTime() + (2 * 60 * 60 * 1000)); // Add 2 hours
    
    const formatDateTime = (date) => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventForm.title)}&dates=${formatDateTime(startDateTime)}/${formatDateTime(endDateTime)}&details=${encodeURIComponent(eventForm.description)}`;
    
    window.open(calendarUrl, '_blank');
    showToast('Calendar entry created successfully!', 'success');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Back
            </Button>
            
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Add Event to Calendar
            </h1>
            <p className="text-muted-foreground">
              Create a new calendar entry or modify the event details below.
            </p>
          </div>

          {/* Event Form */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="space-y-6">
              <Input
                label="Event Title"
                name="title"
                value={eventForm.title}
                onChange={handleInputChange}
                placeholder="Enter event title"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  name="date"
                  value={eventForm.date}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Time"
                  type="time"
                  name="time"
                  value={eventForm.time}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={eventForm.description}
                  onChange={handleInputChange}
                  placeholder="Enter event description"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddToCalendar}
                  disabled={!eventForm.title || !eventForm.date || !eventForm.time}
                >
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </div>
          </div>

          {/* Calendar Integration Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Calendar Integration
                </h3>
                <p className="text-sm text-muted-foreground">
                  This will open Google Calendar in a new tab with your event details pre-filled. 
                  You can then save it to your preferred calendar service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={hideToast}
      />
    </div>
  );
};

export default CalendarPage;