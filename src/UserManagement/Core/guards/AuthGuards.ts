import {inject} from "@angular/core";
import {ActivatedRouteSnapshot,Router} from "@angular/router";
import {TokenService} from "../Services/TokenService";
import {UserSessionService} from "../Services/UserSessionService";

export const authGuard=(route:ActivatedRouteSnapshot)=>{
    const tokenservice=inject(TokenService);
    const router=inject(Router);
    const userSessionService=inject(UserSessionService);

    if(!tokenservice.isLoggedIn()){
        router.navigate(["/login"]);
        return false;
    }

    const requiredRoles=route.data["roles"] as string[]|undefined;

    if(!requiredRoles||requiredRoles.length===0){
        return true;
    }

    if(userSessionService.isSuperUser()){
        return true;
    }

    if(userSessionService.hasAnyRole(requiredRoles)){
        return true;
    }

    console.log("Access denied. Required roles:",requiredRoles);
    console.log("User roles:",userSessionService.roles);

    router.navigate(["/main/dashboard"]);
    return false;
};