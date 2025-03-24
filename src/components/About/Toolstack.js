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
} from "react-icons/si";
import { FaAws, FaWindows } from "react-icons/fa";

// Tooltip Wrapper Function
const renderTooltip = (props, text) => <Tooltip {...props}>{text}</Tooltip>;

function Toolstack() {
  const tools = [
    // { icon: <SiMacos />, name: "macOS" },
    { icon: <SiVisualstudiocode />, name: "Visual Studio Code" },
    // { icon: <SiPostman />, name: "Postman" },
    { icon: <SiSlack />, name: "Slack" },
    // { icon: <SiVercel />, name: "Vercel" },
    { icon: <FaAws />, name: "AWS" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiGit />, name: "Git" },
    { icon: <SiMicrosoftazure />, name: "Microsoft Azure" },
    { icon: <SiDatabricks />, name: "Databricks" },
    { icon: <SiSnowflake />, name: "Snowflake" },
    { icon: <SiKubernetes />, name: "Kubernetes" },
    { icon: <SiOracle />, name: "Oracle" },
    { icon: <SiJira />, name: "Jira" },
    { icon: <SiPowerbi />, name: "Power BI" },
    { icon: <FaWindows />, name: "Windows" },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map((tool, index) => (
        <Col xs={4} md={2} className="tech-icons" key={index}>
          <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, tool.name)}>
            <div>{tool.icon}</div>
          </OverlayTrigger>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
