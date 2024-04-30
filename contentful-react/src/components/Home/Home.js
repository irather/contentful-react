import React from "react";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PageContent from "../PageContent/PageContent";
import { fetchGraphQL, HOME_PAGE_QUERY } from "../../services/contentfulService";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/home.css";

function Home() {
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchHomePage() {
      setData(await fetchGraphQL(HOME_PAGE_QUERY));
    }

    fetchHomePage();
  }, []);

  useEffect(() => {
    if (!data) return;

    const homePage = data.pageCollection.items.find((item) => item.isHome);
    setCurrentPage(homePage);
  }, [data]);

  if (!currentPage) {
    return "Loading...";
  }

  return (
    <>
      <div className="home-page-container">
        <img src={currentPage.logo.url} className="home-page-image" alt="logo" />
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

export default Home;
