import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorHandlerService {
  constructor(
    private messageService: MessageService,
  ) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse instanceof HttpErrorResponse) {
      if (errorResponse.status >= 400 && errorResponse.status <= 499) {
        let errorMessage = 'Ocorreu um erro no app, tente novamente...';

        if (errorResponse.error && errorResponse.error.message) {
          if (Array.isArray(errorResponse.error.message)) {
            errorMessage = errorResponse.error.message[0];
          } else {
            errorMessage = errorResponse.error.message;
          }
        }

        if (errorResponse.status === 403) {
          errorMessage = 'Você não tem permissão para executar esta ação';
        }

        msg = errorMessage;
      } else if (errorResponse.status >= 500 && errorResponse.status <= 599) {
        let errorMessage = 'Ocorreu um erro no servidor...';

        if (errorResponse.error && errorResponse.error.message) {
          if (Array.isArray(errorResponse.error.message)) {
            errorMessage = errorResponse.error.message[0];
          } else {
            errorMessage = errorResponse.error.message;
          }
        }

        msg = errorMessage;
      } else if (errorResponse.status >= 300 && errorResponse.status <= 399) {
        let errorMessage = 'Ocorreu um erro de redirecionamento...';

        if (errorResponse.error && errorResponse.error.message) {
          if (Array.isArray(errorResponse.error.message)) {
            errorMessage = errorResponse.error.message[0];
          } else {
            errorMessage = errorResponse.error.message;
          }
        }

        msg = errorMessage;
      }
    }

    if (msg === undefined || msg === null) {
      this.messageService.add({ severity: 'error', detail: `${errorResponse}` });
    } else {
      this.messageService.add({ severity: 'error', detail: `${msg}` });
    }
  }
}
