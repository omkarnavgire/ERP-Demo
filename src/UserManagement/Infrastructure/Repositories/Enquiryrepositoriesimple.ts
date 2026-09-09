import { inject, Injectable } from "@angular/core";
import { EnquiryFollowupRepositories } from "../../Domain/Repositories/Enquiryfollowuprepositories";
import { EnquiryFollowupApi } from "../Api/EnquiryFollowupApi";
import { Observable } from "rxjs";
import { EnquiryFollowup } from "../../Domain/Entities/Enquiryfollowup";
@Injectable({
    providedIn:'root'
})
export class EnquiryRepositoriesimple implements EnquiryFollowupRepositories{
    private api = inject(EnquiryFollowupApi)
    
    getFollowups(): Observable<EnquiryFollowup[]> {
        return this.api.getFollowups();
    }
    getFollowupById(id: number): Observable<EnquiryFollowup> {
        return this.api.getFollowupById(id);
    }
    createFollowup(followup: EnquiryFollowup): Observable<EnquiryFollowup> {
        return this.api.createFollowup(followup);
    }
    updateFollowup(id: number, followup: EnquiryFollowup): Observable<EnquiryFollowup> {
        return this.api.updateFollowup(id,followup);
    }
    deleteFollowup(id: number): Observable<void> {
        return this.api.deleteFollowup(id);
    }
    restoreFollowup(id: number): Observable<void> {
        return this.api.restoreFollowup(id);
    }

}