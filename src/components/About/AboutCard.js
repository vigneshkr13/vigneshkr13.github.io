import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hey there! I'm <span className="purple">Vignesh Kumar</span>, and I hail from the vibrant country of <span className="purple">India</span> 🌏.
            <br /><br />
            I'm a passionate Data Engineer & Cloud enthusiast, and I absolutely love turning messy data into meaningful insights. 🚀 My journey started as a BI Developer at TCS, where I got a solid foundation in Business Intelligence, and then I dove into the world of AI-driven solutions during my internship at Vision Verse Interactive. I’ve recently completed my Master’s in Data Science from RMIT University. 🎓
            <br /><br />
            I enjoy building scalable data pipelines, automating workflows, and diving deep into cloud platforms like AWS, Azure, and Databricks. Whether it’s wrangling data with Python & SQL, designing ETL pipelines, or integrating AI-powered solutions, I’m always looking for exciting challenges!
            <br /><br />
            When I’m not coding, you can catch me exploring Melbourne, looking for the best coffee spots ☕, gaming 🎮, or writing tech blogs. I’m always tinkering with new tech and learning something fun.
            <br /><br />
            So, if you're up for a chat about tech, data, or just want to exchange coffee recommendations, feel free to connect! 🚀
          </p>

          <ul>
            {/* <li className="about-activity">
              <ImPointRight /> Playing Video Games 🎮
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Fun Tech Blogs 📝
            </li> */}
            <li className="about-activity">
              <ImPointRight /> Traveling & Exploring New Places 🌍
            </li>
            <li className="about-activity">
              <ImPointRight /> Hunting for the Best Coffee in Town ☕
            </li>
            <li className="about-activity">
              <ImPointRight /> Experimenting with New Technologies ⚙️
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Keep calm and let data do the talking" 😎
          </p>
          <footer className="blockquote-footer">Vignesh Kumar</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
