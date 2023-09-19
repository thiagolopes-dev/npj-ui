import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessageService } from 'primeng/api';

import { JwtHelperService } from '@auth0/angular-jwt';
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
  ){
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiURL}/oauth/token`;
    this.tokensRevokeUrl = `${environment.apiURL}/tokens/revoke`;


  }

  logout(){}
  login(){}
  limparAccessToken(){}
  regrasdePermissao(){}
  obterNovoAccessToken(){}
  armazenarToken(){}
  carregarToken(){}


isAccessTokenInvalid(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
}


}
