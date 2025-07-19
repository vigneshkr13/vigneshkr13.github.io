import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import { FaPython, FaAws, FaNodeJs, FaReact, FaDatabase } from 'react-icons/fa';  
import { SiPostgresql, SiNextdotjs, SiGraphql } from 'react-icons/si';
import "./Experience.css";
import Particle from "../Particle";

// Replace these paths with the actual paths of your logo images
import visionVerseLogo from "../../Assets/visionverse-logo.jpg";
import tcsLogo from "../../Assets/tcs-logo.png";

const experienceData = [
  {
    title: "Vision Verse Interactive Pty Ltd",
    position: "Data and AI Intern",
    duration: "Jul 2024 - Dec 2024",
    location: "Melbourne, Australia",
    technologies: "Python, OpenAI APIs, Web Crawling, Selenium, BeautifulSoup, GraphQL, PostgreSQL, Next.js, JIRA",
    details: [
      "Developed an AI-driven solution automating webpage creation for small-to-medium-sized restaurants, generating pages within 2 minutes.",
      "Implemented a universal scraping module using OpenAI's LLM, Python, and Selenium to extract restaurant data with a 95% success rate.",
      "Designed a dynamic frontend in Next.js, enabling real-time webpage generation from user-inputted URLs.",
      "Integrated a reward-based system in the Dine Seal app to enhance user engagement and incentivize repeat usage.",
      "Led end-to-end project phases, collaborating in a five-member Agile team."
    ],
    logo: visionVerseLogo,
    techIcons: [<FaPython />, <SiGraphql />, <SiPostgresql />, <SiNextdotjs />, <FaAws />]
  },
  {
    title: "Tata Consultancy Services Ltd",
    position: "Data Engineer",
    duration: "Jan 2021 - Dec 2022",
    location: "Tamil Nadu, India",
    technologies: "Azure Data Factory, Azure Synapse Analytics, SQL, Azure Databricks, Power BI, Azure SQL Database",
    details: [
      "Developed and maintained robust data pipelines using Azure Data Factory for a large-scale banking project",
      "Leveraged Azure Databricks for complex data transformations and processing, implementing PySpark jobs to handle large scale banking datasets efficiently." ,
      "Implemented medallion architecture (Bronze, Silver, Gold layers) to optimize data processing workflows, improving data quality and accessibility.",
      "Enhanced database performance by implementing indexing strategies, partitioning, views, and CTEs, reducing query response time by 25%.",
      "Designed comprehensive Power BI dashboards for banking stakeholders, enabling real-time data visualization and faster decision-making."
    ],
    logo: tcsLogo,
    techIcons: [<FaDatabase />, <FaNodeJs />, <FaReact />, <FaAws />]
  },
];

function ExperienceTimeline() {
  const [visibleItems, setVisibleItems] = useState([]);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const observerRef = useRef(null);
  const lastScrollTop = useRef(0);

  const updateLineHeight = () => {
    if (!timelineRef.current) return;
    
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.scrollY;
    const timelineBottom = timelineRect.bottom + window.scrollY;
    
    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const viewportBottom = scrollTop + viewportHeight;
    
    if (viewportBottom < timelineTop) {
      setLineHeight(0);
      return;
    }
    
    if (scrollTop > timelineBottom) {
      const totalTimelineHeight = timelineBottom - timelineTop;
      setLineHeight(totalTimelineHeight);
      return;
    }
    
    const timelineProgress = Math.min(
      (viewportBottom - timelineTop) / (timelineBottom - timelineTop),
      1
    );
    
    const totalHeight = timelineBottom - timelineTop;
    const newLineHeight = totalHeight * timelineProgress;
    
    setLineHeight(Math.max(0, newLineHeight));
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.dataset.index);
        
        if (entry.isIntersecting) {
          if (!visibleItems.includes(index)) {
            setVisibleItems(prev => [...prev, index].sort((a, b) => a - b));
          }
        } else {
          if (visibleItems.includes(index)) {
            setVisibleItems(prev => prev.filter(i => i !== index));
          }
        }
      });
    }, options);

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      observerRef.current.observe(item);
    });

    const handleResize = () => updateLineHeight();
    
    const handleScroll = () => {
      requestAnimationFrame(updateLineHeight);
      lastScrollTop.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    updateLineHeight();

    return () => {
      if (observerRef.current) {
        timelineItems.forEach(item => observerRef.current.unobserve(item));
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [visibleItems]);

  const handleCardHover = (index) => setActiveCard(index);
  const handleCardLeave = () => setActiveCard(null);

  return (
    <Container fluid className="home-about-section">
      <Particle />
      <h1 className="section-title">My Work Experience</h1>
      <div className="timeline" ref={timelineRef}>
        <div 
          className="timeline-line" 
          ref={lineRef}
          style={{ 
            height: `${lineHeight}px`,
            transition: "height 0.2s ease-out"
          }}
        ></div>
        
        {experienceData.map((exp, index) => (
          <div
            key={index}
            data-index={index}
            className={`timeline-item ${visibleItems.includes(index) ? "show" : ""}`}
            style={{
              left: index % 2 === 0 ? "0" : "50%",
              transitionDelay: `${index * 0.2}s`,
              position: "relative", // Important for absolute positioning of tech stack
            }}
          >
            <div className="timeline-dot"></div>
            <div
              className={`timeline-content ${activeCard === index ? "active" : ""}`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              onClick={() => handleCardHover(index === activeCard ? null : index)}
            >
              <div className="company-logo-container">
                <img
                  src={exp.logo}
                  alt={`${exp.title} logo`}
                  className="company-logo"
                />
                <div className="company-info">
                  <h2>{exp.title}</h2>
                </div>
              </div>
              <h3>{exp.position}</h3>
              <p>
                <strong>{exp.duration} | {exp.location}</strong>
              </p>
              <p className="tech-stack">Technologies: {exp.technologies}</p>
              <ul className="experience-details">
                {exp.details.map((point, i) => (
                  <li
                    key={i}
                    className={`detail-item ${activeCard === index ? "show-detail" : ""}`}
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className={`tech-icons-wrapper ${index % 2 === 0 ? "left-side" : "right-side"}`}
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [index % 2 === 0 ? "left" : "right"]: "10px", // Alternating sides
              }}
            >
              {exp.techIcons.map((icon, i) => (
                <div key={i} className="tech-icon">
                  {/* {icon} */}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ExperienceTimeline;
