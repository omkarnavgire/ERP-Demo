import { Routes } from "@angular/router";

import { LoginClass } from "./Presentation/Account/Login/LoginComponent";
import { ForgotPasswordClass } from "./Presentation/Account/ForgotPassword/ForgotPasswordComponent";
import { ChangePasswordClass } from "./Presentation/Account/ChangePassword/ChangePasswordComponent";
import { ProfileComponent } from "./Presentation/Account/Profile/ProfileComponent";
import { DashboardComponent } from "./Presentation/Dashboard/DashboardComponent";
import { UserComponent } from "./Presentation/User/UserComponent";
import { LeadComponent } from "./Presentation/Lead/LeadComponent";
import { EmployeeComponent } from "./Presentation/Employee/EmployeeComponent";
import { MainClass } from "./Maincomponent";
import { authGuard } from "./Core/guards/AuthGuards";
import { Enquiryform } from "./Presentation/EneuiryFollowup/EnquiryFollowupFrom/EnquiryFollowupFrom";
import { Enquirylist } from "./Presentation/EneuiryFollowup/EnquiryFollowupList/EnquiryfollowupList";
import { TrainingCourseComponent } from "./Presentation/TrainingCourse/TrainingCourseComponent";
import { SettingsComponent } from "./Presentation/Settings/SettingsComponent";
import { EditUserRolesComponent } from "./Presentation/User/EditUserRoles/EditUserRolesComponent";
import { FollowupForm } from "./Presentation/EneuiryFollowup/Followup/FollowupForm/FollowupForm";

export const routes: Routes = [
    {
        path: "login",
        component: LoginClass
    },
    {
        path: "forgot-password",
        component: ForgotPasswordClass
    },
    {
        path: "main",
        component: MainClass,
        canActivate: [authGuard],
        children: [
            { path: "dashboard", component: DashboardComponent },
            { path: "user", component: UserComponent },
            { path: "edit-user-roles/:userId", component: EditUserRolesComponent },
            { path: "lead", component: LeadComponent },
            { path: "employee", component: EmployeeComponent },
            { path: "change-password", component: ChangePasswordClass },
            { path: "profile", component: ProfileComponent },
            { path: "enquiry", component: Enquirylist },
            { path: "enquiry/add", component: Enquiryform },
            { path: "enquiry/edit/:id", component: Enquiryform },
            { path: "course", component: TrainingCourseComponent },
            { path: "settings", component: SettingsComponent },
            { path: "", redirectTo: "dashboard", pathMatch: "full" },
            { path: "enquiry", component: Enquirylist },
            { path: "enquiry/add", component: Enquiryform },
            { path: "enquiry/edit/:id", component: Enquiryform },
            { path: "enquiry/followup/:enquiryId", component: FollowupForm },
        ]
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
    },
    {
        path: "**",
        redirectTo: "login"
    }
];