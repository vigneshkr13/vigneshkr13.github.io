import React from "react";
import { Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DiPython, DiJava, DiJavascript1, DiNodejs, DiGit, DiPostgresql } from "react-icons/di";
import { SiR, SiPowerbi, SiMicrosoftazure, SiAmazonaws, SiSnowflake, SiApachekafka, SiApachespark, SiHadoop, SiTalend, SiInformatica, SiFlask, SiGraphql, SiNextdotjs ,SiPostgresql} from "react-icons/si";
import { FaHtml5, FaCss3Alt, FaAws, FaDatabase } from "react-icons/fa";
import { TbApi, TbBrandDatabricks } from "react-icons/tb";
import { GrReactjs } from "react-icons/gr";

// Tooltip Wrapper Function
const renderTooltip = (props, text) => <Tooltip {...props}>{text}</Tooltip>;

function Techstack() {
  const techStack = [
    { icon: <DiPython />, name: "Python" },
    { icon: <DiJava />, name: "Java" },
    { icon: <DiJavascript1 />, name: "JavaScript" },
    { icon: <FaDatabase />, name: "Database" },
    { icon: <SiR />, name: "R" },
    { icon: <DiNodejs />, name: "Node.js" },
    { icon: <SiInformatica />, name: "Informatica" },
    { icon: <DiGit />, name: "Git" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiPowerbi />, name: "Power BI" },
    { icon: <SiMicrosoftazure />, name: "Microsoft Azure" },
    { icon: <SiAmazonaws />, name: "AWS" },
    // { icon: <SiSnowflake />, name: "Snowflake" },
    // { icon: <SiApachekafka />, name: "Apache Kafka" },
    { icon: <SiApachespark />, name: "Apache Spark" },
    // { icon: <FaDatabase />, name: "Hadoop" },
    // { icon: <SiTalend />, name: "Talend" },
    { icon: <TbBrandDatabricks />, name: "Databricks" },

    { icon: <SiFlask />, name: "Flask" },
    { icon: <SiGraphql />, name: "GraphQL" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <FaHtml5 />, name: "HTML5" },
    // { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <GrReactjs />, name: "React.js" },
    { icon: <TbApi />, name: "API" },
  ];

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {techStack.map((tech, index) => (
        <Col xs={4} md={2} className="tech-icons" key={index}>
          <OverlayTrigger placement="top" overlay={(props) => renderTooltip(props, tech.name)}>
            <div>{tech.icon}</div>
          </OverlayTrigger>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;
