import { Observable } from "rxjs";
import { EnquiryFollowupRepositories } from "../../Domain/Repositories/Enquiryfollowuprepositories";

export class restoreFollowup{
    constructor(
        private repository: EnquiryFollowupRepositories
    ){}

    execute(id: number): Observable<void>{
        return this.repository.restoreFollowup(id);
    }
}