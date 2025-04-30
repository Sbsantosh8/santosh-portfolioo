import React from 'react';

const About = () => {
  const frontendSkills = ['React', 'Angular', 'JavaScript', 'HTML', 'CSS'];
  const backendSkills = ['Python', 'Django', 'Django REST Framework (DRF)', 'FastAPI', 'GraphQL'];
  const databaseSkills = ['PostgreSQL', 'MySQL', 'AWS RDS', 'Amazon Athena'];
  const cloudEtlSkills = ['AWS Lambda', 'AWS Glue', 'Amazon S3', 'Redis', 'Celery', 'Docker', 'GitLab'];
  const toolsSkills = ['Git', 'JIRA', 'Agile/Scrum'];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a passionate web developer with a strong foundation in front-end and back-end technologies.
              I enjoy turning complex problems into simple, beautiful and intuitive designs.
              My goal is to create software that not only functions efficiently but also provides
              a great user experience.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source
              projects, or enjoying outdoor activities.
            </p>
          </div>
          
          <div className="skills">
            <h3>My Skills</h3>
            <p className="skills-intro">
              I've worked with a range of technologies in the web development world.
              From front-end design to back-end systems, here are some of my technical skills:
            </p>
            <div className="skills-categories">
              <div className="skill-category">
                <h4>Frontend</h4>
                <div className="skills-list">
                  {frontendSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Backend</h4>
                <div className="skills-list">
                  {backendSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Databases</h4>
                <div className="skills-list">
                  {databaseSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Cloud & ETL Services</h4>
                <div className="skills-list">
                  {cloudEtlSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className="skill-category">
                <h4>Tools & Methodologies</h4>
                <div className="skills-list">
                  {toolsSkills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
