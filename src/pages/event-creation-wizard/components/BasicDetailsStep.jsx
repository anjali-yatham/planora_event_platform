import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BasicDetailsStep = ({ data, onUpdate, onNext }) => {
  const [imagePreview, setImagePreview] = useState(data?.featuredImage || null);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'networking', label: 'Networking Event' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'training', label: 'Training Session' },
    { value: 'meetup', label: 'Meetup' },
    { value: 'hackathon', label: 'Hackathon' }
  ];

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        setImagePreview(imageUrl);
        handleInputChange('featuredImage', imageUrl);
      };
      reader?.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    handleInputChange('featuredImage', null);
  };

  const validateStep = () => {
    const newErrors = {};
    
    if (!data?.title?.trim()) {
      newErrors.title = 'Event title is required';
    }
    
    if (!data?.description?.trim()) {
      newErrors.description = 'Event description is required';
    } else if (data?.description?.trim()?.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }
    
    if (!data?.category) {
      newErrors.category = 'Please select an event category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      onNext();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Basic Event Details</h2>
        <p className="text-muted-foreground">
          Provide essential information about your event to help attendees understand what to expect.
        </p>
      </div>
      <div className="space-y-6">
        <Input
          label="Event Title"
          type="text"
          placeholder="Enter a compelling event title"
          value={data?.title || ''}
          onChange={(e) => handleInputChange('title', e?.target?.value)}
          error={errors?.title}
          required
          className="mb-4"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Event Description <span className="text-destructive">*</span>
          </label>
          <textarea
            placeholder="Describe your event in detail. What will attendees learn or experience?"
            value={data?.description || ''}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
            rows={6}
            className={`w-full px-3 py-2 border rounded-lg text-sm transition-smooth resize-none ${
              errors?.description 
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20' :'border-border focus:border-primary focus:ring-primary/20'
            } focus:outline-none focus:ring-2`}
          />
          {errors?.description && (
            <p className="text-destructive text-xs mt-1">{errors?.description}</p>
          )}
          <p className="text-muted-foreground text-xs mt-1">
            {data?.description?.length || 0} characters (minimum 50 required)
          </p>
        </div>

        <Select
          label="Event Category"
          placeholder="Select event category"
          options={categories}
          value={data?.category || ''}
          onChange={(value) => handleInputChange('category', value)}
          error={errors?.category}
          required
          className="mb-4"
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Featured Image
          </label>
          <p className="text-muted-foreground text-xs mb-3">
            Upload an eye-catching image that represents your event (optional)
          </p>
          
          {imagePreview ? (
            <div className="relative">
              <div className="w-full h-48 rounded-lg overflow-hidden border border-border">
                <Image
                  src={imagePreview}
                  alt="Event featured image preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={removeImage}
                iconName="Trash2"
                iconSize={14}
                className="absolute top-2 right-2"
              >
                Remove
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-smooth">
              <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm mb-3">
                Drag and drop an image here, or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Choose Image
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleNext}
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
          >
            Continue to Scheduling
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsStep;