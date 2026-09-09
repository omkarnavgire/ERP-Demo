import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
    providedIn:"root"
})
export class BranchApi {
    private baseUrl="https://superuser.ciitstudent.com/api/branch/get-all";

    constructor(private http:HttpClient){}

    getAllBranches():Observable<any>{
        console.log("Branch API called:",this.baseUrl);
        return this.http.get<any>(this.baseUrl);
    }
}