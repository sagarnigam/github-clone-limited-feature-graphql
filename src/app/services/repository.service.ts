import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, catchError, Observable } from 'rxjs';

import { GET_REPOSITORIES_QUERY } from '../graphql/queries/repositories.query';
import { REPOSITORY_DETAILS_QUERY } from '../graphql/queries/repository-details.query';
import { SearchQuery } from '../models/search-query.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  userAccessToken: string = '';
  isUserLoading$ = new BehaviorSubject<boolean>(false);
  isIssuesLoading$ = new BehaviorSubject<boolean>(false);
  isRepoResultsLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private apollo: Apollo, private http: HttpClient) {}

  updateSpinner(type: string, status: boolean): void {
    if (type === 'user') {
      this.isUserLoading$.next(status);
    } else if (type === 'repository') {
      this.isRepoResultsLoading$.next(status);
    } else if (type === 'issue') {
      this.isRepoResultsLoading$.next(status);
    }
  }

  validateToken(accessToken: string): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get('https://api.github.com/users', { headers: header });
  }

  getRepositories(searchParams: SearchQuery): Observable<any> {
    return this.apollo
      .watchQuery({
        query: GET_REPOSITORIES_QUERY,
        variables: {
          searchQuery: searchParams.searchQuery,
          repoCountRequired: searchParams.repoCountRequired,
          type: searchParams.type,
          before: searchParams.before,
          after: searchParams.after,
        },
        context: {
          headers: {
            authorization: `Bearer ${this.userAccessToken}`,
          },
        },
      })
      .valueChanges.pipe(
        catchError((err) => {
          return err;
        })
      );
  }

  getRepositoryDetails(params: Params): Observable<any> {
    return this.apollo
      .watchQuery({
        query: REPOSITORY_DETAILS_QUERY,
        variables: {
          repoName: params['repositoryName'],
          ownerName: params['owner'],
        },
        context: {
          headers: {
            authorization: `Bearer ${this.userAccessToken}`,
          },
        },
      })
      .valueChanges.pipe(
        catchError((err) => {
          return err;
        })
      );
  }
}
