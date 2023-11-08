import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Motivos } from 'src/app/core/models/motivos.model';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import { FiltroMotivos } from 'src/app/core/models/filtros.model';

@Injectable({
  providedIn: 'root',
})
export class MotivosService {
  motivoURL: string = '';

  constructor(private http: HttpClient) {
    this.motivoURL = `${environment.apiURL}/motivos`;
  }

  listarComFiltro(filtro: FiltroMotivos): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.motivoURL}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatas(response.data);
        return response;
      }
    );
  }

   ListarDrop(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.motivoURL}/all`),
    ).then((response: any) => {
      this.converterStringsParaDatas(response);
      return response;
    });
  }

  validarParametros(filtro: FiltroMotivos) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.perPage = filtro.itensPorPagina;

    if (filtro.codigo) {
      obj.codigo = filtro.codigo;
    }

    if (filtro.descricao) {
      obj.descricao = filtro.descricao;
    }

    if (filtro.usuariocriacao) {
      obj.usuariocriacao = filtro.usuariocriacao;
    }

    if (filtro.usuarioalteracao) {
      obj.usuarioalteracao = filtro.usuarioalteracao;
    }


    if (filtro.datacriacaode) {
      obj.datacriacaode = filtro.datacriacaode;
    }

    if (filtro.datacriacaoate) {
      obj.datacriacaoate = filtro.datacriacaoate;
    }

    if (filtro.dataalteracaode) {
      obj.dataalteracaode = filtro.dataalteracaode;
    }

    if (filtro.dataalteracaoate) {
      obj.dataalteracaoate = filtro.dataalteracaoate;
    }

    if (filtro.status) {
      obj.status = filtro.status;
    }

    return obj;
  }

  private converterStringsParaDatas(obj: any[]) {
    obj.forEach((element) => {
      if (element.datacriacao) {
        element.datacriacao = moment(element.datacriacao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
      if (element.dataalteracao) {
        element.dataalteracao = moment(element.dataalteracao, 'YYYY-MM-DD H:mm')
          .tz('America/Sao_Paulo')
          .toDate();
      }
    });
  }

  listarMotivos(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.motivoURL}`)).then(
      (response) => response as any[],
    );
  }

  adicionarMotivo(obj: Motivos): Promise<Motivos> {
    return firstValueFrom(this.http.post<Motivos>(this.motivoURL, obj));
  }

  atualizarMotivos(obj: Motivos): Promise<Motivos> {
    return firstValueFrom(
      this.http.put<Motivos>(`${this.motivoURL}/${obj._id}`, obj),
    ).then((response) => response as Motivos);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.motivoURL}/${id}`)).then(
      (response) => response as Motivos,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.motivoURL}/${id}`)).then(
      () => null,
    );
  }
}