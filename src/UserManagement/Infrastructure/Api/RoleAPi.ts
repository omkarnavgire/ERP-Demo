import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable,map} from "rxjs";
import {Role} from "../../Domain/Entities/Role";

@Injectable({
    providedIn:"root"
})
export class RoleApi {
    private baseUrl="https://superuser.ciitstudent.com/api/roles/get-roles";

    constructor(private http:HttpClient){}

    getAllRoles():Observable<Role[]> {
        console.log("Loading roles from:",this.baseUrl);

        return this.http
            .get<any>(this.baseUrl)
            .pipe(
                map(response=>{
                    console.log("Roles API raw response:",response);

                    if(Array.isArray(response)){
                        return response;
                    }

                    if(Array.isArray(response?.data)){
                        return response.data;
                    }

                    if(Array.isArray(response?.result)){
                        return response.result;
                    }

                    if(Array.isArray(response?.items)){
                        return response.items;
                    }

                    return [];
                })
            );
    }
}