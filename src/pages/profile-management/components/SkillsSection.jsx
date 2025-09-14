import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsSection = ({ skills, onSkillsUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const skillSuggestions = [
    'React', 'JavaScript', 'Python', 'Node.js', 'TypeScript', 'Vue.js', 'Angular',
    'Project Management', 'UI/UX Design', 'Data Analysis', 'Machine Learning',
    'Digital Marketing', 'Content Writing', 'Public Speaking', 'Leadership',
    'Agile Methodology', 'DevOps', 'Cloud Computing', 'Cybersecurity', 'Blockchain'
  ];

  const filteredSuggestions = skillSuggestions?.filter(
    suggestion => 
      suggestion?.toLowerCase()?.includes(newSkill?.toLowerCase()) &&
      !skills?.some(skill => skill?.name?.toLowerCase() === suggestion?.toLowerCase())
  );

  const handleAddSkill = (skillName) => {
    if (skillName && !skills?.some(skill => skill?.name?.toLowerCase() === skillName?.toLowerCase())) {
      const newSkillObj = {
        id: Date.now(),
        name: skillName,
        level: 'Intermediate',
        endorsed: 0
      };
      onSkillsUpdate([...skills, newSkillObj]);
      setNewSkill('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillId) => {
    onSkillsUpdate(skills?.filter(skill => skill?.id !== skillId));
  };

  const handleSkillLevelChange = (skillId, newLevel) => {
    onSkillsUpdate(skills?.map(skill => 
      skill?.id === skillId ? { ...skill, level: newLevel } : skill
    ));
  };

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-yellow-100 text-yellow-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-green-100 text-green-800';
      case 'Expert': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Skills & Expertise</h2>
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="TrendingUp" size={16} className="mr-1" />
          <span>{skills?.length} skills</span>
        </div>
      </div>
      {/* Add New Skill */}
      <div className="mb-6">
        <div className="relative">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => {
                  setNewSkill(e?.target?.value);
                  setShowSuggestions(e?.target?.value?.length > 0);
                }}
                onKeyPress={(e) => e?.key === 'Enter' && handleAddSkill(newSkill)}
                placeholder="Add a new skill..."
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {showSuggestions && filteredSuggestions?.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevation-2 max-h-48 overflow-y-auto z-10">
                  {filteredSuggestions?.slice(0, 8)?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddSkill(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-muted/50 transition-smooth text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="default"
              onClick={() => handleAddSkill(newSkill)}
              disabled={!newSkill?.trim()}
              iconName="Plus"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills?.map((skill) => (
          <div key={skill?.id} className="bg-muted/30 rounded-lg p-4 border border-border/50">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{skill?.name}</h3>
                <div className="flex items-center space-x-2">
                  <select
                    value={skill?.level}
                    onChange={(e) => handleSkillLevelChange(skill?.id, e?.target?.value)}
                    className="text-xs px-2 py-1 rounded-full border-0 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  <span className={`text-xs px-2 py-1 rounded-full ${getSkillLevelColor(skill?.level)}`}>
                    {skill?.level}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleRemoveSkill(skill?.id)}
                className="text-muted-foreground hover:text-destructive transition-smooth p-1"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="ThumbsUp" size={12} />
                <span>{skill?.endorsed} endorsements</span>
              </div>
              <button className="text-primary hover:text-primary/80 transition-smooth">
                Request endorsement
              </button>
            </div>
          </div>
        ))}
      </div>
      {skills?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Award" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground mb-2">No skills added yet</p>
          <p className="text-sm text-muted-foreground">Add your skills to showcase your expertise</p>
        </div>
      )}
    </div>
  );
};

export default SkillsSection;