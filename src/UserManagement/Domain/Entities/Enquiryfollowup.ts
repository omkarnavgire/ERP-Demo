export interface EnquiryFollowup{
    followupId:number;
    enquiryId:number;
    followUpDate:Date;
    followUpBy:string;
    description:string;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:null;
    restoredAt:Date;
}