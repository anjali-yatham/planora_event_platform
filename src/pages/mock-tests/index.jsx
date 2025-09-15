import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import NavigationBreadcrumb from '../../components/ui/NavigationBreadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const MockTests = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTest, setSelectedTest] = useState(null);

  const testCategories = [
    { id: 'all', label: 'All Tests', count: 15 },
    { id: 'event-planning', label: 'Event Planning', count: 5 },
    { id: 'management', label: 'Event Management', count: 4 },
    { id: 'marketing', label: 'Event Marketing', count: 3 },
    { id: 'operations', label: 'Operations', count: 3 }
  ];

  const mockTestsData = [
    {
      id: 1,
      title: 'Event Planning Fundamentals',
      category: 'event-planning',
      difficulty: 'Beginner',
      duration: '30 minutes',
      questions: 25,
      description: 'Test your knowledge of basic event planning principles, timeline management, and vendor coordination.',
      topics: ['Event Timeline', 'Vendor Management', 'Budget Planning', 'Risk Assessment'],
      completedBy: 1250,
      averageScore: 78,
      badge: 'New',
      featured: true
    },
    {
      id: 2,
      title: 'Advanced Event Management',
      category: 'management',
      difficulty: 'Advanced',
      duration: '45 minutes',
      questions: 35,
      description: 'Challenge yourself with complex scenarios in large-scale event management and crisis handling.',
      topics: ['Crisis Management', 'Team Leadership', 'Stakeholder Communication', 'Quality Control'],
      completedBy: 892,
      averageScore: 72,
      badge: 'Popular'
    },
    {
      id: 3,
      title: 'Digital Event Marketing',
      category: 'marketing',
      difficulty: 'Intermediate',
      duration: '25 minutes',
      questions: 20,
      description: 'Assess your skills in digital marketing strategies, social media promotion, and campaign analytics.',
      topics: ['Social Media Strategy', 'Email Marketing', 'Content Creation', 'ROI Analysis'],
      completedBy: 2100,
      averageScore: 81,
      badge: 'Trending'
    },
    {
      id: 4,
      title: 'Event Operations & Logistics',
      category: 'operations',
      difficulty: 'Intermediate',
      duration: '35 minutes',
      questions: 30,
      description: 'Test your operational knowledge including venue management, equipment handling, and day-of coordination.',
      topics: ['Venue Setup', 'Equipment Management', 'Staff Coordination', 'Attendee Flow'],
      completedBy: 756,
      averageScore: 75
    },
    {
      id: 5,
      title: 'Virtual Event Mastery',
      category: 'event-planning',
      difficulty: 'Advanced',
      duration: '40 minutes',
      questions: 32,
      description: 'Master the complexities of virtual and hybrid event planning, technology integration, and engagement strategies.',
      topics: ['Platform Selection', 'Engagement Strategies', 'Technical Setup', 'Hybrid Coordination'],
      completedBy: 643,
      averageScore: 69,
      badge: 'Challenging'
    },
    {
      id: 6,
      title: 'Event Budgeting & Finance',
      category: 'management',
      difficulty: 'Intermediate',
      duration: '30 minutes',
      questions: 25,
      description: 'Evaluate your financial planning skills, cost estimation, and budget optimization for events.',
      topics: ['Cost Estimation', 'Financial Planning', 'Sponsorship ROI', 'Budget Tracking'],
      completedBy: 1100,
      averageScore: 80
    }
  ];

  const filteredTests = selectedCategory === 'all' 
    ? mockTestsData 
    : mockTestsData.filter(test => test.category === selectedCategory);

  const TestCard = ({ test }) => (
    <div className={`bg-card rounded-lg border border-border p-6 hover:shadow-elevation-2 transition-smooth ${
      test.featured ? 'ring-2 ring-primary/20' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground mb-1">{test.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{test.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="HelpCircle" size={14} />
              <span>{test.questions} questions</span>
            </div>
            <div className={`flex items-center space-x-1 ${
              test.difficulty === 'Beginner' ? 'text-success' :
              test.difficulty === 'Intermediate' ? 'text-warning' : 'text-destructive'
            }`}>
              <Icon name="BarChart" size={14} />
              <span>{test.difficulty}</span>
            </div>
          </div>
        </div>
        {test.badge && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            test.badge === 'New' ? 'bg-green-100 text-green-700' :
            test.badge === 'Popular' ? 'bg-blue-100 text-blue-700' :
            test.badge === 'Trending' ? 'bg-purple-100 text-purple-700' :
            test.badge === 'Challenging' ? 'bg-red-100 text-red-700' :
            'bg-muted text-muted-foreground'
          }`}>
            {test.badge}
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{test.description}</p>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-card-foreground mb-2">Topics Covered:</h4>
        <div className="flex flex-wrap gap-2">
          {test.topics.map((topic, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-muted rounded-full text-muted-foreground">
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>{test.completedBy.toLocaleString()} completed</span>
            <span>Avg. Score: {test.averageScore}%</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-warning" />
          <span className="text-xs text-muted-foreground">Certificate on completion</span>
        </div>
        <Button 
          variant="default" 
          size="sm"
          onClick={() => setSelectedTest(test)}
        >
          Start Test
        </Button>
      </div>
    </div>
  );

  const TestModal = ({ test, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card rounded-lg border border-border p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground mb-2">{test.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{test.duration}</span>
              <span>{test.questions} questions</span>
              <span className={test.difficulty === 'Beginner' ? 'text-success' : 
                              test.difficulty === 'Intermediate' ? 'text-warning' : 'text-destructive'}>
                {test.difficulty}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-card-foreground mb-2">About this test:</h3>
            <p className="text-muted-foreground">{test.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-card-foreground mb-3">What you'll be tested on:</h3>
            <div className="grid grid-cols-2 gap-3">
              {test.topics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  <span className="text-sm text-muted-foreground">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-semibold text-card-foreground mb-2">Test Guidelines:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• You have {test.duration} to complete all {test.questions} questions</li>
              <li>• Each question has multiple choice answers</li>
              <li>• You can review and change answers before submitting</li>
              <li>• A score of 70% or higher earns a completion certificate</li>
              <li>• You can retake the test after 24 hours</li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Users" size={16} />
              <span>{test.completedBy.toLocaleString()} people have taken this test</span>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="default">
                Begin Test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-emerald-50">
      <Header userRole="host" isAuthenticated={true} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <NavigationBreadcrumb className="mb-6" />

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="FileQuestion" size={32} color="var(--color-primary)" />
              <h1 className="text-3xl font-bold text-foreground">Mock Tests & Assessments</h1>
            </div>
            <p className="text-muted-foreground max-w-3xl">
              Test your event management skills with our comprehensive assessment suite. Practice with real-world scenarios 
              and earn certificates to showcase your expertise.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-primary">15</p>
              <p className="text-sm text-muted-foreground">Available Tests</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-success">5,850</p>
              <p className="text-sm text-muted-foreground">Total Completions</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-accent">76%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
            <div className="bg-card rounded-lg border border-border p-4 text-center">
              <p className="text-2xl font-bold text-secondary">2,100</p>
              <p className="text-sm text-muted-foreground">Certificates Issued</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {testCategories.map((category) => (
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

          {/* Tests Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Why Take Mock Tests?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Target" size={24} color="var(--color-primary)" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Identify Skill Gaps</h3>
                <p className="text-sm text-muted-foreground">Discover areas where you need improvement and focus your learning efforts</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="Award" size={24} color="var(--color-success)" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Earn Certificates</h3>
                <p className="text-sm text-muted-foreground">Get recognized for your expertise with verifiable digital certificates</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="TrendingUp" size={24} color="var(--color-accent)" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">Monitor your improvement over time and benchmark against industry standards</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Test Modal */}
      {selectedTest && (
        <TestModal test={selectedTest} onClose={() => setSelectedTest(null)} />
      )}
    </div>
  );
};

export default MockTests;