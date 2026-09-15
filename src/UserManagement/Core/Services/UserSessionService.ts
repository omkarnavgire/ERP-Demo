import {Injectable} from "@angular/core";
import {User} from "../../Domain/Entities/User";

@Injectable({
    providedIn:"root"
})
export class UserSessionService{
    currentUser:User|null=null;
    employeeName="";
    employeeCode="";
    username="";
    email="";
    mobile="";
    branch="";
    roleName="";
    roles:string[]=[];

    setUser(user:User):void{
        this.currentUser=user;
        this.employeeName=user.employeeName||"";
        this.employeeCode=user.employeeCode||"";
        this.username=user.userName||"";
        this.email=user.emailAddress||"";
        this.mobile=user.mobileNumber||"";
        this.branch=user.branchName||"";
        this.roleName=user.roleName||user.role||"";

        const userRoles=Array.isArray(user.roles)?user.roles:[];
        const primaryRole=this.roleName? [this.roleName]:[];

        this.roles=[
            ...new Set(
                [...userRoles,...primaryRole]
                    .filter((role):role is string=>typeof role==="string")
                    .map(role=>role.trim())
                    .filter(role=>role.length>0)
            )
        ];

        console.log("User session:",this.currentUser);
        console.log("User roles:",this.roles);
    }

    hasRole(role:string):boolean{
        const requiredRole=role.trim().toLowerCase();

        return this.roles.some(
            item=>item.trim().toLowerCase()===requiredRole
        );
    }

    hasAnyRole(requiredRoles:string[]):boolean{
        const userRoles=this.roles.map(
            role=>role.trim().toLowerCase()
        );

        return requiredRoles.some(
            role=>userRoles.includes(role.trim().toLowerCase())
        );
    }

    isSuperUser():boolean{
        return this.hasRole("Super User");
    }

    clear():void{
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