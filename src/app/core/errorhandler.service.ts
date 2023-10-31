import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
// import { NotAuthenticatedError } from '../demo/components/pages/seguranca/login/daring-http';

@Injectable()
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router: Router
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let errors;
      if (errorResponse.error.mensagem === undefined) {
        msg = 'Ocorreu algum erro no app, tente novamente...';
      } else {
        msg = errorResponse.error.mensagem;
      }

      if (errorResponse.status === 403) {
        if (errorResponse.error.mensagem === undefined) {
          msg = 'Você não tem permissão para executar esta ação';
        } else {
          msg = errorResponse.error.mensagem;
          console.log(msg);
        }
      }

      try {
        errors = errorResponse.error;

        msg = errors[0].mensagemUsuario;
      } catch (e) { }

      //    console.error('Ocorreu um erro', errorResponse);

    }
    else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 500 && errorResponse.status <= 599) {
      let errors;
      if (errorResponse.error.mensagem === undefined) {
        msg = 'Ocorreu um erro no servidor...';
      } else {
        msg = errorResponse.error.mensagem;
      }
      try {
        errors = errorResponse.error;

        msg = errors[0].mensagemUsuario;
      } catch (e) { }
    }
    else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 300 && errorResponse.status <= 399) {
      let errors;
      if (errorResponse.error.mensagem === undefined) {
        msg = 'Ocorreu um erro de redirecionamento...';
      } else {
        msg = errorResponse.error.mensagem;
      }
      try {
        errors = errorResponse.error;

        msg = errors[0].mensagemUsuario;
      } catch (e) { }
    }

    if (msg === undefined || msg === null) {
      this.messageService.add({ severity: 'error', detail: `${errorResponse}` });
    }
    else {
      this.messageService.add({ severity: 'error', detail: `${msg}` });
    }
  }

}
