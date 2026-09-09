import { Component, inject, OnInit } from "@angular/core";
import {
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
} from "@angular/router";
import { LogOut } from "./Application/Auth/LogOut";
import { GetAllUsers } from "./Application/User/GetAllUsers";
import { UserSessionService } from "./Core/Services/UserSessionService";
import { User } from "./Domain/Entities/User";

interface SidebarMenu {
    label: string;
    route: string;
    icon: string;
    roles: string[];
}

@Component({
    selector: "app-main-layout",
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: "./Maincomponent.html"
})
export class MainClass implements OnInit {
    private router = inject(Router);
    private logoutUsecase = inject(LogOut);
    private getAllUsersUsecase = inject(GetAllUsers);
    private userSessionService = inject(UserSessionService);

    employeeName = "";
    roleName = "";

    menus: SidebarMenu[] = [
        {
            label: "Dashboard",
            route: "/main/dashboard",
            icon: "▣",
            roles: ["Super User", "Counsellor"]
        },
        {
            label: "User",
            route: "/main/user",
            icon: "♙",
            roles: ["Super User"]
        },
        {
            label: "Employee",
            route: "/main/employee",
            icon: "◈",
            roles: ["Super User"]
        },
        {
            label: "Lead",
            route: "/main/lead",
            icon: "◉",
            roles: ["Super User", "Counsellor"]
        },
        {
            label: "Enquiry",
            route: "/main/enquiry",
            icon: "✎",
            roles: ["Super User", "Counsellor"]
        },
        {
            label: "Course",
            route: "/main/course",
            icon: "📚",
            roles: ["Super User", "Counsellor"]
        },
        {
            label: "Profile",
            route: "/main/profile",
            icon: "⚬",
            roles: ["Super User", "Counsellor"]
        },
        {
            label: "Settings",
            route: "/main/settings",
            icon: "⚙",
            roles: ["Super User", "Counsellor"]
        }
    ];

    visibleMenus: SidebarMenu[] = [];

    ngOnInit(): void {
        this.loadUserSession();
    }

    private loadUserSession(): void {
        if (this.userSessionService.roles.length > 0) {
            this.setUserData();
            this.setVisibleMenus();
            return;
        }

        const username = localStorage.getItem("username");

        if (!username) {
            console.log("Username not found");
            return;
        }

        this.getAllUsersUsecase.execute().subscribe({
            next: (userResponse: any) => {
                const users: User[] = Array.isArray(userResponse)
                    ? userResponse
                    : userResponse?.data ?? [];

                const loginUsername = username.trim().toLowerCase();

                const currentUser = users.find((user: User) =>
                    user.employeeCode?.trim().toLowerCase() === loginUsername ||
                    user.userName?.trim().toLowerCase() === loginUsername ||
                    user.emailAddress?.trim().toLowerCase() === loginUsername
                );

                console.log("Current user from API:", currentUser);

                if (currentUser) {
                    this.userSessionService.setUser(currentUser);
                    this.setUserData();
                    this.setVisibleMenus();
                }
            },
            error: (error) => {
                console.error("User information API error:", error);
            }
        });
    }

    private setUserData(): void {
        this.employeeName = this.userSessionService.employeeName;
        this.roleName = this.userSessionService.roleName;

        console.log("Employee Name:", this.employeeName);
        console.log("Role:", this.roleName);
        console.log("Roles:", this.userSessionService.roles);
    }

    private setVisibleMenus(): void {
        const userRoles = this.userSessionService.roles.map(
            (role: string) => role.trim().toLowerCase()
        );

        this.visibleMenus = this.menus.filter(menu =>
            menu.roles.some(role =>
                userRoles.includes(role.trim().toLowerCase())
            )
        );

        console.log("Visible menus:", this.visibleMenus);
    }

    logout(): void {
        this.logoutUsecase.execute();
        this.userSessionService.clear();
        localStorage.removeItem("username");
        this.router.navigate(["/login"]);
    }
}