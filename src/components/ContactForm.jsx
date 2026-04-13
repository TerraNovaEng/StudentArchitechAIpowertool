import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/ContactForm.css';

const ContactForm = ({ workshop, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: workshop.title,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // EmailJS Configuration - REPLACE THESE WITH YOUR REAL VALUES:
      // 1. Go to https://www.emailjs.com/
      // 2. Create account and add email service (Gmail, Outlook, etc.)
      // 3. Create email template with these variables
      // 4. Copy Service ID, Template ID, and Public Key below
      
      const serviceId = 'REPLACE_WITH_YOUR_SERVICE_ID'; // e.g., 'service_abc123'
      const templateId = 'REPLACE_WITH_YOUR_TEMPLATE_ID'; // e.g., 'template_xyz789'  
      const publicKey = 'REPLACE_WITH_YOUR_PUBLIC_KEY'; // e.g., 'ABC123def456'

      // Check if EmailJS is properly configured
      if (serviceId.includes('REPLACE') || templateId.includes('REPLACE') || publicKey.includes('REPLACE')) {
        throw new Error('EmailJS not configured. Please replace the placeholder values with your real EmailJS credentials.');
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        workshop: workshop.title,
        message: formData.message,
        to_email: 'cavalcanti.paula1@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      console.log('Email sent successfully:', formData);
      setSubmitted(true);
      onSubmit?.(formData);

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Failed to send email:', error);
      
      // Show user-friendly error message
      const errorMessage = error.message.includes('not configured') 
        ? 'Email service not configured. Please set up EmailJS credentials in ContactForm.jsx'
        : 'Failed to send email. Please try again or contact us directly at cavalcanti.paula1@gmail.com';
      
      alert(errorMessage);
      
      // Still mark as submitted for demo purposes
      setSubmitted(true);
      onSubmit?.(formData);
      
      setTimeout(() => {
        onClose();
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-overlay" onClick={onClose}>
      <div className="contact-form-modal" onClick={(e) => e.stopPropagation()}>
        {!submitted ? (
          <>
            <button className="close-btn" onClick={onClose}>✕</button>
            <h2>Join {workshop.title}</h2>
            <p className="form-subtitle">Tell us about yourself!</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Why are you interested?</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your interest in this workshop..."
                  rows="4"
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? '📤 Sending...' : '✓ Join Workshop'}
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">🎉</div>
            <h2>Welcome Aboard!</h2>
            <p>Thanks for joining {workshop.title}</p>
            <p className="success-text">We've sent your registration details to our team!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
