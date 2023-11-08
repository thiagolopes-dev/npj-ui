import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Varas } from 'src/app/core/models/varas.model';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import { FiltroVaras } from 'src/app/core/models/filtros.model';

@Injectable({
  providedIn: 'root',
})
export class VarasService {
  varaURL: string = '';

  constructor(private http: HttpClient) {
    this.varaURL = `${environment.apiURL}/varas`;
  }

  listarComFiltro(filtro: FiltroVaras): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.varaURL}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatas(response.data);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltroVaras) {
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

  listarVaras(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.varaURL}`)).then(
      (response) => response as any[],
    );
  }
  adicionarVara(obj: Varas): Promise<Varas> {
    return firstValueFrom(this.http.post<Varas>(this.varaURL, obj));
  }

  atualizarVaras(obj: Varas): Promise<Varas> {
    return firstValueFrom(
      this.http.put<Varas>(`${this.varaURL}/${obj._id}`, obj),
    ).then((response) => response as Varas);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.varaURL}/${id}`)).then(
      (response) => response as Varas,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.varaURL}/${id}`)).then(
      () => null,
    );
  }

  converteStringParaDatas(obj: any) {
    obj.forEach((element: any) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}