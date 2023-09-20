// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
// import { MessageService } from "primeng/api";
// import { Observable } from "rxjs";
// import { AuthService } from "./auth.service";



// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActive {

//     constructor(
//         private auth: AuthService,
//         private router: Router,
//         private messageService: MessageService
//     ) { }

//     canActive(
//         next: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean> | UrlTree | Promise<boolean> | UrlTree | boolean {
//         if (this.auth.obterNovoAccessToken()) {
//             return this.auth.isAccessTokenInvalido()
//                 .then(() => {
//                     if (this.auth.isAccessTokenInvalido()) {
//                         this.messageService.add({
//                             severity: 'warn',
//                             summary: 'Expirou sua navegação',
//                             detail: 'Efetue o login novamente'
//                         });
//                         this.router.navigate(['/login']);
//                         return false;
//                     }
//                     return true;
//                 });
//         } else if (next.data.roles && !this.auth.regrasdePermissao(next.data.role)) {
//             this.router.navigate(['nao-autorizado']);
//             return false;
//         }
//         return true;
//     }
// }