import React from "react";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ContentBlock from "./ContentBlock";

function Page() {
  const { title } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const query = `
    {
        pageCollection(where: {title: "${title}"}) {
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

        setPage(data.pageCollection.items[0]);
      });
  }, [title]);

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
