import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";



@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router,
        private messageService: MessageService
    ) { }

    canActivate (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | UrlTree | Promise<boolean> | UrlTree | boolean {
        if (this.auth.obterNovoAccessToken()) {
            return this.auth.isAccessTokenInvalido()
                .then(() => {
                    if (this.auth.isAccessTokenInvalido()) {
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Expirou sua navegação',
                            detail: 'Efetue o login novamente'
                        });
                        this.router.navigate(['/login']);
                        return false;
                    }
                    return true;
                });
        } else if (route.data.roles && !this.auth.regrasdePermissao(route.data.role)) {
            this.router.navigate(['nao-autorizado']);
            return false;
        }
        return true;
    }
}