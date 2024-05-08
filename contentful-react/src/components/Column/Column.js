import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContentBlocks from "../ContentBlocks/ContentBlocks";
import { fetchGraphQL, COLUMN_QUERY } from "../../services/contentfulService";

function Column({ model, keyIndex, columnID }) {
  const [columnContent, setColumnContent] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchColumnData() {
      const fetchedData = await fetchGraphQL(COLUMN_QUERY(columnID));
      setData(fetchedData);
    }

    fetchColumnData();
  }, []);

  useEffect(() => {
    if (!data) return;

    const {
      columbCollection: { items },
    } = data;
    const currentColumn = items.find((item) => item.columnId === columnID);

    if (!currentColumn) return;

    const { noOfColumns } = currentColumn;

    if (noOfColumns === 1) {
      setColumnContent(currentColumn.c1ContentBlockCollection);
    } else if (noOfColumns === 2) {
      const c1Content = currentColumn.c1ContentBlockCollection;
      const c2Content = currentColumn.c2ContentBlockCollection;
      setColumnContent([c1Content, c2Content]);
    } else if (noOfColumns === 3) {
      const c1Content = currentColumn.c1ContentBlockCollection;
      const c2Content = currentColumn.c2ContentBlockCollection;
      const c3Content = currentColumn.c3ContentBlockCollection;
      setColumnContent([c1Content, c2Content, c3Content]);
    }
  }, [data, columnID]);

  if (!columnContent) {
    return "Loading...";
  }

  return (
    <Container key={keyIndex}>
      <h2>Column</h2>
      <Row>
        {model.noOfColumns === 2 || model.noOfColumns === 3 ? (
          columnContent.map((content, index) => (
            <Col key={index}>
              <ContentBlocks components={content.items} />
            </Col>
          ))
        ) : (
          <Col>
            <ContentBlocks components={columnContent.items} />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Column;
