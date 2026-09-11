import {HttpClient} from '@angular/common/http';
import {inject,Injectable} from '@angular/core';
import {map,Observable} from 'rxjs';
import {EnquiryFollowup} from '../../Domain/Entities/Eneuiryfollowup';

@Injectable({
    providedIn:'root'
})
export class EnquiryFollowupApi {
    private http=inject(HttpClient);
    private readonly baseUrl='/lead-api/EnquiryFollowup';

    getFollowups():Observable<EnquiryFollowup[]> {
        console.log('Enquiry Followup API: Get all');
        return this.http.get<any[]>(this.baseUrl).pipe(
            map(response=>response.map(item=>({
                followupId:item.followupId,
                candidateName:item.candidateName||'',
                followupBy:item.followUpBy||'',
                followupDate:item.followUpDate,
                followupType:item.followupType||'',
                description:item.description||''
            })))
        );
    }

    getFollowupsByEnquiryId(enquiryId:number):Observable<EnquiryFollowup[]> {
        console.log('Enquiry Followup API: Get by Enquiry ID:',enquiryId);
        return this.http.get<any[]>(`${this.baseUrl}/enquiry/${enquiryId}`).pipe(
            map(response=>response.map(item=>({
                followupId:item.followupId,
                candidateName:item.candidateName||'',
                followupBy:item.followUpBy||'',
                followupDate:item.followUpDate,
                followupType:item.followupType||'',
                description:item.description||''
            })))
        );
    }

    getFollowupById(id:number):Observable<EnquiryFollowup> {
        console.log('Enquiry Followup API: Get by ID:',id);
        return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
            map(item=>({
                followupId:item.followupId,
                candidateName:item.candidateName||'',
                followupBy:item.followUpBy||'',
                followupDate:item.followUpDate,
                followupType:item.followupType||'',
                description:item.description||''
            }))
        );
    }

    createFollowup(followup:EnquiryFollowup):Observable<EnquiryFollowup> {
        console.log('Enquiry Followup API: Create:',followup);
        return this.http.post<EnquiryFollowup>(`${this.baseUrl}/Create`,followup);
    }

    updateFollowup(id:number,followup:EnquiryFollowup):Observable<EnquiryFollowup> {
        console.log('Enquiry Followup API: Update:',id,followup);
        return this.http.put<EnquiryFollowup>(`${this.baseUrl}/Update/${id}`,followup);
    }

    deleteFollowup(id:number):Observable<void> {
        console.log('Enquiry Followup API: Delete:',id);
        return this.http.delete<void>(`${this.baseUrl}/Delete/${id}`);
    }

    restoreFollowup(id:number):Observable<void> {
        console.log('Enquiry Followup API: Restore:',id);
        return this.http.put<void>(`${this.baseUrl}/restore/${id}`,{});
    }
}