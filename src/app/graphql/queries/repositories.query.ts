import { gql } from 'apollo-angular';

export const GET_REPOSITORIES_QUERY = gql`
query($searchQuery: String!, $type: SearchType!, $repoCountRequired:Int, $after: String, $before: String) {
    search(query: $searchQuery, type: $type, first: $repoCountRequired, after: $after, before: $before) {
      repositoryCount
      pageInfo {
        startCursor
        endCursor
      }
      edges {
        node {
          ... on Repository {
            id
            name
            forkCount
            stargazerCount
            url
            owner {
              login
            }
          }
        }
      }
    }
  }
`;
