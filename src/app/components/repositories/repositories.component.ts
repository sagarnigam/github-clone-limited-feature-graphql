import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, Subject, takeUntil } from 'rxjs';

import { NavigationService } from '../../services/navigation.service';
import {
  ACCESS_FORM_URL,
  REPOSITORY_URL,
  REPO_COUNT,
  SEARCH_QUERY,
  TPYE,
} from '../../contants/contants';
import { RepositoryService } from '../../services/repository.service';
import { SearchQuery } from '../../models/search-query.model';
import { PageInfo } from '../../models/page-info';

@Component({
  selector: 'app-respositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {
  isResultsLoading$ = this.repositoryService.isRepoResultsLoading$;

  displayedColumns: string[] = ['name', 'owner', 'stargrazer'];
  dataSource = new MatTableDataSource<any>([]);

  resultsLength = 0;

  private startCursor: string | null = null;
  private endCursor: string | null = null;
  private unsubscribeSubscription$ = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private navigationService: NavigationService,
    private repositoryService: RepositoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.paginator.page.pipe(startWith({})).subscribe((page) => {
      this.assignTableData(page);
      this.cdr.detectChanges();
    });
  }

  assignTableData(page: any) {
    this.repositoryService.updateSpinner('repository', true);


    let searchParams: SearchQuery = {
      searchQuery: SEARCH_QUERY,
      repoCountRequired: REPO_COUNT,
      type: TPYE,
      after: page.pageIndex > page.previousPageIndex ? this.endCursor : null ,
      before: page.pageIndex < page.previousPageIndex ? this.startCursor : null,
    }

    this.repositoryService
      .getRepositories(searchParams)
      .pipe(takeUntil(this.unsubscribeSubscription$))
      .subscribe((repos) => {
        this.assignPageInfo(repos.data.search.pageInfo);
        this.dataSource.data = repos.data.search.edges;
        this.resultsLength = repos.data.search.repositoryCount;
        this.repositoryService.updateSpinner('repository', false);
      });
  }

  assignPageInfo(pageInfo: PageInfo):void {
    this.endCursor = pageInfo.endCursor;
    this.startCursor = pageInfo.startCursor;
  }

  navigateToRepoDetails(row: any) {
    this.navigationService.navigateByURL(REPOSITORY_URL, [
      row.node.owner.login,
      row.node.name,
    ]);
  }

  changeApiToken(): void {
    this.repositoryService.userAccessToken = '';
    this.navigationService.navigateByURL(ACCESS_FORM_URL, []);
  }

  ngOnDestroy(): void {
    this.unsubscribeSubscription$.next(0);
    this.unsubscribeSubscription$.complete();
  }
}
