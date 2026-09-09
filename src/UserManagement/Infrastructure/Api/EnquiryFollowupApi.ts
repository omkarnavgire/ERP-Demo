import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EnquiryFollowup } from "../../Domain/Entities/Enquiryfollowup";

@Injectable({
    providedIn:'root'
})
export class EnquiryFollowupApi{
    private http = inject(HttpClient);

    private readonly baseUrl='https://leadapis.ciitstudent.com/api/EnquiryFollowup';

    getFollowups(): Observable<EnquiryFollowup[]> {
        return this.http.get<EnquiryFollowup[]>(this.baseUrl);
    }

    getFollowupById(id: number): Observable<EnquiryFollowup> {
        return this.http.get<EnquiryFollowup>(`${this.baseUrl}/${id}`);
    }

  
    createFollowup(followup: EnquiryFollowup): Observable<EnquiryFollowup> {
        return this.http.post<EnquiryFollowup>(this.baseUrl,followup);
    }

  
    updateFollowup(id: number,followup: EnquiryFollowup): Observable<EnquiryFollowup> {
        return this.http.put<EnquiryFollowup>(`${this.baseUrl}/${id}`,followup);
    }


    deleteFollowup(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    restoreFollowup(id: number): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/restore/${id}`,{});
    }
}