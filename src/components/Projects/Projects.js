import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import music_sub from "../../Assets/Projects/music_sub.avif";
import taxi_trip from "../../Assets/Projects/taxi_trip.avif";
import customer_purchase from "../../Assets/Projects/customer_purchase.avif";
import job_search from "../../Assets/Projects/job_search1.jpg";
import portfolio from "../../Assets/Projects/portfolio.avif";
import slope_one from "../../Assets/Projects/slope_one.avif";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container className="pt-5 pb-5">
        <h1 className="project-heading text-center text-white">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p className="text-center text-white mb-5">
          Explore some of the most exciting projects I have worked on.
        </p>
        <Row className="d-flex justify-content-center">
          <Col md={4} className="project-card mb-4">
            <ProjectCard
              imgPath={job_search}
              isBlog={false}
              title="NLP Job Search App"
              description="AI-powered job search application built with Flask and FastText, optimizing job categorization."
              ghLink="https://github.com/vigneshkr13/NLP_JobSearch_App"
            />
          </Col>

          <Col md={4} className="project-card mb-4">
            <ProjectCard
              imgPath={slope_one}
              isBlog={false}
              title="Recommender System Using Personalized Slope One"
              description="A personalized recommender system using Slope One with improved neighborhood-based filtering."
              ghLink="https://github.com/vigneshkr13/personalized-weighted-slope-one-recommender"
            />
          </Col>

          <Col md={4} className="project-card mb-4">
            <ProjectCard
              imgPath={customer_purchase}
              isBlog={false}
              title="Customer Purchase Analysis"
              description="Predicts customer purchase behavior based on browsing history using KNN and Decision Trees."
              ghLink="https://github.com/vigneshkr13/Customer-Purchase-Analysis/tree/main"
            />
          </Col>

          <Col md={4} className="project-card mb-4">
            <ProjectCard
              imgPath={music_sub}
              isBlog={false}
              title="AWS Music Subscription Application"
              description="A cloud-based music subscription application using AWS (EC2, S3, Lambda)."
              ghLink="https://github.com/vigneshkr13/AWS-Music-Subscription-Application/tree/main"
            />
          </Col>

          <Col md={4} className="project-card mb-4">
            <ProjectCard
              imgPath={portfolio}
              isBlog={false}
              title="My Portfolio Website"
              description="A personal portfolio website built using React, showcasing my projects, skills, and experience with interactive UI elements and animations. Deployed using GitHub Pages."
              ghLink="https://github.com/vigneshkr13/vigneshkr13.github.io"
            />
          </Col>

          <Col md={4} className="project-card mb-4">
            <ProjectCard
              imgPath={taxi_trip}
              isBlog={false}
              title="Taxi Trip Analytics with MapReduce"
              description="Big Data project using MapReduce for taxi trip analysis, leveraging the Hadoop ecosystem."
              ghLink="https://github.com/vigneshkr13/Taxi-Trip-Analytics"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
