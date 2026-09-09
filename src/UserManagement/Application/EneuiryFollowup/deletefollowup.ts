import { Observable } from "rxjs";
import { EnquiryFollowupRepositories } from "../../Domain/Repositories/Enquiryfollowuprepositories";

export class deleteFollowup{
    constructor(
        private repository: EnquiryFollowupRepositories
    ){}

    execute(id: number):Observable<void>{
        return this.repository.deleteFollowup(id);
    }
}