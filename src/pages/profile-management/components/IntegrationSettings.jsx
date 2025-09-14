import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationSettings = ({ integrations, onIntegrationUpdate }) => {
  const [connectingService, setConnectingService] = useState(null);

  const availableIntegrations = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Sync your professional profile and connections',
      icon: 'Linkedin',
      color: 'text-blue-600 bg-blue-100',
      features: ['Profile sync', 'Connection import', 'Job recommendations']
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Automatically add events to your calendar',
      icon: 'Calendar',
      color: 'text-green-600 bg-green-100',
      features: ['Event sync', 'Reminder notifications', 'Schedule management']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get event notifications in your workspace',
      icon: 'MessageSquare',
      color: 'text-purple-600 bg-purple-100',
      features: ['Event notifications', 'Team updates', 'Channel integration']
    },
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Create and join virtual events seamlessly',
      icon: 'Video',
      color: 'text-blue-600 bg-blue-100',
      features: ['Meeting creation', 'Auto-join links', 'Recording access']
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Showcase your coding projects and contributions',
      icon: 'Github',
      color: 'text-gray-600 bg-gray-100',
      features: ['Repository sync', 'Contribution display', 'Project showcase']
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Process payments for your events',
      icon: 'CreditCard',
      color: 'text-indigo-600 bg-indigo-100',
      features: ['Payment processing', 'Revenue tracking', 'Refund management']
    }
  ];

  const handleConnect = async (serviceId) => {
    setConnectingService(serviceId);
    
    // Simulate OAuth connection process
    setTimeout(() => {
      const updatedIntegrations = {
        ...integrations,
        [serviceId]: {
          connected: true,
          connectedAt: new Date()?.toISOString(),
          status: 'active',
          permissions: ['read', 'write']
        }
      };
      onIntegrationUpdate(updatedIntegrations);
      setConnectingService(null);
    }, 2000);
  };

  const handleDisconnect = (serviceId) => {
    const updatedIntegrations = {
      ...integrations,
      [serviceId]: {
        connected: false,
        connectedAt: null,
        status: 'disconnected',
        permissions: []
      }
    };
    onIntegrationUpdate(updatedIntegrations);
  };

  const handlePermissionChange = (serviceId, permission, enabled) => {
    const currentIntegration = integrations?.[serviceId];
    const updatedPermissions = enabled
      ? [...(currentIntegration?.permissions || []), permission]
      : (currentIntegration?.permissions || [])?.filter(p => p !== permission);

    const updatedIntegrations = {
      ...integrations,
      [serviceId]: {
        ...currentIntegration,
        permissions: updatedPermissions
      }
    };
    onIntegrationUpdate(updatedIntegrations);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Integrations</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Connect external services to enhance your experience
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={20} className="text-primary" />
          <span className="text-sm text-muted-foreground">
            {Object.values(integrations)?.filter(i => i?.connected)?.length} connected
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {availableIntegrations?.map((service) => {
          const integration = integrations?.[service?.id] || { connected: false };
          const isConnecting = connectingService === service?.id;

          return (
            <div key={service?.id} className="bg-muted/20 rounded-lg p-5 border border-border/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${service?.color}`}>
                    <Icon name={service?.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{service?.name}</h3>
                    <p className="text-sm text-muted-foreground">{service?.description}</p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  integration?.connected 
                    ? 'bg-success/20 text-success' :'bg-muted text-muted-foreground'
                }`}>
                  {integration?.connected ? 'Connected' : 'Not connected'}
                </div>
              </div>
              {/* Features */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-foreground mb-2">Features:</h4>
                <ul className="space-y-1">
                  {service?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={12} className="text-success" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Connection Status & Actions */}
              {integration?.connected ? (
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">
                    Connected on {formatDate(integration?.connectedAt)}
                  </div>
                  
                  {/* Permissions */}
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Permissions:</h5>
                    <div className="space-y-2">
                      {['read', 'write', 'notifications']?.map((permission) => (
                        <label key={permission} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={(integration?.permissions || [])?.includes(permission)}
                            onChange={(e) => handlePermissionChange(service?.id, permission, e?.target?.checked)}
                            className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
                          />
                          <span className="text-muted-foreground capitalize">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnect(service?.id)}
                    iconName="Unlink"
                    className="w-full"
                  >
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleConnect(service?.id)}
                  loading={isConnecting}
                  iconName="Link"
                  className="w-full"
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
      {/* API Keys Section */}
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-4 flex items-center">
          <Icon name="Key" size={18} className="mr-2 text-primary" />
          API Access
        </h3>
        <div className="bg-muted/20 rounded-lg p-4 border border-border/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium text-foreground text-sm">Personal API Key</h4>
              <p className="text-xs text-muted-foreground">Use this key to access Planora API programmatically</p>
            </div>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Regenerate
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <code className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm font-mono">
              pk_live_51234567890abcdef...
            </code>
            <Button variant="ghost" size="sm" iconName="Copy">
              Copy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;