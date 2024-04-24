import React from "react";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { fetchGraphQL } from "../services/contentfulService";

const query = `
{
    pageCollection {
      items {
        title
        logo {
          url
        }
        description {
          json
        }
        enabled
        showInNav
        isHome
        contentBlocksCollection {
          items {
            title
            description {
              json
            }
            image {
              url
            }
            ctasCollection {
              items {
                label
                url
              }
            }
          }
        }
      }
    }
  }
`;

function ContentBlock({ pageTitle }) {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/rldg8r016az8/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 2nrUAKU_riqU97kryqgu9Bsu1dmmIQzm9tefdPsoS6k",
        },
        body: JSON.stringify({ query }),
      })
      .then((res) => res.json())
      .then(({ data, err }) => {
        if (err) {
          console.error(err);
        }
        const selectedPage = data.pageCollection.items.find((page) => page.title === pageTitle);
        if (selectedPage && selectedPage.contentBlocksCollection) {
          setPage(selectedPage.contentBlocksCollection.items);
        }
      });
  }, [pageTitle]);

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
