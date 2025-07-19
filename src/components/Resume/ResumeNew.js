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

        <Row className="resume" style={{ justifyContent: "center", marginTop: "20px" }}>
          <div
            className="d-flex justify-content-center"
            style={{
              width: "98%", // Maximum width for better readability
              maxWidth: "1400px", // Increased max width for larger displays
            }}
          >
            <iframe
              src={pdfWithParams}
              width="100%" // Occupy full width of the container
              height="2400px" // Significantly increased height for 2-page resume
              style={{
                border: "none",
                overflow: "hidden",
                width: "100%", // Ensures the iframe stretches across the container
                maxWidth: "100%", // Keeps it responsive
                minHeight: "100vh", // Ensures minimum viewport height coverage
                transform: "scale(1.1)", // Slightly scale up for better readability
                transformOrigin: "top center", // Scale from top center
              }}
              title="Resume"
              frameBorder="0"
            />
          </div>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px" }}>
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