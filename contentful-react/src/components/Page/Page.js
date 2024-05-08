import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PageContent from "../PageContent/PageContent";
import { fetchGraphQL, PAGE_BY_TITLE_QUERY, HOME_PAGE_QUERY } from "../../services/contentfulService";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/page.css";

function Page({ homeFlag }) {
  const { title } = useParams();
  const [currentPage, setCurrentPage] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      if (homeFlag === true) {
        const fetchedData = await fetchGraphQL(HOME_PAGE_QUERY);
        setData(fetchedData);
      } else {
        const fetchedData = await fetchGraphQL(PAGE_BY_TITLE_QUERY(title));
        setData(fetchedData);
      }

      setLoading(false);
    }

    fetchPage();
  }, [title, homeFlag]);

  useEffect(() => {
    if (!data || data.pageCollection.items.length === 0) {
      setLoading(false);
      return;
    }

    const page = data.pageCollection.items[0];
    if (!page || !page.logo || !page.logo.url) {
      setLoading(false);
      return;
    }

    setCurrentPage(page);

    setLoading(false);
  }, [data]);

  if (loading) {
    return "Loading...";
  }

  if (!currentPage) {
    return null;
  }

  return (
    <>
      {currentPage.isHome === true ? (
        <div className="home-page-container">
          <img src={currentPage.logo.url} className="home-page-image" alt="logo" />
        </div>
      ) : (
        <div className="home-page-container">
          <img src={currentPage.logo.url} className="page-image" alt="logo" />
        </div>
      )}
      <Container className="home-content-container">
        <Row>
          <Col>
            <div className="home-page-container">
              {currentPage.title && (
                <div className="home-page-title">
                  <h1>{currentPage.title}</h1>
                </div>
              )}
            </div>
            {currentPage.description && currentPage.description.json && <div className="description">{documentToReactComponents(currentPage.description.json)}</div>}
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
