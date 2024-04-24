import React from "react";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { fetchGraphQL, CONTENT_BLOCK_QUERY } from "../services/contentfulService";

function ContentBlock({ pageTitle }) {
  const [page, setPage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchContentBlock() {
      setData(await fetchGraphQL(CONTENT_BLOCK_QUERY));
    }
    if (!data) {
      fetchContentBlock();
    }
  }, [pageTitle, data]);

  useEffect(() => {
    if (!data) return;

    const selectedPage = data.pageCollection.items.find((page) => page.title === pageTitle);
    if (selectedPage && selectedPage.contentBlocksCollection) {
      setPage(selectedPage.contentBlocksCollection.items);
    }
  }, [pageTitle, data]);

  if (!page) {
    return "Loading...";
  }

  return (
    <div>
      {page.map((page, pageIndex) => (
        <div key={pageIndex}>
          <h3>{page.title}</h3>
          <img src={page.image.url} className="App-logo" alt="logo" />
          {documentToReactComponents(page.description.json)}
          <div>
            {page.ctasCollection.items.map((cta, ctaIndex) => (
              <a key={ctaIndex} href={cta.url}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContentBlock;
