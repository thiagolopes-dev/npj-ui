import { HttpErrorResponse } from "@angular/common/http";
import { InstantiateExpr } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Injectable()

export class ErrorHandleService {

    constructor(
        private messageService: MessageService,
        private router: Router
    ) { }

    handle(errorResponse: any) { 
        let msg: string;

        if(typeof errorResponse === 'string'){
            msg = errorResponse;
        } else if(errorResponse instanceof NotAuthenticatedError){
            msg = 'Sua conexão expirou!';
            this.router.navigate(['/login']);
        } else if(errorResponse instanceof HttpErrorResponse && errorResponse.status 
            >= 400 && errorResponse.status <= 499){
                let error;
                if(errorResponse.error.message === undefined){
                    msg = 'Ocorreu algum erro no aplicativo, tente novamente '
                } else {
                    msg =  errorResponse.error.message;
                }
                if(){

                }
        }
    }
}