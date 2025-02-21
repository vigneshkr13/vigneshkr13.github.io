import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
        Hi Everyone, I am <span className="purple">Vignesh Kumar</span> from <span className="purple">Salem</span>.
        <br />
        I’ve recently graduated with a Master’s in Data Science from RMIT University, Australia.
        <br />
        Currently, I’m looking for a full-time role in Data Science/Software Engineering while freelancing and sharpening my skills in the meantime.
        <br />
        <br />
        When I'm not coding, you can find me experimenting with new tech, catching up on the latest industry trends, or enjoying a good cup of coffee.
    </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Writing Tech Blogs
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Meow Meow Meow"{" "}
          </p>
          <footer className="blockquote-footer">Vignesh Kumar</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
