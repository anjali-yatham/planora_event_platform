import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SponsorshipMarketplace = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sponsors = [
    {
      id: 1,
      name: "TechCorp Solutions",
      category: "Tech",
      logo: "/api/placeholder/80/80",
      budget: "$10,000 - $50,000",
      interests: ["Technology", "AI", "Startups"],
      description: "Leading tech company specializing in AI and cloud solutions",
      events: 45,
      rating: 4.8,
      responseTime: "2-3 days",
      requirements: "Min 500 attendees, Tech focus"
    },
    {
      id: 2,
      name: "HealthPlus Medical",
      category: "Health",
      logo: "/api/placeholder/80/80",
      budget: "$5,000 - $25,000",
      interests: ["Healthcare", "Medical Technology", "Wellness"],
      description: "Healthcare provider focused on innovation and community wellness",
      events: 32,
      rating: 4.7,
      responseTime: "3-5 days",
      requirements: "Health/Medical events only"
    },
    {
      id: 3,
      name: "EduFuture Foundation",
      category: "Education",
      logo: "/api/placeholder/80/80",
      budget: "$3,000 - $15,000",
      interests: ["Education", "Students", "Learning Technology"],
      description: "Non-profit supporting educational initiatives and student development",
      events: 78,
      rating: 4.9,
      responseTime: "1-2 days",
      requirements: "Educational events, student focused"
    },
    {
      id: 4,
      name: "GreenTech Innovations",
      category: "Sustainability",
      logo: "/api/placeholder/80/80",
      budget: "$8,000 - $30,000",
      interests: ["Sustainability", "Green Technology", "Climate"],
      description: "Sustainable technology company committed to environmental solutions",
      events: 23,
      rating: 4.6,
      responseTime: "2-4 days",
      requirements: "Environmental focus, sustainability themes"
    },
    {
      id: 5,
      name: "StartupHub Accelerator",
      category: "Business",
      logo: "/api/placeholder/80/80",
      budget: "$15,000 - $75,000",
      interests: ["Startups", "Entrepreneurship", "Innovation"],
      description: "Premier startup accelerator and venture capital firm",
      events: 67,
      rating: 4.8,
      responseTime: "1-3 days",
      requirements: "Startup/entrepreneurship events"
    },
    {
      id: 6,
      name: "CreativeMedia Studios",
      category: "Media",
      logo: "/api/placeholder/80/80",
      budget: "$5,000 - $20,000",
      interests: ["Creative Arts", "Media", "Design"],
      description: "Creative agency specializing in digital media and brand experiences",
      events: 41,
      rating: 4.5,
      responseTime: "2-5 days",
      requirements: "Creative/artistic events preferred"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories', icon: 'Grid3x3', count: sponsors.length },
    { id: 'Tech', name: 'Technology', icon: 'Cpu', count: sponsors.filter(s => s.category === 'Tech').length },
    { id: 'Health', name: 'Healthcare', icon: 'Heart', count: sponsors.filter(s => s.category === 'Health').length },
    { id: 'Education', name: 'Education', icon: 'GraduationCap', count: sponsors.filter(s => s.category === 'Education').length },
    { id: 'Business', name: 'Business', icon: 'Briefcase', count: sponsors.filter(s => s.category === 'Business').length },
    { id: 'Sustainability', name: 'Sustainability', icon: 'Leaf', count: sponsors.filter(s => s.category === 'Sustainability').length },
    { id: 'Media', name: 'Media', icon: 'Camera', count: sponsors.filter(s => s.category === 'Media').length }
  ];

  const filteredSponsors = sponsors.filter(sponsor => {
    const matchesCategory = selectedCategory === 'all' || sponsor.category === selectedCategory;
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.interests.some(interest => interest.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const SponsorCard = ({ sponsor }) => (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Building2" size={24} color="var(--color-primary)" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-card-foreground">{sponsor.name}</h3>
              <p className="text-sm text-muted-foreground">{sponsor.category}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-card-foreground">{sponsor.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">{sponsor.description}</p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Budget Range:</span>
          <span className="text-sm font-medium text-success">{sponsor.budget}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Events Sponsored:</span>
          <span className="text-sm font-medium text-card-foreground">{sponsor.events}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Response Time:</span>
          <span className="text-sm font-medium text-card-foreground">{sponsor.responseTime}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Interests:</p>
        <div className="flex flex-wrap gap-1">
          {sponsor.interests.map((interest, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-muted/30 rounded-lg p-3 mb-4">
        <p className="text-xs text-muted-foreground mb-1">Requirements:</p>
        <p className="text-xs text-card-foreground">{sponsor.requirements}</p>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" iconName="Eye" className="flex-1">
          View Details
        </Button>
        <Button variant="default" size="sm" iconName="MessageCircle" className="flex-1">
          Connect
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-pink-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Sponsorship Marketplace</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with potential sponsors and find the perfect match for your events
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Sponsors</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">{sponsors.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Handshake" size={24} color="var(--color-primary)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Budget</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">$25K</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon name="DollarSign" size={24} color="var(--color-success)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">89%</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">2.5 days</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Icon name="Clock" size={24} color="var(--color-warning)" />
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
                  placeholder="Search sponsors..."
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
                      <div className="flex items-center space-x-3">
                        <Icon name={category.icon} size={16} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
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
                  <Button variant="outline" size="sm" iconName="FileText" className="w-full justify-start">
                    Create Sponsor Proposal
                  </Button>
                  <Button variant="outline" size="sm" iconName="Calendar" className="w-full justify-start">
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download" className="w-full justify-start">
                    Download Sponsor Kit
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredSponsors.length} sponsors
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>

              {filteredSponsors.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No sponsors found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SponsorshipMarketplace;