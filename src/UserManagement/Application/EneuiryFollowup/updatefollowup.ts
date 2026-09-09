import { Observable } from "rxjs";
import { EnquiryFollowup } from "../../Domain/Entities/Enquiryfollowup";
import { EnquiryFollowupRepositories } from "../../Domain/Repositories/Enquiryfollowuprepositories";

export class updateFollowup{
    constructor(
        private repository: EnquiryFollowupRepositories
    ){}

    execute(
        id: number,
        followup:EnquiryFollowup
    ): Observable<EnquiryFollowup> {
        return this.repository.updateFollowup(id, followup);
    }
}