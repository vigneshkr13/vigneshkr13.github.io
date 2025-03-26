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

        <Row className="resume" style={{ justifyContent: "center" }}>
          <div
            className="d-flex justify-content-center"
            style={{
              width: "80%", // Full width of the container
              maxWidth: "140%", // Set maxWidth to 100% to make it more flexible
            }}
          >
            <iframe
              src={pdfWithParams}
              width="100%" // Occupy full width of the container
              height="1300px" // Increased height for a larger PDF view
              style={{
                border: "none",
                overflow: "hidden",
                width: "100%", // Ensures the iframe stretches across the container
                maxWidth: "100%", // Keeps it responsive
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
