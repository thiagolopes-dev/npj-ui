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

  async login(username: string, password: string) {
    try {
      const response = await this.http.post<any>(
        `${environment.apiURL}/oauth/token`,
        { username, password }).toPromise();

      if (response.accessToken) {
        this.armazenarToken(response.accessToken);
        return true;
      }

      return false;
    } catch (error) {
      // throw new Error(this.errorHandle(error));
    }
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
      }),
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
