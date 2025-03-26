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
I'm a passionate Data Engineer & Cloud enthusiast with 2.5 years of experience, and I absolutely love turning messy data into meaningful insights. 🚀 My journey started as a BI Developer at TCS, where I got a solid foundation in Business Intelligence, and then I dove into the world of AI-driven solutions during my internship at Vision Verse Interactive. I’ve recently completed my Master’s in Data Science from RMIT University. 🎓
<br /><br />
I enjoy building scalable data pipelines, automating workflows, and diving deep into Azure Cloud. Whether it’s coding with Python, playing with data in Python, designing ETL pipelines, or integrating AI-powered solutions, I’m always looking for exciting challenges! Currently, I’m upskilling with an Azure certification to deepen my cloud expertise.
<br /><br />
When I’m not coding, you’ll find me on a mission to discover Melbourne’s best desserts 🍰🍩, trying out new food spots, or just aimlessly wandering the city like a true foodie. I also enjoy a good game night 🎮 and occasionally get lost in the world of tech experiments.
            <br /><br />
            So, if you're up for a chat about tech, data, or just want to share your latest travel finds, feel free to connect! 🚀

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

          {/* <p style={{ color: "rgb(155 126 172)" }}>
            "Keep calm and let data do the talking" 😎
          </p>
          <footer className="blockquote-footer">Vignesh Kumar</footer> */}
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
