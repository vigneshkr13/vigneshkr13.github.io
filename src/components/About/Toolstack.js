import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiPostman,
  SiSlack,
  SiVercel,
  SiMacos,
  SiGit,
  SiMicrosoftazure,
  SiDatabricks,
  SiSnowflake,
  SiKubernetes,
  SiOracle,
  SiJira,
  SiPowerbi,
  SiDocker,
  SiInformatica,
  SiJupyter, // Added Jupyter icon
} from "react-icons/si";
import { FaAws, FaWindows } from "react-icons/fa";

// Custom icon for Informatica (using a generic database icon as a placeholder)
const InformaticaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h4v-4H9v4zm0 5h4v-4H9v4zM9 9h4V5H9v4zm5-5v4h4V4h-4zm0 5v4h4V9h-4zm0 5v4h4v-4h-4zm0 5v4h4v-4h-4z"/>
  </svg>
);

// Tooltip Wrapper Function
const renderTooltip = (props, text) => <Tooltip {...props}>{text}</Tooltip>;

function Toolstack() {
  const tools = [
    { icon: <SiVisualstudiocode />, name: "Visual Studio Code" },
    { icon: <SiMicrosoftazure />, name: "Microsoft Azure" },
    { icon: <SiSlack />, name: "Slack" },
    { icon: <SiGit />, name: "Git" },
    { icon: <SiJupyter />, name: "Jupyter Notebook" },
    { icon: <SiInformatica />, name: "Informatica" },
    { icon: <SiDatabricks />, name: "Databricks" },
    { icon: <SiOracle />, name: "Oracle" },
    { icon: <SiJira />, name: "Jira" },
    { icon: <SiPowerbi />, name: "Power BI" },

  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map((tool, index) => (
        <Col xs={4} md={2} className="tech-icons" key={index}>
          <OverlayTrigger 
            placement="top" 
            overlay={(props) => renderTooltip(props, tool.name)}
          >
            <div>{tool.icon}</div>
          </OverlayTrigger>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;