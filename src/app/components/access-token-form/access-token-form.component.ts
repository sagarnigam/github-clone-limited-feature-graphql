import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, take, throwError } from 'rxjs';

import { ACCESS_TOKEN, REPOSITORIES_URL } from '../../contants/contants';
import { RepositoryService } from '../../services/repository.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-access-token-form',
  templateUrl: './access-token-form.component.html',
  styleUrls: ['./access-token-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessTokenFormComponent implements OnInit {
  isUserValid: boolean = false;
  token: string = ACCESS_TOKEN;
  errorMessage: string = '';

  isUserLoading$ = this.repositoryService.isUserLoading$;

  accessTokenForm: FormGroup = new FormGroup({
    accessToken: new FormControl(''),
  });

  constructor(
    private navigationService: NavigationService,
    private repositoryService: RepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accessTokenForm.valueChanges.subscribe(data => this.errorMessage = '');
  }

  submit(): void {
    this.repositoryService.updateSpinner('user', true);
    this.repositoryService
      .validateToken(this.accessTokenForm.value.accessToken)
      .pipe(
        take(1),
        catchError((error) => {
          this.assignErrorMessgae(error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.repositoryService.userAccessToken =
          this.accessTokenForm.value.accessToken;
        this.repositoryService.updateSpinner('user', false);

        // navigate to repositories page
        this.navigationService.navigateByURL(REPOSITORIES_URL, [])
      });
  }

  private assignErrorMessgae(error: any): void {
    this.errorMessage = error.error.message;
    this.repositoryService.updateSpinner('user', false);
  }
}
