import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Hi, I'm <span className="highlight">Santosh Basragan</span></h1>
          <h2>Python Developer</h2>
          <p>
            I build robust Backend Systems, APIs, and Data Solutions using Python and modern Frameworks.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn primary-btn">View My Work</a>
            <a href="#contact" className="btn secondary-btn">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
