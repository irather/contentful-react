import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const query = `
{
  pageCollection {
    items {
      title
      description {
        json
      }
      logo {
        url
      }
      enabled
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

        setPage(data.pageCollection.items.filter((page) => page.enabled));
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  return (
    <ul>
      {page.map((page) => (
        <li key={page.title}>
          <Link to={`/page/${page.title}`}>{page.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Home;
