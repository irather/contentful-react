import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentBlock from "./ContentBlock";

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

function Home() {
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

        const homePage = data.pageCollection.items.find((item) => item.isHome);

        setPage(homePage);
      });
  }, []);

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
