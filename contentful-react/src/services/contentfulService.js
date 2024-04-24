const API_URL = `https://graphql.contentful.com/content/v1/spaces/rldg8r016az8/`;
const AUTH_TOKEN = "Bearer 2nrUAKU_riqU97kryqgu9Bsu1dmmIQzm9tefdPsoS6k";

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

export const fetchGraphQL = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN,
      },
      body: JSON.stringify({ query }),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
