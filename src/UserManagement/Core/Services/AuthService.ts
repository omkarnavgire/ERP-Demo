import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from './TokenService'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {}

  saveLoginData(
    accessToken: string,
    refreshToken: string
  ): void {

    this.tokenService.setAccessToken(accessToken);
    this.tokenService.setRefreshToken(refreshToken);
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }

  logout(): void {

    this.tokenService.clearToken();

    this.router.navigate(['/login']);
  }
}