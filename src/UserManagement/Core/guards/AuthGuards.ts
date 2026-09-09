import { inject } from "@angular/core"
import { TokenService } from "../Services/TokenService"
import { Router } from "@angular/router";

export const authGuard = () => {
    const tokenservice = inject(TokenService);
    const router = inject(Router);

    if (tokenservice.isLoggedIn()) {
        return true;
    }

    router.navigate(['/login']);

    return false;
}
