import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable,map,shareReplay } from "rxjs";
import { User } from "../../Domain/Entities/User";

@Injectable({
    providedIn:"root"
})
export class UserApi {
    private baseUrl=
        "https://superuser.ciitstudent.com/api/User";

    private usersCache$:Observable<User[]>|null=null;

    constructor(private http:HttpClient){}

    getAllUsers():Observable<User[]> {

        if(!this.usersCache$){

            console.log("Get all users API called");

            this.usersCache$=this.http.get<any>(
                `${this.baseUrl}/get-all-users`
            ).pipe(
                map(response=>{
                    return response?.data??[];
                }),
                shareReplay(1)
            );
        }

        return this.usersCache$;
    }

    clearUsersCache():void {
        this.usersCache$=null;
    }
}