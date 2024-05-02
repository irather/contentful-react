export const HOME_PAGE_QUERY = `
{
  pageCollection(where: { isHome: true }) {
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
          ... on ContentBlock {
            __typename
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
          
          ... on Accordian {
            __typename
            title
            onlySingle
            accordianPanelsCollection {
              items {
                title
                description {
                  json
                }
              }
            }
          }

          ... on Video {
            __typename
            title
            videoId
            videoType
          }

          ... on Cta {
            __typename
            label
            url

          }
          
        }
      }
    }
  }
}
`;

export const NAVBAR_QUERY = `
{
  pageCollection(where: { showInNav: true }) {
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
    }
  }
}
`;

export const PAGE_BY_TITLE_QUERY = (title) => `
{
    pageCollection(where: { title: "${title}" }) {
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
            ... on ContentBlock {
              __typename
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
            
            ... on Accordian {
              __typename
              title
              onlySingle
              accordianPanelsCollection {
                items {
                  title
                  description {
                    json
                  }
                }
              }
            }

            ... on Video {
              __typename
              title
              videoId
              videoType
            }

            ... on Cta {
              __typename
              label
              url

            }
            
          }
        }
      }
    }
  }
`;

export const fetchGraphQL = async (query) => {
  try {
    const spaceID = process.env.REACT_APP_SPACE_ID;
    const url = `https://graphql.contentful.com/content/v1/spaces/${spaceID}/`;

    const response = await window.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.REACT_APP_ACCESS_TOKEN,
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
