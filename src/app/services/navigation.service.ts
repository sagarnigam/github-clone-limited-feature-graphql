import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) {}

  navigateByURL(url: string, params: any): void {
    this.router.navigate([url, ...params]);
  }
}
