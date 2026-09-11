import {CommonModule} from '@angular/common';
import {Component,OnInit,inject} from '@angular/core';
import {FormBuilder,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {EnquiryFollowupApplication} from '../../../../Application/EneuiryFollowup/EnquiryFollowupApplication';
import {EnquiryFollowup} from '../../../../Domain/Entities/Eneuiryfollowup';
import {EnquiryApplication} from '../../../../Application/Enquiry/EnquiryApplication';
import {UserSessionService} from '../../../../Core/Services/UserSessionService';

@Component({
    selector:'app-followup-form',
    standalone:true,
    imports:[CommonModule,ReactiveFormsModule],
    templateUrl:'./FollowupForm.html',
    styleUrls:['./FollowupForm.css']
})
export class FollowupForm implements OnInit {
    private fb=inject(FormBuilder);
    private route=inject(ActivatedRoute);
    private router=inject(Router);
    private application=inject(EnquiryFollowupApplication);
    private enquiryApplication=inject(EnquiryApplication);
    private userSessionService=inject(UserSessionService);

    followupForm!:FormGroup;
    enquiryId:number|null=null;
    followupId:number|null=null;
    enquiry:any=null;
    followups:EnquiryFollowup[]=[];
    employeeName='';
    loading=false;
    followupsLoading=false;
    submitting=false;
    isEditMode=false;
    errormessage='';
    successmessage='';

    followupTypes:string[]=[
        'Call',
        'WhatsApp',
        'Email',
        'Meeting',
        'Visit',
        'Other'
    ];

    ngOnInit():void {
        this.employeeName=this.userSessionService.employeeName||'';
        console.log('Logged in Employee Name:',this.employeeName);

        this.createForm();

        const enquiryId=this.route.snapshot.paramMap.get('enquiryId');
        const followupId=this.route.snapshot.queryParamMap.get('followupId');

        if(enquiryId){
            this.enquiryId=Number(enquiryId);
            console.log('Followup opened for Enquiry ID:',this.enquiryId);
            this.loadEnquiry(this.enquiryId);
            this.loadFollowups();
        }

        if(followupId){
            this.followupId=Number(followupId);
            this.isEditMode=true;
            this.loadFollowup(this.followupId);
        }
    }

    createForm():void {
        this.followupForm=this.fb.group({
            candidateName:['',[Validators.required]],
            followupBy:[{value:this.employeeName,disabled:true},[Validators.required]],
            followupDate:[this.formatDateForInput(new Date()),Validators.required],
            followupType:['',Validators.required],
            description:['']
        });
    }

    loadEnquiry(id:number):void {
        this.loading=true;
        console.log('Load Enquiry for Followup:',id);

        this.enquiryApplication.getById(id).subscribe({
            next:(response:any)=>{
                console.log('Enquiry loaded for Followup:',response);
                this.enquiry=response;

                this.followupForm.patchValue({
                    candidateName:response?.candidateName||''
                });

                this.loading=false;
            },
            error:(error)=>{
                console.error('Enquiry loading error:',error);
                this.errormessage=error?.error?.message||'Enquiry load failed.';
                this.loading=false;
            }
        });
    }

    loadFollowups():void {
        if(!this.enquiryId){
            this.followups=[];
            return;
        }

        this.followupsLoading=true;
        console.log('Loading Followups for Enquiry ID:',this.enquiryId);

        this.application.getByEnquiryId(this.enquiryId).subscribe({
            next:(response)=>{
                console.log('Previous Followups loaded:',response);
                this.followups=response||[];
                this.followupsLoading=false;
            },
            error:(error)=>{
                console.error('Previous Followups loading error:',error);
                this.followups=[];
                this.followupsLoading=false;
            }
        });
    }

    loadFollowup(id:number):void {
        this.loading=true;
        console.log('Load Enquiry Followup ID:',id);

        this.application.getById(id).subscribe({
            next:(response:EnquiryFollowup)=>{
                console.log('Enquiry Followup loaded:',response);

                this.followupForm.patchValue({
                    candidateName:response.candidateName,
                    followupBy:response.followupBy,
                    followupDate:this.formatDateForInput(response.followupDate),
                    followupType:response.followupType,
                    description:response.description
                });

                this.loading=false;
            },
            error:(error)=>{
                console.error('Enquiry Followup loading error:',error);
                this.errormessage=error?.error?.message||'Followup load failed.';
                this.loading=false;
            }
        });
    }

    submit():void {
        this.errormessage='';
        this.successmessage='';

        if(this.followupForm.invalid){
            this.followupForm.markAllAsTouched();
            return;
        }

        const value=this.followupForm.getRawValue();

        const followup:EnquiryFollowup={
            followupId:this.followupId??0,
            candidateName:value.candidateName.trim(),
            followupBy:this.isEditMode?value.followupBy:this.employeeName,
            followupDate:value.followupDate,
            followupType:value.followupType,
            description:value.description?.trim()||''
        };

        console.log(this.isEditMode?'Update Enquiry Followup:':'Create Enquiry Followup:',followup);

        this.submitting=true;

        if(this.isEditMode&&this.followupId){
            this.application.update(this.followupId,followup).subscribe({
                next:(response)=>{
                    console.log('Enquiry Followup update successful:',response);
                    this.successmessage='Followup updated successfully.';
                    this.submitting=false;
                    this.router.navigate(['/main/enquiry/followup',this.enquiryId]);
                },
                error:(error)=>{
                    console.error('Enquiry Followup update error:',error);
                    this.errormessage=error?.error?.message||'Followup update failed.';
                    this.submitting=false;
                }
            });
            return;
        }

        this.application.create(followup).subscribe({
            next:(response)=>{
                console.log('Enquiry Followup create successful:',response);
                this.successmessage='Followup created successfully.';
                this.submitting=false;

                this.followupForm.patchValue({
                    followupBy:this.employeeName,
                    followupDate:this.formatDateForInput(new Date()),
                    followupType:'',
                    description:''
                });

                this.loadFollowups();
            },
            error:(error)=>{
                console.error('Enquiry Followup create error:',error);
                this.errormessage=error?.error?.message||'Followup creation failed.';
                this.submitting=false;
            }
        });
    }

    editFollowup(followup:EnquiryFollowup):void {
        console.log('Edit Followup:',followup.followupId);

        if(!this.enquiryId){
            return;
        }

        this.router.navigate(
            ['/main/enquiry/followup',this.enquiryId],
            {
                queryParams:{followupId:followup.followupId}
            }
        );
    }

    deleteFollowup(followup:EnquiryFollowup):void {
        if(!confirm(`Delete followup for ${followup.candidateName}?`)){
            return;
        }

        console.log('Delete Followup:',followup.followupId);

        this.application.delete(followup.followupId).subscribe({
            next:()=>{
                console.log('Followup deleted successfully:',followup.followupId);
                this.loadFollowups();
            },
            error:(error)=>{
                console.error('Followup delete error:',error);
                this.errormessage=error?.error?.message||'Followup delete failed.';
            }
        });
    }

    restoreFollowup(followup:EnquiryFollowup):void {
        console.log('Restore Followup:',followup.followupId);

        this.application.restore(followup.followupId).subscribe({
            next:()=>{
                console.log('Followup restored successfully:',followup.followupId);
                this.loadFollowups();
            },
            error:(error)=>{
                console.error('Followup restore error:',error);
                this.errormessage=error?.error?.message||'Followup restore failed.';
            }
        });
    }

    cancel():void {
        this.router.navigate(['/main/enquiry']);
    }

    private formatDateForInput(value:any):string {
        if(!value){
            return '';
        }

        const date=new Date(value);

        if(isNaN(date.getTime())){
            return '';
        }

        return date.toISOString().substring(0,10);
    }
}