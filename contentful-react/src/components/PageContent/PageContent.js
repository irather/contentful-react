import React from "react";
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ContentBlocks from "../ContentBlocks/ContentBlocks";
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
          <ContentBlocks components={pageComponents} />
        </Col>
      </Row>
    </>
  );
}

export default PageContent;
