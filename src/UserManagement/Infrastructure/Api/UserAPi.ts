import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,map } from "rxjs";
import { User } from "../../Domain/Entities/User";

@Injectable({
    providedIn:"root"
})
export class UserApi {
    private baseUrl=
        "https://superuser.ciitstudent.com/api/User";

    constructor(private http:HttpClient){}

    getAllUsers():Observable<User[]> {
        console.log("Get all users API called");

        return this.http.get<any>(
            `${this.baseUrl}/get-all-users`
        ).pipe(
            map(response=>{
                return response?.data??[];
            })
        );
    }
}