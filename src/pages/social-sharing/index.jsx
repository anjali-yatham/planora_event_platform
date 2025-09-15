import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SocialSharing = () => {
  const navigate = useNavigate();
  const [copiedLink, setCopiedLink] = useState(null);

  const eventData = {
    title: "React Advanced Workshop",
    date: "January 15, 2025",
    time: "10:00 AM",
    location: "Tech Hub, San Francisco",
    description: "Learn advanced React concepts and best practices in this hands-on workshop",
    registrationLink: "https://planora.com/events/react-workshop-2025",
    hashtags: "#ReactWorkshop #TechEvent #LearnReact #SanFrancisco"
  };

  const socialPlatforms = [
    {
      name: "Instagram",
      icon: "Instagram",
      color: "#E4405F",
      description: "Share visually appealing stories and posts",
      formats: [
        {
          type: "Story",
          size: "1080x1920",
          template: "Event announcement with countdown"
        },
        {
          type: "Post",
          size: "1080x1080",
          template: "Square post with event details"
        }
      ]
    },
    {
      name: "LinkedIn",
      icon: "Linkedin",
      color: "#0A66C2",
      description: "Reach professional networks",
      formats: [
        {
          type: "Post",
          size: "1200x627",
          template: "Professional event announcement"
        },
        {
          type: "Article",
          size: "N/A",
          template: "Long-form event description"
        }
      ]
    },
    {
      name: "WhatsApp",
      icon: "MessageCircle",
      color: "#25D366",
      description: "Direct personal invitations",
      formats: [
        {
          type: "Message",
          size: "N/A",
          template: "Personalized invitation message"
        },
        {
          type: "Status",
          size: "1080x1920",
          template: "Status update with event info"
        }
      ]
    },
    {
      name: "Twitter",
      icon: "Twitter",
      color: "#1DA1F2",
      description: "Quick updates and engagement",
      formats: [
        {
          type: "Tweet",
          size: "1200x675",
          template: "Tweet with event image"
        },
        {
          type: "Thread",
          size: "N/A",
          template: "Multi-tweet event details"
        }
      ]
    }
  ];

  const generateShareContent = (platform) => {
    const baseContent = {
      Instagram: {
        caption: `🚀 Exciting news! Join us for the ${eventData.title} on ${eventData.date} at ${eventData.time}!\n\n📍 ${eventData.location}\n\n${eventData.description}\n\n🎟️ Register now: ${eventData.registrationLink}\n\n${eventData.hashtags}`,
        image: "Event poster with Instagram branding"
      },
      LinkedIn: {
        post: `I'm excited to share that we're hosting ${eventData.title} on ${eventData.date}!\n\n${eventData.description}\n\nDate: ${eventData.date}\nTime: ${eventData.time}\nLocation: ${eventData.location}\n\nThis is a great opportunity for professionals looking to advance their React skills. Limited seats available!\n\nRegister: ${eventData.registrationLink}\n\n${eventData.hashtags}`,
        image: "Professional LinkedIn post image"
      },
      WhatsApp: {
        message: `Hey! 👋\n\nI wanted to personally invite you to ${eventData.title}!\n\n📅 ${eventData.date} at ${eventData.time}\n📍 ${eventData.location}\n\n${eventData.description}\n\nI think you'd really benefit from this workshop. Would love to see you there!\n\nRegister here: ${eventData.registrationLink}\n\nLet me know if you're coming! 😊`,
        image: "WhatsApp-friendly event image"
      },
      Twitter: {
        tweet: `🔥 ${eventData.title} is happening ${eventData.date}!\n\n📍 ${eventData.location}\n⏰ ${eventData.time}\n\n${eventData.description}\n\n🎯 Register: ${eventData.registrationLink}\n\n${eventData.hashtags}\n\n#TechCommunity #EventAlert`,
        image: "Twitter card image"
      }
    };

    return baseContent[platform] || {};
  };

  const handleShare = (platform) => {
    const content = generateShareContent(platform);
    
    // Mock sharing logic - in real implementation, this would open the respective platform's share dialog
    console.log(`Sharing to ${platform}:`, content);
    
    // Show success message
    alert(`Content prepared for ${platform}! In a real implementation, this would open the ${platform} sharing interface.`);
  };

  const handleCopyLink = (linkType) => {
    const links = {
      registration: eventData.registrationLink,
      event: `https://planora.com/events/react-workshop-2025/details`,
      share: `https://planora.com/events/react-workshop-2025/share`
    };
    
    navigator.clipboard.writeText(links[linkType]).then(() => {
      setCopiedLink(linkType);
      setTimeout(() => setCopiedLink(null), 2000);
    });
  };

  const SharePreview = ({ platform, content }) => (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center`} style={{backgroundColor: `${platform.color}20`}}>
          <Icon name={platform.icon} size={20} style={{color: platform.color}} />
        </div>
        <div>
          <h3 className="font-semibold text-card-foreground">{platform.name}</h3>
          <p className="text-sm text-muted-foreground">{platform.description}</p>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 mb-4">
        <div className="aspect-video bg-muted/50 rounded mb-3 flex items-center justify-center">
          <Icon name="Image" size={32} className="text-muted-foreground" />
        </div>
        <div className="text-sm text-card-foreground whitespace-pre-line">
          {Object.values(content)[0]}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          iconName="Share2"
          onClick={() => handleShare(platform.name)}
          className="flex-1"
        >
          Share on {platform.name}
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Copy"
          onClick={() => navigator.clipboard.writeText(Object.values(content)[0])}
        >
          Copy Text
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sky-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Social Sharing Hub</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Promote your events across social platforms with one-click sharing and customized content
            </p>
          </div>

          {/* Event Summary */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Calendar" size={24} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-card-foreground mb-2">{eventData.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} />
                    <span>{eventData.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>{eventData.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>{eventData.location}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{eventData.description}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-card-foreground mb-4">Quick Copy Links</h3>
              <div className="space-y-3">
                {[
                  { key: 'registration', label: 'Registration Link', icon: 'Link' },
                  { key: 'event', label: 'Event Page Link', icon: 'ExternalLink' },
                  { key: 'share', label: 'Share Page Link', icon: 'Share2' }
                ].map((link) => (
                  <div key={link.key} className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName={copiedLink === link.key ? "Check" : "Copy"}
                      onClick={() => handleCopyLink(link.key)}
                      className={`flex-1 justify-start ${
                        copiedLink === link.key ? 'text-success border-success' : ''
                      }`}
                    >
                      {copiedLink === link.key ? 'Copied!' : `Copy ${link.label}`}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-card-foreground mb-4">Sharing Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Shares</span>
                  <span className="font-medium text-card-foreground">247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Click-through Rate</span>
                  <span className="font-medium text-card-foreground">12.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Registrations from Social</span>
                  <span className="font-medium text-success">31</span>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="font-semibold text-card-foreground mb-4">Best Performing Platform</h3>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Icon name="Linkedin" size={16} style={{color: '#0A66C2'}} />
                </div>
                <div>
                  <p className="font-medium text-card-foreground">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">89 shares, 18.2% CTR</p>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '89%'}}></div>
              </div>
            </div>
          </div>

          {/* Social Platform Sharing */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-card-foreground mb-6">Share on Social Platforms</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {socialPlatforms.map((platform) => (
                <SharePreview
                  key={platform.name}
                  platform={platform}
                  content={generateShareContent(platform.name)}
                />
              ))}
            </div>
          </div>

          {/* Bulk Actions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Bulk Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => console.log('Download all content')}
              >
                Download All Content
              </Button>
              <Button
                variant="outline"
                iconName="Schedule"
                onClick={() => console.log('Schedule posts')}
              >
                Schedule All Posts
              </Button>
              <Button
                variant="default"
                iconName="Share2"
                onClick={() => console.log('Share to all platforms')}
              >
                Share to All Platforms
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-accent/5 to-warning/5 rounded-lg border border-accent/20 p-6 mt-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Social Sharing Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Post 3-5 times before the event with different messaging</li>
                  <li>• Use platform-specific hashtags and optimal posting times</li>
                  <li>• Include compelling visuals and clear call-to-action</li>
                  <li>• Engage with comments and shares to boost visibility</li>
                  <li>• Track performance and adjust strategy accordingly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SocialSharing;