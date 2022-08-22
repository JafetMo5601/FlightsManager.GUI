import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private tokenService: TokenStorageService,
    private route: Router
  ) {}

  canActivate(): boolean {
    return this.isAdmin();
  }

  isAdmin(): boolean {
    if (this.tokenService.getToken() === 'Admin') {
      return true;
    } else {
      this.route.navigate(['home']);
      return false;
    }
  }
  
}
