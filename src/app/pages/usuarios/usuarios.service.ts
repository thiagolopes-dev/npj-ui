import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
import { firstValueFrom } from 'rxjs';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { environment } from 'src/environments/environment';



@Injectable()
export class UsuariosService {
  permissoesUrl: string;
  resetpass: string;
  notificacaoUrl: string;
  usuarioFiltroUrl: string;
  usuariosUrl: string;
  sidebarUrl: string;

  constructor(private http: HttpClient) {
    this.usuariosUrl = `${environment.apiURL}/usuarios`;
  }



  listarUsuarios(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.usuariosUrl}`)).then(
      (response) => {
        const obj = response as any[];
        this.converterStringsParaDatas(obj);
        return obj;
      }
    );
  }

  private converterStringsParaDatas(obj: any[]) {
    obj.forEach((element) => {
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
      if (element.datacriacao) {
        element.datacriacao = moment(element.datacriacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }

  async buscarSidebar(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.sidebarUrl}`)).then(
      (response) => response);
  }

  async salvarSidebar(accordionItems: any): Promise<any> {
    const response = await firstValueFrom(this.http.put(`${this.sidebarUrl}`, accordionItems)
    );
    return response;
  }

  // alterarSenha(user: Usuarios): Promise<Usuarios> {
  //   return firstValueFrom(
  //     this.http.patch(`${this.usuariosUrl}/${user._id}`, user)
  //   ).then((response) => response as Usuarios);
  // }

  // async alterarSenhaUsuario(senha: string): Promise<Usuarios> {
  //   const requestBody = { password: senha };
  //   return firstValueFrom(
  //     this.http.put<Usuarios>(`${this.usuariosUrl}/alterarsenha`, requestBody)
  //   );
  // }


  buscarPorIdSenha(id: number) {
    return firstValueFrom(
      this.http.get(`${this.usuariosUrl}/${id}`)
    ).then((response) => response as Usuarios);
  }

 

 
  private converterStringsParaDatasFiltro(obj: any[]) {
    obj.forEach((element) => {
      if (element.datausucriacao) {
        element.datausucriacao = moment(element.datausucriacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
      if (element.datagravacao) {
        element.datagravacao = moment(element.datagravacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }

  buscarPorId(id: number) {
    return firstValueFrom(this.http.get(`${this.usuariosUrl}/${id}`)).then(
      (response) => response as Usuarios
    );
  }

  atualizarSenha(pass: string): Promise<any> {
    return firstValueFrom(this.http.put(`${this.resetpass}`, pass)).then(
      (response) => response as any
    );
  }

  buscarNotificacoes(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.notificacaoUrl}`)).then(
      (response) => response
    );
  }

  buscarQtdNotificacoes(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.notificacaoUrl}/qtd`)).then(
      (response) => response
    );
  }

  vizualizarNotificacao(idnotificacao: number): Promise<any> {
    return firstValueFrom(this.http.put(`${this.notificacaoUrl}/${idnotificacao}`, idnotificacao)).then(
      (response) => response as any
    );
  }

  atualizar(user: any): Promise<any> {
    return firstValueFrom(
      this.http.put(`${this.usuariosUrl}/${user._id}`, user)
    ).then((response) => response as Usuarios);
  }

  adicionar(user: Usuarios): Promise<Usuarios> {
    return firstValueFrom(this.http.post<Usuarios>(this.usuariosUrl, user));
  }

  listarPermissoes(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.permissoesUrl}/${id}`)).then(
      (response) => response
    );
  }

  listarPermissoesEdit(id: number): Promise<any> {
    return firstValueFrom(this.http.get(`${this.permissoesUrl}/editar/${id}`)).then(
      (response) => response
    );
  }

  async alterarSenhaUsuario(senha: string): Promise<Usuarios> {
    const requestBody = { password: senha };
    return firstValueFrom(
      this.http.put<Usuarios>(`${this.usuariosUrl}/alterarsenha`, requestBody)
    );
  }

  alterarSenha(user: Usuarios): Promise<Usuarios> {
    const requestBody = { password: user.password };
    return firstValueFrom(
      this.http.put(`${this.usuariosUrl}/${user._id}`, requestBody)
    ).then((response) => response as Usuarios);
  }


}
