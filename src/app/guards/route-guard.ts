import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { RepositoryService } from '../services/repository.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router, private repositoryService: RepositoryService) {}

  canActivate(): boolean {
    if (this.repositoryService.userAccessToken === '') {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}