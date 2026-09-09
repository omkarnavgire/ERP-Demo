// import { inject, Injectable } from "@angular/core";
// import { LeadApi } from "../Api/LeadApi";
// import { Observable } from "rxjs";
// import { Lead } from "../../Domain/Entities/Lead";
// import { LeadRepository } from "../../Domain/Repositories/Leadrepository";

// @Injectable({
//     providedIn:'root'
// })
// export class LeadRepositoryImple implements LeadRepository{
//     private leadApi=inject(LeadApi);

//     getLeads(): Observable<Lead[]>{
//         return this.leadApi.getLeads();
//     }
//     getLeadById(id: number): Observable<Lead> {
//         return this.leadApi.getLeadById(id);
//     }

//     createLead(lead: Lead): Observable<Lead> {
//         return this.leadApi.createLead(lead);
//     }

//     updateLead(id: number, lead: Lead): Observable<Lead> {
//         return this.leadApi.updateLead(id, lead);
//     }

//     deleteLead(id: number): Observable<void> {
//         return this.leadApi.deleteLead(id);
//     }

//     restoreLead(id: number): Observable<void> {
//         return this.leadApi.restoreLead(id);
//     }
// }