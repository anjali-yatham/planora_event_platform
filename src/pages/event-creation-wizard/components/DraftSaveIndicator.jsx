import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const DraftSaveIndicator = ({ lastSaved, isSaving }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    if (!lastSaved) return;

    const updateTimeAgo = () => {
      const now = new Date();
      const diffMs = now - lastSaved;
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);

      if (diffSeconds < 60) {
        setTimeAgo('just now');
      } else if (diffMinutes < 60) {
        setTimeAgo(`${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`);
      } else if (diffHours < 24) {
        setTimeAgo(`${diffHours} hour${diffHours > 1 ? 's' : ''} ago`);
      } else {
        setTimeAgo(lastSaved?.toLocaleDateString());
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [lastSaved]);

  if (!lastSaved && !isSaving) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-elevation-2 transition-smooth ${
        isSaving 
          ? 'bg-accent text-accent-foreground' 
          : 'bg-success text-success-foreground'
      }`}>
        {isSaving ? (
          <>
            <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-medium">Saving draft...</span>
          </>
        ) : (
          <>
            <Icon name="Check" size={16} />
            <span className="text-sm font-medium">Draft saved {timeAgo}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default DraftSaveIndicator;