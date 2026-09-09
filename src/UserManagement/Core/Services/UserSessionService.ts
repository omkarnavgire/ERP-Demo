import { Injectable } from "@angular/core";
import { User } from "../../Domain/Entities/User";

@Injectable({
    providedIn:"root"
})
export class UserSessionService {
    currentUser:User|null=null;
    employeeName="";
    employeeCode="";
    username="";
    email="";
    mobile="";
    branch="";
    roleName="";
    roles=[] as string[];

    setUser(user:User):void {
        this.currentUser=user;
        this.employeeName=user.employeeName||"";
        this.employeeCode=user.employeeCode||"";
        this.username=user.userName||"";
        this.email=user.emailAddress||"";
        this.mobile=user.mobileNumber||"";
        this.branch=user.branchName||"";
        this.roleName=user.roleName||user.role||"";
        this.roles=Array.isArray(user.roles)?user.roles:[];

        console.log("User session:",this.currentUser);
    }

    hasRole(role:string):boolean {
        return this.roles.some(
            item=>item.trim().toLowerCase()===role.trim().toLowerCase()
        );
    }

    clear():void {
        this.currentUser=null;
        this.employeeName="";
        this.employeeCode="";
        this.username="";
        this.email="";
        this.mobile="";
        this.branch="";
        this.roleName="";
        this.roles=[];

        console.log("User session cleared");
    }
}