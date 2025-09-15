import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const EventTemplates = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      name: "Tech Conference",
      category: "Technology",
      description: "Complete template for technology conferences with speaker sessions, networking breaks, and exhibition areas",
      image: "/api/placeholder/400/250",
      features: ["Speaker management", "Exhibition hall", "Networking sessions", "Live streaming"],
      attendeeCapacity: "500-2000",
      duration: "1-3 days",
      price: "Free",
      isPopular: true,
      tags: ["Technology", "Conference", "Professional"]
    },
    {
      id: 2,
      name: "Startup Pitch Event",
      category: "Business",
      description: "Perfect for startup pitch competitions with judging panels, investor networking, and presentation setup",
      image: "/api/placeholder/400/250",
      features: ["Pitch presentations", "Judge scoring", "Investor networking", "Awards ceremony"],
      attendeeCapacity: "100-500",
      duration: "Half day",
      price: "Free",
      isPopular: true,
      tags: ["Startup", "Pitch", "Competition"]
    },
    {
      id: 3,
      name: "College Fest",
      category: "Education",
      description: "Comprehensive template for college festivals with multiple events, competitions, and cultural activities",
      image: "/api/placeholder/400/250",
      features: ["Multiple competitions", "Cultural shows", "Food stalls", "Student registration"],
      attendeeCapacity: "1000-5000",
      duration: "2-5 days",
      price: "Free",
      isPopular: true,
      tags: ["College", "Festival", "Students"]
    },
    {
      id: 4,
      name: "Hackathon",
      category: "Technology",
      description: "Complete hackathon setup with team registration, mentorship programs, and project presentations",
      image: "/api/placeholder/400/250",
      features: ["Team formation", "Mentorship", "Judging criteria", "Prize distribution"],
      attendeeCapacity: "50-500",
      duration: "24-72 hours",
      price: "Premium - $49",
      isPopular: false,
      tags: ["Hackathon", "Coding", "Competition"]
    },
    {
      id: 5,
      name: "Music Night",
      category: "Entertainment",
      description: "Music event template with stage setup, sound management, and ticket tiers",
      image: "/api/placeholder/400/250",
      features: ["Stage management", "Sound setup", "VIP areas", "Merchandise booth"],
      attendeeCapacity: "200-2000",
      duration: "Evening",
      price: "Premium - $29",
      isPopular: false,
      tags: ["Music", "Entertainment", "Concert"]
    },
    {
      id: 6,
      name: "Workshop Series",
      category: "Education",
      description: "Template for educational workshops with hands-on activities and skill development",
      image: "/api/placeholder/400/250",
      features: ["Multiple sessions", "Hands-on activities", "Certificates", "Resource sharing"],
      attendeeCapacity: "20-100",
      duration: "1-2 days",
      price: "Free",
      isPopular: false,
      tags: ["Workshop", "Learning", "Skills"]
    },
    {
      id: 7,
      name: "Corporate Summit",
      category: "Business",
      description: "Professional corporate event template with keynotes, panels, and networking opportunities",
      image: "/api/placeholder/400/250",
      features: ["Keynote speakers", "Panel discussions", "Executive networking", "Awards ceremony"],
      attendeeCapacity: "200-1000",
      duration: "1-2 days",
      price: "Premium - $99",
      isPopular: true,
      tags: ["Corporate", "Summit", "Executive"]
    },
    {
      id: 8,
      name: "Health & Wellness Fair",
      category: "Health",
      description: "Health-focused event with wellness activities, health screenings, and expert talks",
      image: "/api/placeholder/400/250",
      features: ["Health screenings", "Wellness activities", "Expert talks", "Vendor booths"],
      attendeeCapacity: "100-500",
      duration: "Full day",
      price: "Premium - $39",
      isPopular: false,
      tags: ["Health", "Wellness", "Community"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', count: templates.length },
    { id: 'Technology', name: 'Technology', count: templates.filter(t => t.category === 'Technology').length },
    { id: 'Business', name: 'Business', count: templates.filter(t => t.category === 'Business').length },
    { id: 'Education', name: 'Education', count: templates.filter(t => t.category === 'Education').length },
    { id: 'Entertainment', name: 'Entertainment', count: templates.filter(t => t.category === 'Entertainment').length },
    { id: 'Health', name: 'Health', count: templates.filter(t => t.category === 'Health').length }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template) => {
    navigate('/event-creation-wizard', { 
      state: { 
        templateMode: true, 
        templateId: template.id,
        templateName: template.name 
      } 
    });
  };

  const handlePreviewTemplate = (template) => {
    setPreviewTemplate(template);
  };

  const PreviewModal = () => {
    if (!previewTemplate) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
        <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-auto">
          <div className="sticky top-0 bg-card border-b border-border p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-card-foreground">{previewTemplate.name}</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setPreviewTemplate(null)}
              />
            </div>
          </div>
          
          <div className="p-6">
            <div className="aspect-video bg-muted/30 rounded-lg mb-6 flex items-center justify-center">
              <Icon name="Image" size={48} className="text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">{previewTemplate.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-card-foreground mb-1">Capacity</p>
                  <p className="text-sm text-muted-foreground">{previewTemplate.attendeeCapacity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground mb-1">Duration</p>
                  <p className="text-sm text-muted-foreground">{previewTemplate.duration}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-card-foreground mb-2">Features included:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {previewTemplate.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={14} color="var(--color-success)" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-medium text-card-foreground mb-2">Tags:</p>
                <div className="flex flex-wrap gap-1">
                  {previewTemplate.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-6 pt-6 border-t border-border">
              <Button
                variant="default"
                onClick={() => {
                  handleUseTemplate(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="flex-1"
              >
                Use This Template
              </Button>
              <Button
                variant="outline"
                iconName="Share2"
                onClick={() => console.log('Share template', previewTemplate.id)}
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const TemplateCard = ({ template }) => (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-smooth group">
      {template.isPopular && (
        <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1">
          Popular Template
        </div>
      )}
      
      <div className="aspect-video bg-muted/30 flex items-center justify-center relative overflow-hidden">
        <Icon name="Layout" size={32} className="text-muted-foreground" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        <Button
          variant="ghost"
          size="sm"
          iconName="Eye"
          className="absolute top-2 right-2 bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100 transition-smooth"
          onClick={() => handlePreviewTemplate(template)}
        />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-card-foreground">{template.name}</h3>
          <span className={`text-sm font-medium ${
            template.price === 'Free' ? 'text-success' : 'text-primary'
          }`}>
            {template.price}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-1">{template.category}</p>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{template.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Capacity:</span>
            <span className="text-card-foreground font-medium">{template.attendeeCapacity}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Duration:</span>
            <span className="text-card-foreground font-medium">{template.duration}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                {tag}
              </span>
            ))}
            {template.tags.length > 2 && (
              <span className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full">
                +{template.tags.length - 2}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => handlePreviewTemplate(template)}
            className="flex-1"
          >
            Preview
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Download"
            onClick={() => handleUseTemplate(template)}
            className="flex-1"
          >
            Use Template
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Event Templates</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from ready-made event templates to quickly set up your events with proven structures and features
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Templates</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">{templates.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Layout" size={24} color="var(--color-primary)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Free Templates</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">
                    {templates.filter(t => t.price === 'Free').length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon name="Gift" size={24} color="var(--color-success)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">{categories.length - 1}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="Grid3x3" size={24} color="var(--color-accent)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">2.1K</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Icon name="Download" size={24} color="var(--color-warning)" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 space-y-6">
              {/* Search */}
              <div>
                <Input
                  type="search"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold text-card-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-smooth ${
                        selectedCategory === category.id
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs bg-muted/50 px-2 py-1 rounded-full">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold text-card-foreground mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" iconName="Plus" className="w-full justify-start">
                    Create Custom Template
                  </Button>
                  <Button variant="outline" size="sm" iconName="Upload" className="w-full justify-start">
                    Upload Template
                  </Button>
                  <Button variant="outline" size="sm" iconName="Heart" className="w-full justify-start">
                    Saved Templates
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredTemplates.length} templates
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="SlidersHorizontal">
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" iconName="ArrowUpDown">
                    Sort
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No templates found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <PreviewModal />
    </div>
  );
};

export default EventTemplates;