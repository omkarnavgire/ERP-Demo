import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Login } from "../../../Application/Auth/Login";
import { GetAllUsers } from "../../../Application/User/GetAllUsers";
import { AuthService } from "../../../Core/Services/AuthService";
import { UserSessionService } from "../../../Core/Services/UserSessionService";
import { User } from "../../../Domain/Entities/User";

@Component({
    selector: "app-login",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: "./Login.html",
    styleUrl: "./Login.css"
})
export class LoginClass {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private loginUsecase = inject(Login);
    private getAllUsersUsecase = inject(GetAllUsers);
    private authService = inject(AuthService);
    private userSessionService = inject(UserSessionService);

    errormessage = "";

    loginForm = this.fb.nonNullable.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    });

    submit(): void {
        this.errormessage = "";

        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        const request = this.loginForm.getRawValue();

        this.loginUsecase.execute(request).subscribe({
            next: (response) => {
                console.log("Login successful:", response);

                this.authService.saveLoginData(
                    response.token,
                    response.refreshToken
                );

                localStorage.setItem("username", request.username);

                this.getAllUsersUsecase.execute().subscribe({
                    next: (userResponse: any) => {
                        const users: User[] = Array.isArray(userResponse)
                            ? userResponse
                            : userResponse?.data ?? [];

                        const loginUsername = request.username
                            .trim()
                            .toLowerCase();

                        const currentUser = users.find((user: User) =>
                            user.employeeCode?.trim().toLowerCase() === loginUsername ||
                            user.userName?.trim().toLowerCase() === loginUsername ||
                            user.emailAddress?.trim().toLowerCase() === loginUsername
                        );

                        console.log("Logged-in employee:", currentUser);

                        if (currentUser) {
                            this.userSessionService.setUser(currentUser);

                            console.log(
                                "Employee Name:",
                                this.userSessionService.employeeName
                            );

                            console.log(
                                "Role:",
                                this.userSessionService.roleName
                            );

                            console.log(
                                "Roles:",
                                this.userSessionService.roles
                            );
                        }

                        this.router.navigate(["/main/dashboard"]);
                    },
                    error: (error) => {
                        console.error("User information API error:", error);
                        this.router.navigate(["/main/dashboard"]);
                    }
                });
            },
            error: (error) => {
                console.error("Login error:", error);

                this.errormessage =
                    error?.error?.message ||
                    "Invalid username or password.";
            }
        });
    }
}