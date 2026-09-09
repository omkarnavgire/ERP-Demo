import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginRequest } from "../../Domain/Entities/Auths/LoginRequest";
import { Observable } from "rxjs";
import { LoginResponse } from "../../Domain/Entities/Auths/LoginResponse";

@Injectable({
    providedIn: 'root'
})
export class AuthApi {
    private baseurl = 'https://superuser.ciitstudent.com/api/Auth/login';

    constructor(private http: HttpClient) {}

    login(request: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.baseurl, request);
    }
}
