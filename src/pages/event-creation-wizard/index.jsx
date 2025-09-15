import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import RoleBasedRouter, { useAuth } from '../../components/ui/RoleBasedRouter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

// Import step components
import StepIndicator from './components/StepIndicator';
import BasicDetailsStep from './components/BasicDetailsStep';
import SchedulingStep from './components/SchedulingStep';
import LocationStep from './components/LocationStep';
import RegistrationStep from './components/RegistrationStep';
import CustomizationStep from './components/CustomizationStep';
import ReviewStep from './components/ReviewStep';
import DraftSaveIndicator from './components/DraftSaveIndicator';

const EventCreationWizard = () => {
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({});
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const steps = [
    { id: 1, title: 'Basic Details', subtitle: 'Event info' },
    { id: 2, title: 'Scheduling', subtitle: 'Date & time' },
    { id: 3, title: 'Location', subtitle: 'Venue setup' },
    { id: 4, title: 'Registration', subtitle: 'Tickets & capacity' },
    { id: 5, title: 'Customization', subtitle: 'Branding & features' },
    { id: 6, title: 'Review', subtitle: 'Publish event' }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('planora_event_draft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setEventData(parsedDraft?.data || {});
        setCurrentStep(parsedDraft?.currentStep || 1);
        setLastSaved(new Date(parsedDraft.timestamp));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSave = () => {
      if (Object.keys(eventData)?.length > 0) {
        saveDraft(false);
      }
    };

    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [eventData]);

  const saveDraft = async (showIndicator = true) => {
    if (showIndicator) setIsSaving(true);
    
    try {
      const draftData = {
        data: eventData,
        currentStep,
        timestamp: new Date()?.toISOString()
      };
      localStorage.setItem('planora_event_draft', JSON.stringify(draftData));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      if (showIndicator) {
        setTimeout(() => setIsSaving(false), 1000);
      }
    }
  };

  const updateEventData = (newData) => {
    setEventData(prev => ({ ...prev, ...newData }));
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleNext = () => {
    if (currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
      saveDraft(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    try {
      // Simulate API call to publish event
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful publish
      localStorage.removeItem('planora_event_draft');
      
      // Navigate to host dashboard with success message
      navigate('/host-dashboard', { 
        state: { 
          message: 'Event published successfully!',
          eventTitle: eventData?.title 
        }
      });
    } catch (error) {
      console.error('Error publishing event:', error);
    }
  };

  const handleSaveDraft = async () => {
    await saveDraft(true);
    navigate('/host-dashboard', { 
      state: { 
        message: 'Event draft saved successfully!',
        eventTitle: eventData?.title 
      }
    });
  };

  const handleExit = () => {
    if (Object.keys(eventData)?.length > 0) {
      setShowExitConfirm(true);
    } else {
      navigate('/host-dashboard');
    }
  };

  const confirmExit = (saveBeforeExit = false) => {
    if (saveBeforeExit) {
      saveDraft(false);
    }
    setShowExitConfirm(false);
    navigate('/host-dashboard');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicDetailsStep
            data={eventData}
            onUpdate={updateEventData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <SchedulingStep
            data={eventData}
            onUpdate={updateEventData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <LocationStep
            data={eventData}
            onUpdate={updateEventData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <RegistrationStep
            data={eventData}
            onUpdate={updateEventData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <CustomizationStep
            data={eventData}
            onUpdate={updateEventData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <ReviewStep
            data={eventData}
            onPrevious={handlePrevious}
            onPublish={handlePublish}
            onSaveDraft={handleSaveDraft}
          />
        );
      default:
        return null;
    }
  };

  return (
    <RoleBasedRouter requiredRole="host">
      <div className="min-h-screen bg-gray-50">
        <Header 
          userRole={userRole} 
          isAuthenticated={true} 
          onLogout={logout}
        />
        
        <main className="pt-16">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="mb-6">
              <NavigationBreadcrumb />
              <div className="flex items-center justify-between mt-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Create New Event</h1>
                  <p className="text-muted-foreground mt-1">
                    Follow the steps below to create and publish your event
                  </p>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleExit}
                  iconName="X"
                  iconPosition="left"
                  iconSize={16}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Exit Wizard
                </Button>
              </div>
            </div>

            <StepIndicator
              currentStep={currentStep}
              steps={steps}
              onStepClick={handleStepClick}
            />

            <div className="mb-8">
              {renderCurrentStep()}
            </div>
          </div>
        </main>

        <DraftSaveIndicator lastSaved={lastSaved} isSaving={isSaving} />

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowExitConfirm(false)} />
            <div className="relative bg-card border border-border rounded-lg shadow-elevation-3 p-6 max-w-md mx-4">
              <div className="flex items-start space-x-3 mb-4">
                <Icon name="AlertTriangle" size={24} className="text-warning mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground">Exit Event Creation?</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    You have unsaved changes. What would you like to do?
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <Button
                  variant="default"
                  onClick={() => confirmExit(true)}
                  iconName="Save"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Save Draft & Exit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => confirmExit(false)}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Discard & Exit
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowExitConfirm(false)}
                  fullWidth
                >
                  Continue Editing
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleBasedRouter>
  );
};

export default EventCreationWizard;