import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const Toast = ({ message, type = 'success', isVisible, onClose, duration = 5000 }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  const getToastStyles = () => {
    const baseStyles = 'fixed top-4 right-4 max-w-md p-4 rounded-lg border shadow-lg transform transition-all duration-300 z-50';
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-50 border-gray-200 text-gray-800`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${getToastStyles()} ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name={getIcon()} size={20} />
          <p className="font-medium text-sm">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;