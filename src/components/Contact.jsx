import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setFormStatus(''), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Contact Me</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <span>santoshmudhiraj81@gmail.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <span>+91 8108642185</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <span>Mumbai, India</span>
            </div>
            {/* Social links moved to Skills component */}
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
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
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn primary-btn" disabled={formStatus === 'sending'}>
              {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus === 'success' && (
              <p className="form-success">Message sent successfully!</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
