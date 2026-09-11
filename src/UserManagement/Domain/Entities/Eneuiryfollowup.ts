export interface EnquiryFollowup{
    followupId:number;
    candidateName:string;
    followupBy:string;
    followupDate:Date;
    followupType:string;
    description:string;
    createdAt?:Date;
    updatedAt?:Date;
    deletedAt?:Date|null;
    restoredAt?:Date|null;
}