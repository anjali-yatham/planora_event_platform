import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';
import Icon from '../AppIcon';

const PaymentModal = ({ isOpen, onClose, event, onPaymentSuccess }) => {
  const [step, setStep] = useState(1); // 1: Personal Details, 2: Payment
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else {
      handlePayment();
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    onPaymentSuccess();
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {step === 1 ? 'Personal Details' : 'Payment Details'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">Step {step} of 2</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
          
          {/* Event Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900">{event?.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              Price: {event?.isPaid ? `$${event?.price}` : 'Free'}
            </p>
          </div>
        </div>

        <div className="p-6">
          {step === 1 ? (
            // Personal Details Form
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                />
                <Input
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                />
              </div>
              
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
                required
              />

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                >
                  Next Step
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            // Payment Form
            <div className="space-y-4">
              <Input
                label="Name on Card"
                type="text"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
              
              <Input
                label="Card Number"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry Date"
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
                <Input
                  label="CVV"
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button 
                  onClick={handlePayment}
                  loading={loading}
                  disabled={!formData.nameOnCard || !formData.cardNumber || !formData.expiryDate || !formData.cvv}
                >
                  {loading ? 'Processing...' : `Pay $${event?.price || 0}`}
                  <Icon name="CreditCard" size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;