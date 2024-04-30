import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PageContent from "../PageContent/PageContent";
import { fetchGraphQL, PAGE_BY_TITLE_QUERY } from "../../services/contentfulService";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/page.css";

function Page() {
  const { title } = useParams();
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      setData(await fetchGraphQL(PAGE_BY_TITLE_QUERY(title)));
    }

    fetchPage();
  }, [title]);

  useEffect(() => {
    if (!data) return;

    setCurrentPage(data.pageCollection.items[0]);
  }, [data]);

  if (!currentPage) {
    return "Loading...";
  }

  return (
    <>
      <div className="home-page-container">
        <img src={currentPage.logo.url} className="page-image" alt="logo" />
      </div>
      <Container className="home-content-container">
        <Row>
          <Col>
            <div className="home-page-container">
              <div className="home-page-title">
                <h1>{currentPage.title}</h1>
              </div>
            </div>

            <div className="description">{documentToReactComponents(currentPage.description.json)}</div>

            <Container className="d-flex justify-content-center align-items-center py-4">
              <PageContent contentBlocks={currentPage.contentBlocksCollection} />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Page;
