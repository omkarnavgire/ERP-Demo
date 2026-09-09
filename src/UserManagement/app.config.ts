import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { routes } from "./UserRoutes";

import { AuthRepository } from "./Domain/Repositories/Authrepositories";
import { AuthRepositoryImpl } from "./Infrastructure/Repositories/Authrepositoriesimple";
import { AccountRepository } from "./Domain/Repositories/Accountrepositories";
import { AccountRepositoryImpl } from "./Infrastructure/Repositories/Accountrepositoriesimple";
import { EmployeeRepository } from "./Domain/Repositories/Employeerepositories";
import { EmployeeRepositoryImpl } from "./Infrastructure/Repositories/Employeerepositoriesimple";
import { UserRepository } from "./Domain/Repositories/Userrepositories";
import { UserRepositoryImpl } from "./Infrastructure/Repositories/Userrepositoriesimple";
import { authInterceptor } from "./Core/interceptors/AuthInterceptors";

import { ENQUIRY_FOLOWUP_REPOSITORY } from "./Domain/Repositories/Token/enquiryfollowuprepositoriestoken";
import { EnquiryRepositoriesimple } from "./Infrastructure/Repositories/Enquiryrepositoriesimple";
// import { TRAINING_COURSE_REPOSITORY } from "../UserManagementSystem/Domain/Repositories/Token/trainingcourserepositorytoken";
import { TrainingCourseRepositorySimple } from "./Infrastructure/Repositories/Trainingcourserepositoriesimpl";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),

       
        provideHttpClient(withInterceptors([authInterceptor])),

        { provide: AuthRepository, useClass: AuthRepositoryImpl },
        { provide: AccountRepository, useClass: AccountRepositoryImpl },
        { provide: EmployeeRepository, useClass: EmployeeRepositoryImpl },
        { provide: UserRepository, useClass: UserRepositoryImpl },
        {provide : ENQUIRY_FOLOWUP_REPOSITORY, useClass:EnquiryRepositoriesimple },
        // {provide: TRAINING_COURSE_REPOSITORY, useClass:TrainingCourseRepositorySimple}
        
    ]
};
