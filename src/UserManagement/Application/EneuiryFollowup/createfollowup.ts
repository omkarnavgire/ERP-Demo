import { Observable } from "rxjs";
import { EnquiryFollowup } from "../../Domain/Entities/Enquiryfollowup";
import { EnquiryFollowupRepositories } from "../../Domain/Repositories/Enquiryfollowuprepositories";

export class createFollowup{
    constructor(
        private repository: EnquiryFollowupRepositories
    ){}

    execute(followup:EnquiryFollowup):Observable<EnquiryFollowup>{
        return this.repository.createFollowup(followup);
    }
}