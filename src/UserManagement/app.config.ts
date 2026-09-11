import {ApplicationConfig} from "@angular/core";
import {provideRouter} from "@angular/router";
import {provideHttpClient,withInterceptors} from "@angular/common/http";
import {routes} from "./UserRoutes";
import {AuthRepository} from "./Domain/Repositories/Authrepositories";
import {AuthRepositoryImpl} from "./Infrastructure/Repositories/Authrepositoriesimple";
import {AccountRepository} from "./Domain/Repositories/Accountrepositories";
import {AccountRepositoryImpl} from "./Infrastructure/Repositories/Accountrepositoriesimple";
import {EmployeeRepository} from "./Domain/Repositories/Employeerepositories";
import {EmployeeRepositoryImpl} from "./Infrastructure/Repositories/Employeerepositoriesimple";
import {UserRepository} from "./Domain/Repositories/Userrepositories";
import {UserRepositoryImpl} from "./Infrastructure/Repositories/Userrepositoriesimple";
import {authInterceptor} from "./Core/interceptors/AuthInterceptors";
import {EnquiryRepository} from "./Domain/Repositories/Enquiryrepositories";
import {EnquiryApi} from "./Infrastructure/Api/EnquiryApi";
import {EnquiryFollowupRepositoriesImpl} from "./Infrastructure/Repositories/EnquiryFollowuprepositoriesimpl";
import {ENQUIRY_FOLLOWUP_REPOSITORY} from "./Domain/Repositories/Token/enquiryfollowuprepositoriestoken";

export const appConfig:ApplicationConfig={
    providers:[
        provideRouter(routes),
        provideHttpClient(withInterceptors([authInterceptor])),
        {provide:AuthRepository,useClass:AuthRepositoryImpl},
        {provide:AccountRepository,useClass:AccountRepositoryImpl},
        {provide:EmployeeRepository,useClass:EmployeeRepositoryImpl},
        {provide:UserRepository,useClass:UserRepositoryImpl},
        {provide:ENQUIRY_FOLLOWUP_REPOSITORY,useClass:EnquiryFollowupRepositoriesImpl},
        {provide:EnquiryRepository,useClass:EnquiryApi}
    ]
};