import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchGraphQL, NAVBAR_QUERY } from "../services/contentfulService";

function Navbar() {
  const [page, setPage] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchNavBar() {
      setData(await fetchGraphQL(NAVBAR_QUERY));
    }

    fetchNavBar();
  }, []);

  useEffect(() => {
    if (!data) return;
    setPage(data.pageCollection.items.filter((page) => page.showInNav));
  }, [data]);

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

export default Navbar;
