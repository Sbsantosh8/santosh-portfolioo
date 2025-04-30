import React from 'react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Website',
      description: 'A full-stack e-commerce platform with product listings, cart functionality, and payment integration.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      imageUrl: 'https://via.placeholder.com/300x200',
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A responsive task management application with drag-and-drop functionality and user authentication.',
      technologies: ['React', 'Firebase', 'Material-UI'],
      imageUrl: 'https://via.placeholder.com/300x200',
      liveUrl: '#',
      codeUrl: '#',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A personal portfolio website showcasing projects and skills.',
      technologies: ['React', 'CSS3', 'JavaScript'],
      imageUrl: 'https://via.placeholder.com/300x200',
      liveUrl: '#',
      codeUrl: '#',
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.imageUrl} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.liveUrl} className="btn sm-btn" target="_blank" rel="noopener noreferrer">Live Demo</a>
                  <a href={project.codeUrl} className="btn sm-btn secondary-btn" target="_blank" rel="noopener noreferrer">View Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
