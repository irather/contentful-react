import React from "react";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentBlock from "./ContentBlock";
import { fetchGraphQL, HOME_PAGE_QUERY } from "../services/contentfulService";

function Home() {
  const [page, setPage] = useState(null);
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
    setPage(homePage);
  }, [data]);

  if (!page) {
    return "Loading...";
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <img src={page.logo.url} className="App-logo" alt="logo" />
      <div>{documentToReactComponents(page.description.json)}</div>
      <ContentBlock pageTitle={page.title} />
    </div>
  );
}

export default Home;
