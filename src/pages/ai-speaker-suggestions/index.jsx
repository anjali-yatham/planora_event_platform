import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AISpeakerSuggestions = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const trendingSpeakers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      expertise: "AI & Machine Learning",
      rating: 4.9,
      events: 156,
      location: "San Francisco, CA",
      avatar: "/api/placeholder/80/80",
      topics: ["AI", "Machine Learning", "Deep Learning"],
      price: "$5,000 - $8,000",
      availability: "Available"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      expertise: "Blockchain & Web3",
      rating: 4.8,
      events: 89,
      location: "New York, NY",
      avatar: "/api/placeholder/80/80",
      topics: ["Blockchain", "Cryptocurrency", "Web3"],
      price: "$3,000 - $6,000",
      availability: "Booked until March"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      expertise: "Sustainable Technology",
      rating: 4.9,
      events: 203,
      location: "Austin, TX",
      avatar: "/api/placeholder/80/80",
      topics: ["Green Tech", "Sustainability", "Climate Solutions"],
      price: "$4,000 - $7,000",
      availability: "Available"
    }
  ];

  const eventTopics = [
    "Technology & Innovation",
    "Artificial Intelligence",
    "Blockchain & Cryptocurrency",
    "Startups & Entrepreneurship",
    "Digital Marketing",
    "Sustainability",
    "Healthcare Innovation",
    "Education Technology",
    "Financial Technology",
    "Data Science"
  ];

  const handleSurpriseMe = () => {
    setLoading(true);
    // Simulate AI recommendation
    setTimeout(() => {
      const randomSpeaker = trendingSpeakers[Math.floor(Math.random() * trendingSpeakers.length)];
      setSuggestions([randomSpeaker]);
      setLoading(false);
    }, 1500);
  };

  const handleTopicSearch = () => {
    if (!selectedTopic) return;
    
    setLoading(true);
    // Simulate AI search based on topic
    setTimeout(() => {
      const filteredSpeakers = trendingSpeakers.filter(speaker =>
        speaker.topics.some(topic => 
          topic.toLowerCase().includes(selectedTopic.toLowerCase()) ||
          selectedTopic.toLowerCase().includes(topic.toLowerCase())
        )
      );
      setSuggestions(filteredSpeakers.length > 0 ? filteredSpeakers : trendingSpeakers);
      setLoading(false);
    }, 1000);
  };

  const SpeakerCard = ({ speaker }) => (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth">
      <div className="flex items-start space-x-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-lg font-bold text-primary">
            {speaker.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-card-foreground">{speaker.name}</h3>
              <p className="text-sm text-muted-foreground">{speaker.expertise}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-card-foreground">{speaker.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{speaker.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{speaker.events} events</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {speaker.topics.map((topic, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                {topic}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-card-foreground">{speaker.price}</p>
              <p className="text-xs text-muted-foreground">{speaker.availability}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Eye">
                View Profile
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                iconName="MessageCircle"
                disabled={speaker.availability !== "Available"}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-teal-50">
      <Header userRole="host" isAuthenticated={true} />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Speaker Suggestions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get AI-powered recommendations for event speakers based on your event topic and audience
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-card rounded-lg border border-border p-8 mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Event Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select your event topic</option>
                    {eventTopics.map((topic, index) => (
                      <option key={index} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Search"
                    iconPosition="left"
                    onClick={handleTopicSearch}
                    disabled={!selectedTopic || loading}
                    className="flex-1"
                  >
                    {loading ? 'Finding Speakers...' : 'Find Speakers'}
                  </Button>
                  <div className="text-muted-foreground">or</div>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Shuffle"
                    iconPosition="left"
                    onClick={handleSurpriseMe}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? 'Generating...' : 'Surprise Me!'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Brain" size={24} color="var(--color-primary)" />
                <h2 className="text-xl font-semibold text-card-foreground">AI Recommendations</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {suggestions.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </div>
            </div>
          )}

          {/* Trending Speakers */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
                <h2 className="text-xl font-semibold text-card-foreground">Trending Speakers</h2>
              </div>
              <Button variant="outline" size="sm" iconName="ArrowRight">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {trendingSpeakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6 mt-8">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground mb-2">Pro Tips for Choosing Speakers</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Check speaker availability and book 2-3 months in advance</li>
                  <li>• Review their previous events and audience feedback</li>
                  <li>• Consider virtual options to expand your speaker pool</li>
                  <li>• Mix industry experts with emerging voices for variety</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AISpeakerSuggestions;