import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import CTA from "../CTA/CTA";
import "./styles/contentBlock.css";

function ContentBlock({ model, keyIndex }) {
  return (
    <>
      <Container key={keyIndex}>
        <Row className="justify-content-center align-items-center">
          <Col md={6}>
            <img src={model.image.url} className="content-block-image" alt="logo" />
          </Col>
          <Col md={6}>
            <div className="title">
              <h2>{model.title}</h2>
            </div>
            <div className="description">{documentToReactComponents(model.description.json)}</div>
          </Col>
          <Col md={12} className="cta-button-row">
            {model.ctasCollection.items.map((cta, keyIndex) => (
              <CTA keyIndex={keyIndex} model={cta} />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContentBlock;
