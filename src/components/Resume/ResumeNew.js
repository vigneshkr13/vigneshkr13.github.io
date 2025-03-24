import React from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";

function ResumeNew() {
  // If your PDF is in the public folder
  const pdfPath = process.env.PUBLIC_URL + "/Vignesh_Kumar_Resume.pdf";
  
  // Add parameters to hide toolbar and other UI elements
  const pdfWithParams = `${pdfPath}#toolbar=0&navpanes=0&scrollbar=0&statusbar=0`;

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfPath}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume">
          <div className="d-flex justify-content-center" style={{ width: "50%" }}>
            <iframe
              src={pdfWithParams}
              width="140%" 
              height="1200px"
              style={{
                border: "none",
                overflow: "hidden",
                maxWidth: "2900px" // Adjust this value as needed
              }}
              title="Resume"
              frameBorder="0"
            />
          </div>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfPath}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;