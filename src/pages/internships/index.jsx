import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Internships = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const internshipCategories = [
    { id: 'all', label: 'All Categories', count: 48 },
    { id: 'event-management', label: 'Event Management', count: 15 },
    { id: 'marketing', label: 'Marketing & PR', count: 12 },
    { id: 'operations', label: 'Operations', count: 8 },
    { id: 'technology', label: 'Technology', count: 7 },
    { id: 'design', label: 'Design & Creative', count: 6 }
  ];

  const mockInternships = [
    {
      id: 1,
      title: 'Event Management Intern',
      company: 'EventPro Solutions',
      location: 'New York, NY',
      type: 'Remote/On-site',
      duration: '3 months',
      category: 'event-management',
      requirements: ['Event planning experience', 'Strong communication', 'Detail-oriented'],
      description: 'Support large-scale event planning and execution, coordinate with vendors, assist in attendee management.',
      salary: '$2,000/month',
      tags: ['Paid', 'Full-time', 'Entry-level'],
      featured: true
    },
    {
      id: 2,
      title: 'Digital Marketing Intern',
      company: 'Creative Events Agency',
      location: 'Los Angeles, CA',
      type: 'Hybrid',
      duration: '4 months',
      category: 'marketing',
      requirements: ['Social media experience', 'Content creation', 'Analytics tools'],
      description: 'Create engaging content for event promotions, manage social media campaigns, analyze performance metrics.',
      salary: '$1,800/month',
      tags: ['Paid', 'Part-time', 'Entry-level']
    },
    {
      id: 3,
      title: 'Technical Support Intern',
      company: 'TechEvent Platform',
      location: 'San Francisco, CA',
      type: 'Remote',
      duration: '6 months',
      category: 'technology',
      requirements: ['Basic coding knowledge', 'Problem-solving', 'Customer service'],
      description: 'Provide technical support for event platform users, troubleshoot issues, contribute to product improvement.',
      salary: '$2,500/month',
      tags: ['Paid', 'Full-time', 'Mid-level']
    },
    {
      id: 4,
      title: 'Event Operations Intern',
      company: 'Global Conference Group',
      location: 'Chicago, IL',
      type: 'On-site',
      duration: '3 months',
      category: 'operations',
      requirements: ['Organizational skills', 'Team coordination', 'Physical stamina'],
      description: 'Support event logistics, coordinate on-site operations, manage equipment and vendor relationships.',
      salary: '$1,500/month',
      tags: ['Paid', 'Full-time', 'Entry-level']
    },
    {
      id: 5,
      title: 'Creative Design Intern',
      company: 'Visual Events Studio',
      location: 'Miami, FL',
      type: 'Hybrid',
      duration: '4 months',
      category: 'design',
      requirements: ['Design software proficiency', 'Creative portfolio', 'Brand understanding'],
      description: 'Create visual assets for events, design promotional materials, assist in brand identity development.',
      salary: '$1,700/month',
      tags: ['Paid', 'Part-time', 'Entry-level']
    },
    {
      id: 6,
      title: 'Event Marketing Specialist Intern',
      company: 'StartupEvents Inc.',
      location: 'Austin, TX',
      type: 'Remote',
      duration: '5 months',
      category: 'marketing',
      requirements: ['Marketing fundamentals', 'Data analysis', 'Campaign management'],
      description: 'Plan and execute marketing campaigns for tech events, analyze ROI, manage influencer partnerships.',
      salary: '$2,200/month',
      tags: ['Paid', 'Full-time', 'Mid-level', 'Featured']
    }
  ];

  const filteredInternships = selectedCategory === 'all' 
    ? mockInternships 
    : mockInternships.filter(internship => internship.category === selectedCategory);

  const InternshipCard = ({ internship }) => (
    <div className={`bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth ${
      internship.featured ? 'ring-2 ring-primary/20' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">{internship.title}</h3>
          <p className="text-muted-foreground mb-2">{internship.company}</p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{internship.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{internship.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Building" size={14} />
              <span>{internship.type}</span>
            </div>
          </div>
        </div>
        {internship.featured && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            Featured
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{internship.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2">Requirements:</h4>
        <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
          {internship.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-success">{internship.salary}</span>
          <div className="flex items-center space-x-1">
            {internship.tags.map((tag, index) => (
              <span key={index} className={`px-2 py-1 text-xs rounded-full ${
                tag === 'Paid' ? 'bg-success/10 text-success' :
                tag === 'Featured' ? 'bg-primary/10 text-primary' :
                'bg-muted text-muted-foreground'
              }`}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Button variant="default" size="sm">
          Apply Now
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-lime-50">
      <Header userRole="host" isAuthenticated={true} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Briefcase" size={32} color="var(--color-primary)" />
              <h1 className="text-3xl font-bold text-foreground">Event Industry Internships</h1>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Discover exciting internship opportunities in the event industry. Build your career with hands-on experience 
              in event management, marketing, operations, and technology.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">48</p>
              <p className="text-sm text-muted-foreground">Total Opportunities</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-success">32</p>
              <p className="text-sm text-muted-foreground">Paid Positions</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-accent">15</p>
              <p className="text-sm text-muted-foreground">Remote Options</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-secondary">6</p>
              <p className="text-sm text-muted-foreground">Featured Companies</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {internshipCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Internships Grid */}
          <div className="space-y-6">
            {filteredInternships.map((internship) => (
              <InternshipCard key={internship.id} internship={internship} />
            ))}
          </div>

          {/* Apply Tips */}
          <div className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Application Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  <div>
                    <h3 className="font-medium text-card-foreground">Tailor Your Resume</h3>
                    <p className="text-sm text-muted-foreground">Highlight relevant event experience and transferable skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  <div>
                    <h3 className="font-medium text-card-foreground">Show Enthusiasm</h3>
                    <p className="text-sm text-muted-foreground">Demonstrate passion for the event industry in your cover letter</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  <div>
                    <h3 className="font-medium text-card-foreground">Research Companies</h3>
                    <p className="text-sm text-muted-foreground">Learn about the company's events and values before applying</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  <div>
                    <h3 className="font-medium text-card-foreground">Network Actively</h3>
                    <p className="text-sm text-muted-foreground">Connect with industry professionals on LinkedIn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Internships;