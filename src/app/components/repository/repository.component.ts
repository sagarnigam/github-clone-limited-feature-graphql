import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { NavigationService } from '../../services/navigation.service';
import { RepositoryDetails } from '../../models/repository-details.model';
import { RepositoryService } from '../../services/repository.service';
import { ACCESS_FORM_URL } from '../../contants/contants';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent implements OnInit {
  isIssuesLoading$ = this.repositoryService.isIssuesLoading$;

  displayedColumns: string[] = ['number', 'body', 'createdAt'];
  dataSource = new MatTableDataSource<any>([]);

  repoDetails: RepositoryDetails = {
    owner: '',
    repoName: '',
    repoText: '',
    fork: 0,
    stars: 0,
  };

  private unsubscribeSubscription$ = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private navigationService: NavigationService,
    private repositoryService: RepositoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.assignTableData();
  }

  assignTableData(): void {
    this.repositoryService.updateSpinner('issue', true);

    this.activatedRoute.params
      .pipe(
        takeUntil(this.unsubscribeSubscription$),
        switchMap((params) => {
          return this.repositoryService.getRepositoryDetails(params);
        })
      )
      .subscribe((repoDetails) => {
        this.assignRepoDetails(repoDetails.data.repository);
        this.dataSource.data = repoDetails.data.repository.issues.edges;
        this.dataSource.paginator = this.paginator;
        this.repositoryService.updateSpinner('issue', false);
      });
  }

  assignRepoDetails(repoDetails: any): void {
    this.repoDetails.owner = repoDetails.owner.login;
    this.repoDetails.repoName = repoDetails.name;
    this.repoDetails.repoText = repoDetails.description;
    this.repoDetails.fork = repoDetails.forkCount;
    this.repoDetails.stars = repoDetails.stargazerCount;
  }

  changeApiToken(): void {
    this.repositoryService.userAccessToken = '';
    this.navigationService.navigateByURL(ACCESS_FORM_URL, []);
  }

  ngOnDestroy() {
    this.unsubscribeSubscription$.next(0);
    this.unsubscribeSubscription$.complete();
  }
}
