import { Observable } from "rxjs";
import { EnquiryFollowupRepositories } from "../../Domain/Repositories/Enquiryfollowuprepositories";
import { EnquiryFollowup } from "../../Domain/Entities/Enquiryfollowup";

export class getFollowupById{
    constructor(
        private repository: EnquiryFollowupRepositories
    ){}

    execute(id: number): Observable<EnquiryFollowup>{
        return this.repository.getFollowupById(id);
    }
}