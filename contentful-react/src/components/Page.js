import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentBlock from "./ContentBlock";
import { fetchGraphQL, PAGE_BY_TITLE_QUERY } from "../services/contentfulService";

function Page() {
  const { title } = useParams();
  const [page, setPage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      setData(await fetchGraphQL(PAGE_BY_TITLE_QUERY(title)));
    }

    fetchPage();
  }, [title]);

  useEffect(() => {
    if (!data) return;

    setPage(data.pageCollection.items[0]);
  }, [data]);

  if (!page) {
    return "Loading...";
  }

  return (
    <div>
      <img src={page.logo.url} className="App-logo" alt="logo" />
      <p>{page.title}</p>
      <div>{documentToReactComponents(page.description.json)}</div>
      <ContentBlock pageTitle={page.title} />
      <Link to={`/`}>Back</Link>
    </div>
  );
}

export default Page;
