import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const EventMarketplace = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const services = [
    {
      id: 1,
      name: "Professional Event Photography",
      category: "Photography",
      provider: "CaptureMoments Studio",
      price: "$500 - $2,000",
      rating: 4.9,
      reviews: 156,
      image: "/api/placeholder/300/200",
      description: "Professional event photography with same-day editing and digital gallery",
      features: ["Same-day editing", "Digital gallery", "Print options", "Drone photography"],
      deliveryTime: "24-48 hours",
      isPopular: true
    },
    {
      id: 2,
      name: "Custom Event Banners & Signage",
      category: "Design",
      provider: "PrintPro Graphics",
      price: "$50 - $500",
      rating: 4.7,
      reviews: 203,
      image: "/api/placeholder/300/200",
      description: "High-quality custom banners, signage, and promotional materials",
      features: ["Custom design", "Various sizes", "Weather resistant", "Quick turnaround"],
      deliveryTime: "3-5 days",
      isPopular: false
    },
    {
      id: 3,
      name: "Audio Visual Equipment Rental",
      category: "Equipment",
      provider: "TechRent Solutions",
      price: "$200 - $5,000",
      rating: 4.8,
      reviews: 89,
      image: "/api/placeholder/300/200",
      description: "Complete AV setup including projectors, sound systems, and lighting",
      features: ["Setup included", "Technical support", "Backup equipment", "Live streaming"],
      deliveryTime: "Same day",
      isPopular: true
    },
    {
      id: 4,
      name: "Smart Ticketing System",
      category: "Digital",
      provider: "EventTech Pro",
      price: "$99 - $999/month",
      rating: 4.6,
      reviews: 412,
      image: "/api/placeholder/300/200",
      description: "Advanced ticketing platform with QR codes, analytics, and integration",
      features: ["QR code tickets", "Real-time analytics", "Payment processing", "Mobile app"],
      deliveryTime: "Instant setup",
      isPopular: true
    },
    {
      id: 5,
      name: "Event Catering Services",
      category: "Catering",
      provider: "Gourmet Events Co.",
      price: "$15 - $75/person",
      rating: 4.8,
      reviews: 324,
      image: "/api/placeholder/300/200",
      description: "Full-service catering with customizable menus and dietary accommodations",
      features: ["Custom menus", "Dietary options", "Service staff", "Setup & cleanup"],
      deliveryTime: "7-14 days notice",
      isPopular: false
    },
    {
      id: 6,
      name: "Event Security Services",
      category: "Security",
      provider: "SecureEvents Inc.",
      price: "$25 - $50/hour",
      rating: 4.5,
      reviews: 67,
      image: "/api/placeholder/300/200",
      description: "Professional security personnel for events of all sizes",
      features: ["Licensed personnel", "Crowd control", "Emergency response", "Access management"],
      deliveryTime: "48 hours notice",
      isPopular: false
    },
    {
      id: 7,
      name: "Live Streaming & Virtual Events",
      category: "Digital",
      provider: "StreamCast Media",
      price: "$300 - $3,000",
      rating: 4.7,
      reviews: 145,
      image: "/api/placeholder/300/200",
      description: "Professional live streaming setup for hybrid and virtual events",
      features: ["Multi-camera setup", "Interactive features", "Recording included", "Tech support"],
      deliveryTime: "3-7 days",
      isPopular: true
    },
    {
      id: 8,
      name: "Event App & Registration",
      category: "Digital",
      provider: "AppEvents Solutions",
      price: "$199 - $1,999",
      rating: 4.4,
      reviews: 98,
      image: "/api/placeholder/300/200",
      description: "Custom event app with registration, networking, and engagement features",
      features: ["Custom branding", "Networking tools", "Push notifications", "Analytics"],
      deliveryTime: "5-10 days",
      isPopular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: 'Grid3x3', count: services.length },
    { id: 'Photography', name: 'Photography', icon: 'Camera', count: services.filter(s => s.category === 'Photography').length },
    { id: 'Design', name: 'Design & Print', icon: 'Palette', count: services.filter(s => s.category === 'Design').length },
    { id: 'Equipment', name: 'Equipment', icon: 'Settings', count: services.filter(s => s.category === 'Equipment').length },
    { id: 'Digital', name: 'Digital Services', icon: 'Smartphone', count: services.filter(s => s.category === 'Digital').length },
    { id: 'Catering', name: 'Catering', icon: 'UtensilsCrossed', count: services.filter(s => s.category === 'Catering').length },
    { id: 'Security', name: 'Security', icon: 'Shield', count: services.filter(s => s.category === 'Security').length }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const ServiceCard = ({ service }) => (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-elevation-2 transition-smooth">
      {service.isPopular && (
        <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1">
          Popular Choice
        </div>
      )}
      
      <div className="aspect-video bg-muted/30 flex items-center justify-center">
        <Icon name="Image" size={32} className="text-muted-foreground" />
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-card-foreground">{service.name}</h3>
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm text-card-foreground">{service.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-1">{service.provider}</p>
        <p className="text-sm font-medium text-success mb-3">{service.price}</p>

        <p className="text-sm text-muted-foreground mb-4">{service.description}</p>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Features:</p>
            <div className="flex flex-wrap gap-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                  {feature}
                </span>
              ))}
              {service.features.length > 3 && (
                <span className="px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded-full">
                  +{service.features.length - 3} more
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Delivery:</span>
            <span className="text-card-foreground font-medium">{service.deliveryTime}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reviews:</span>
            <span className="text-card-foreground font-medium">{service.reviews} reviews</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Eye" className="flex-1">
            View Details
          </Button>
          <Button variant="default" size="sm" iconName="ShoppingCart" className="flex-1">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Event Marketplace</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find and purchase event services and digital assets to make your events extraordinary
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Services</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">{services.length}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Package" size={24} color="var(--color-primary)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">4.7</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                  <Icon name="Star" size={24} color="#facc15" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Providers</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">142</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon name="Users" size={24} color="var(--color-accent)" />
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Delivery</p>
                  <p className="text-2xl font-bold text-card-foreground mt-1">3 days</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon name="Truck" size={24} color="var(--color-success)" />
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
                  placeholder="Search services..."
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

              {/* Cart */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-card-foreground">Cart</h3>
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    0
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Your cart is empty</p>
                <Button variant="outline" size="sm" iconName="ShoppingCart" className="w-full" disabled>
                  View Cart
                </Button>
              </div>

              {/* Popular Services */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="font-semibold text-card-foreground mb-4">Popular This Week</h3>
                <div className="space-y-3">
                  {services.filter(s => s.isPopular).slice(0, 3).map((service) => (
                    <div key={service.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded bg-muted/30 flex items-center justify-center">
                        <Icon name="Zap" size={16} color="var(--color-primary)" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">{service.name}</p>
                        <p className="text-xs text-muted-foreground">{service.provider}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredServices.length} services
                </p>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="SlidersHorizontal">
                    Filters
                  </Button>
                  <Button variant="outline" size="sm" iconName="ArrowUpDown">
                    Sort by Price
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>

              {filteredServices.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">No services found</h3>
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

export default EventMarketplace;