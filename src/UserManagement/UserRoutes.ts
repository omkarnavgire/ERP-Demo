import {Routes} from "@angular/router";
import {LoginClass} from "./Presentation/Account/Login/LoginComponent";
import {ForgotPasswordClass} from "./Presentation/Account/ForgotPassword/ForgotPasswordComponent";
import {ChangePasswordClass} from "./Presentation/Account/ChangePassword/ChangePasswordComponent";
import {ProfileComponent} from "./Presentation/Account/Profile/ProfileComponent";
import {DashboardComponent} from "./Presentation/Dashboard/DashboardComponent";
import {UserComponent} from "./Presentation/User/UserComponent";
import {LeadComponent} from "./Presentation/Lead/LeadComponent";
import {EmployeeComponent} from "./Presentation/Employee/EmployeeComponent";
import {MainClass} from "./Maincomponent";
import {authGuard} from "./Core/guards/AuthGuards";
import {Enquiryform} from "./Presentation/EneuiryFollowup/EnquiryFollowupFrom/EnquiryFollowupFrom";
import {Enquirylist} from "./Presentation/EneuiryFollowup/EnquiryFollowupList/EnquiryfollowupList";
import {TrainingCourseComponent} from "./Presentation/TrainingCourse/TrainingCourseComponent";
import {SettingsComponent} from "./Presentation/Settings/SettingsComponent";
import {EditUserRolesComponent} from "./Presentation/User/EditUserRoles/EditUserRolesComponent";
import {FollowupForm} from "./Presentation/EneuiryFollowup/Followup/FollowupForm/FollowupForm";
import {LeadFollowupComponent} from "./Presentation/Lead/LeadFollowup/LeadFollowupComponent";

export const routes:Routes=[
    {path:"login",component:LoginClass},
    {path:"forgot-password",component:ForgotPasswordClass},
    {
        path:"main",
        component:MainClass,
        canActivate:[authGuard],
        children:[
            {path:"dashboard",component:DashboardComponent},
            {path:"user",component:UserComponent,data:{roles:["Super User"]},canActivate:[authGuard]},
            {path:"edit-user-roles/:userId",component:EditUserRolesComponent,data:{roles:["Super User"]},canActivate:[authGuard]},
            {path:"lead",component:LeadComponent,data:{roles:["Super User","Counsellor"]},canActivate:[authGuard]},
            {path:"lead/followup/:leadId",component:LeadFollowupComponent,data:{roles:["Super User","Counsellor"]},canActivate:[authGuard]},
            {path:"employee",component:EmployeeComponent,data:{roles:["Super User"]},canActivate:[authGuard]},
            {path:"change-password",component:ChangePasswordClass,canActivate:[authGuard]},
            {path:"profile",component:ProfileComponent,canActivate:[authGuard]},
            {path:"enquiry",component:Enquirylist,data:{roles:["Super User","Counsellor"]},canActivate:[authGuard]},
            {path:"enquiry/add",component:Enquiryform,data:{roles:["Super User","Counsellor"]},canActivate:[authGuard]},
            {path:"enquiry/edit/:id",component:Enquiryform,data:{roles:["Super User","Counsellor"]},canActivate:[authGuard]},
            {path:"enquiry/followup/:enquiryId",component:FollowupForm,data:{roles:["Super User","Counsellor"]},canActivate:[authGuard]},
            {path:"course",component:TrainingCourseComponent,data:{roles:["Super User","Counsellor"]},canActivate:[authGuard]},
            {path:"settings",component:SettingsComponent,canActivate:[authGuard]},
            {path:"",redirectTo:"dashboard",pathMatch:"full"}
        ]
    },
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"**",redirectTo:"login"}
];