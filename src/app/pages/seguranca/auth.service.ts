import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { JwtHelperService } from '@auth0/angular-jwt';
import { firstValueFrom } from 'rxjs';
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
  ) {
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiURL}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiURL}/tokens/revoke`;
  }

  logout() {
    return firstValueFrom(
      this.http.delete(this.tokensRevokeUrl, { withCredentials: true }),
    ).then(() => {
      this.limparAccessToken();
      this.messageService.add({
        severity: 'success',
        summary: 'Saindo',
        detail: 'até breve...',
      });
    });
  }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic SEcdks#W$2nk')
      .set('Content-Type', 'aplication/x-www-form-urlencoded');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, body, {
        headers,
        withCredentials: true,
      }),
    )
      .then((response) => {
        this.armazenarToken(response['accessToken']);
        this.messageService.add({
          severity: 'success',
          summary: 'login',
          detail: 'efetuado com sucesso',
        });
      })
      .catch((response) => {
        const responseError = response.error;
        if (response.status === 400) {
          if (responseError.error === 'invalid_grant ')
            return Promise.reject('Usuario ou senha Inválidos');
        }
        return Promise.reject(response);
      });
  }

  obterNovoAccessToken(): Promise<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic SEcdks#W$2nk')
      .set('Content-Type', 'aplication/x-www-form-urlencoded');

    const body = 'grant_type=accessToken';

    return firstValueFrom(
      this.http.post(this.oauthTokenUrl, body, {
        headers,
        withCredentials: true,
      })
    )
      .then((response) => {
        this.armazenarToken(response['accessToken']);
        return Promise.resolve(null);
      })
      .catch((response) => {
        console.log(response);
      });
  }

  temPermissão(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authrities.includes(permissao);
  }

  regrasdePermissao(roles) {
    for (const role of roles) {
      return true;
    }
    return false;
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');
    return !token || this.jwtHelper.isTokenExpired(token);
  }
}
