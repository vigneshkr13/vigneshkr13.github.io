import React, { useEffect, useState, useRef } from "react";
import { Container } from "react-bootstrap";
import "./Experience.css";
import Particle from "../Particle";

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
  },
  {
    title: "Tata Consultancy Services Ltd",
    position: "Data Engineer",
    duration: "Jan 2021 - Dec 2022",
    location: "Tamil Nadu, India",
    technologies: "Informatica PowerCenter, Unix Shell Scripting, SQL, PL/SQL, Cognos, Excel",
    details: [
      "Improved ETL workflows using Informatica, reducing processing time by 50% and increasing data accuracy by 30%.",
      "Automated job scheduling with shell scripts, cutting manual interventions by 40% and improving monitoring efficiency by 25%.",
      "Delivered 98% of sprint goals on time in Agile teams, optimizing backlog prioritization and project delivery.",
      "Enhanced database performance, reducing query response time by 25% and improving system reliability.",
      "Designed and automated reporting dashboards using Cognos, streamlining data visualization for stakeholders."
    ],
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

  // Function to calculate and set line height based on scroll position
  const updateLineHeight = () => {
    if (!timelineRef.current) return;
    
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineTop = timelineRect.top + window.scrollY;
    const timelineBottom = timelineRect.bottom + window.scrollY;
    
    // Current scroll position
    const scrollTop = window.scrollY;
    
    // Calculate how much of the timeline is currently visible
    const viewportHeight = window.innerHeight;
    const viewportBottom = scrollTop + viewportHeight;
    
    // If timeline is not yet in view, line height is 0
    if (viewportBottom < timelineTop) {
      setLineHeight(0);
      return;
    }
    
    // If we've scrolled past the timeline, line is at full height
    if (scrollTop > timelineBottom) {
      // Get the total height of the timeline
      const totalTimelineHeight = timelineBottom - timelineTop;
      setLineHeight(totalTimelineHeight);
      return;
    }
    
    // Calculate progress through the timeline (as a percentage)
    const timelineProgress = Math.min(
      (viewportBottom - timelineTop) / (timelineBottom - timelineTop),
      1
    );
    
    // Calculate the line height based on progress
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

    // Set up intersection observer for timeline items
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const index = parseInt(entry.target.dataset.index);
        
        if (entry.isIntersecting) {
          // Add to visible items if not already there
          if (!visibleItems.includes(index)) {
            setVisibleItems(prev => [...prev, index].sort((a, b) => a - b));
          }
        } else {
          // Remove from visible items
          if (visibleItems.includes(index)) {
            setVisibleItems(prev => prev.filter(i => i !== index));
          }
        }
      });
    }, options);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      observerRef.current.observe(item);
    });

    // Set up window resize handler
    const handleResize = () => {
      updateLineHeight();
    };
    
    // Set up scroll event for line animation
    const handleScroll = () => {
      requestAnimationFrame(updateLineHeight);
      lastScrollTop.current = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Initial line height setup
    updateLineHeight();

    return () => {
      if (observerRef.current) {
        timelineItems.forEach(item => {
          observerRef.current.unobserve(item);
        });
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [visibleItems]); // Include visibleItems as a dependency

  const handleCardHover = (index) => {
    setActiveCard(index);
  };

  const handleCardLeave = () => {
    setActiveCard(null);
  };

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
              transitionDelay: `${index * 0.2}s` 
            }}
          >
            <div className="timeline-dot"></div>
            <div 
              className={`timeline-content ${activeCard === index ? "active" : ""}`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              onClick={() => handleCardHover(index === activeCard ? null : index)}
            >
              <h2>{exp.title}</h2>
              <h3>{exp.position}</h3>
              <p><strong>{exp.duration} | {exp.location}</strong></p>
              <p className="tech-stack">Technologies: {exp.technologies}</p>
              <ul className="experience-details">
                {exp.details.map((point, i) => (
                  <li key={i} className={`detail-item ${activeCard === index ? "show-detail" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export default ExperienceTimeline;