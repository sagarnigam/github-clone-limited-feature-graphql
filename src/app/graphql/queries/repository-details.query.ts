import { gql } from "apollo-angular";

export const REPOSITORY_DETAILS_QUERY =  gql`
 query($repoName: String!, $ownerName: String!) {
  repository(name: $repoName, owner: $ownerName) {
    name
    owner {
      login
    }
    description
    forkCount
    stargazerCount
    issues(first: 10, orderBy: {
      field:  CREATED_AT
      direction: DESC
    }) {
      edges{
        node {
          number
          body
          createdAt
        }
      }
    }
  }
}
`