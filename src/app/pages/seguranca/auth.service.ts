import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { environment } from 'src/environment/environment';

@Injectable()
export class AuthService {
  oauthTokenUrl: string;
  tokensRevokeUrl: string;
  jwtPayload: any;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private messageService: MessageService,
    private errorHandle: ErrorHandlerService
  ) {
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiURL}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiURL}/oauth/logout`;
  }

    private carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }


  login(username: string, password: string): Promise<void> {
    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, {
        username, password
      }, {
        withCredentials: true,
      })
    )
      .then((response) => {
        this.armazenarToken(response['accessToken']);
        this.messageService.add({
          severity: 'success',
          summary: 'Login',
          detail: 'Efetuado com sucesso',
        });
      })
      .catch((response) => {
        const responseError = response.error;
        if (response.statusCode === 400) {
          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválido');
          }
        }
        return Promise.reject(response.error.message);
      });
  }

  logout() {
     return firstValueFrom(
      this.http.get(this.tokensRevokeUrl, {})
    ).then(() => {
      this.limparAccessToken();
      this.messageService.add({
        severity: 'success',
        summary: 'Saindo',
        detail: 'até breve...',
      });
    });
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }

  temPermissao(permissao: string) {
    const token = localStorage.getItem('token');
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    
    return this.jwtPayload && this.jwtPayload.permissao[permissao];
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  regrasdePermissao(roles) {   
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ZGV2QG5wajIz')
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, body, {
        headers,
        withCredentials: true,
      })
    )
      .then((response) => {
        // tslint:disable-next-line: no-string-literal
        this.armazenarToken(response['access_token']);
        return Promise.resolve(null);
      })
      .catch((response) => {
        // console.error('Erro ao renovar token', response);
      });
  }




}
