import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiFillInstagram } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import Experience from "./Experience";

function Home2() {
  // Create refs for each paragraph element we want to animate
  const title = useRef(null);
  const paragraph1 = useRef(null);
  const paragraph2 = useRef(null);
  const paragraph3 = useRef(null);
  const paragraph4 = useRef(null);
  
  useEffect(() => {
    // Observer callback function
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // Add or remove the show class based on visibility
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(observerCallback, {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe all our elements
    const elements = [title.current, paragraph1.current, paragraph2.current, paragraph3.current, paragraph4.current];
    elements.forEach(element => {
      if (element) observer.observe(element);
    });

    // Clean up observer on component unmount
    return () => {
      elements.forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="home-about-description text-center">
            <h1 
              ref={title} 
              className="hidden"
              style={{ fontSize: "2.6em" }}
            >
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <div className="home-about-body">
              <p ref={paragraph1} className="hidden">
                I'm a Data Science and Data Engineering enthusiast with a Master's in Data Science from RMIT University. I have a strong background in Business Intelligence from my time at TCS and hands-on experience in AI-driven solutions and data integration from my internship at Vision Verse Interactive.
              </p>

              <p ref={paragraph2} className="hidden">
                I am proficient in languages like
                <i>
                  <b className="purple"> Python, SQL, and JavaScript. </b>
                </i>
              </p>

              <p ref={paragraph3} className="hidden">
                My field of interest includes
                <i>
                  <b className="purple"> Data Engineering, Cloud Computing, </b> and
                  <b className="purple"> AI Integration.</b>
                </i>
              </p>

              <p ref={paragraph4} className="hidden">
                I also enjoy working on <b className="purple">Full-Stack Development</b> and have experience with
                <i>
                  <b className="purple"> Modern JavaScript Frameworks</b>
                </i>, such as
                <b className="purple"> Next.js and React.js</b>, along with backend development using
                <b className="purple"> Flask and GraphQL.</b>
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Experience />
        </Row>

        <Row className="mt-5"> {/* Adjust mt-5 to mt-4 or mt-3 based on needed spacing */}
          <Col md={12} className="home-about-social text-center">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/vigneshkr13"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/vignesh-kumar13/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/___vignesh.kumar___/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>

      </Container>
    </Container>
  );
}

export default Home2;
