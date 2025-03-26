import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  return (
    <Card 
      className="project-card-view poster-card text-center p-4 shadow-lg border rounded-lg" 
      style={{ 
        margin: "10px", 
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "20px 20px 30px rgba(0, 0, 0, 0.5)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "5px 5px 15px rgba(0, 0, 0, 0.3)"}
    >
      <div style={{ backgroundColor: "#FFFFFF", padding: "10px", borderRadius: "8px" }}>
        <Card.Img 
          variant="top" 
          src={props.imgPath} 
          alt="card-img" 
          className="project-card-img poster-img rounded" 
        />
      </div>
      <Card.Body>
        <Card.Title 
          className="project-title" 
          style={{ color: "#cd5ff8", fontSize: "1.8rem", fontWeight: "bold", textTransform: "uppercase", marginTop: "15px" }}
        >
          {props.title}
        </Card.Title>
        <hr className="project-divider" />
        <Card.Text style={{ textAlign: "justify", fontSize: "1.1rem", padding: "10px" }}>
          {props.description}
        </Card.Text>
        <div className="project-buttons d-flex justify-content-center mt-4">
          {!props.isBlog && props.demoLink && (
            <Button 
              variant="outline-light" 
              href={props.demoLink} 
              target="_blank" 
              className="mx-2"
              style={{ backgroundColor: "#cd5ff8", border: "none", color: "white" }}
            >
              <CgWebsite /> &nbsp; Demo
            </Button>
          )}
        </div>
      </Card.Body>
      <Card.Footer className="text-center border-0 p-0">
        <Button 
          href={props.ghLink} 
          target="_blank" 
          className="w-100 py-3" 
          style={{ backgroundColor: "white", border: "none", color: "#cd5ff8", fontWeight: "bold", fontSize: "1.2rem" }}
        >
          <BsGithub /> &nbsp; GitHub
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCards;
