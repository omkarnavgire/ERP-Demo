import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    setAccessToken(token: string): void {
        localStorage.setItem('accessToken', token);
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    setRefreshToken(refreshToken: string): void {
        localStorage.setItem('refreshToken', refreshToken);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    clearToken(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    isLoggedIn(): boolean {
        return !!this.getAccessToken();
    }
}
