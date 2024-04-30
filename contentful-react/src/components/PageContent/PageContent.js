import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import CTA from "../CTA/CTA";
import ContentBlock from "../ContentBlock/ContentBlock";
import "./styles/pageContent.css";

function PageContent({ contentBlocks }) {
  const [pageComponents, setPageComponents] = useState(null);

  useEffect(() => {
    if (!contentBlocks || !contentBlocks.items) return;

    setPageComponents(contentBlocks.items);
  }, [contentBlocks]);

  if (!pageComponents) {
    return "Loading...";
  }

  return (
    <>
      <Row>
        <Col>
          {pageComponents.map((model, keyIndex) => {
            if (model.__typename === "ContentBlock") {
              return <ContentBlock model={model} keyIndex={keyIndex} />;
            }

            if (model.__typename === "Cta") {
              return <CTA model={model} keyIndex={keyIndex} />;
            }
          })}
        </Col>
      </Row>
    </>
  );
}

export default PageContent;
