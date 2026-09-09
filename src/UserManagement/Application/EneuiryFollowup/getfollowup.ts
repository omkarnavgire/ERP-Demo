import { Observable } from "rxjs";
import { EnquiryFollowupRepositories } from "../../Domain/Repositories/Enquiryfollowuprepositories";
import { EnquiryFollowup } from "../../Domain/Entities/Enquiryfollowup";

export class GetFollowup {
    constructor(
        private repository: EnquiryFollowupRepositories
    ){}
    execute(): Observable<EnquiryFollowup[]>{
        return this.repository.getFollowups();
    }
}