import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import { FiltroStatus } from 'src/app/core/models/filtros.model';
import { Status } from 'src/app/core/models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  statusURL: string = '';

  constructor(private http: HttpClient) {
    this.statusURL = `${environment.apiURL}/status`;
  }

  listarComFiltro(filtro: FiltroStatus): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.statusURL}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatas(response.data);
        return response;
      }
    );
  }

  listarDropAgendamento(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.statusURL}/all?tipo=AGENDAMENTO`),
    ).then((response: any) => {
      this.converterStringsParaDatas(response);
      return response;
    });
  }

  listarDropProcesso(): Promise<any> {
    return firstValueFrom(
      this.http.get(`${this.statusURL}/all?tipo=PROCESSO`),
    ).then((response: any) => {
      this.converterStringsParaDatas(response);
      return response;
    });
  }

  validarParametros(filtro: FiltroStatus) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.perPage = filtro.itensPorPagina;

    if (filtro.codigo) {
      obj.codigo = filtro.codigo;
    }

    if (filtro.descricao) {
      obj.descricao = filtro.descricao;
    }

    if (filtro.tipo) {
      obj.tipo = filtro.tipo;
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

  listarStatus(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.statusURL}`)).then(
      (response) => response as any[],
    );
  }

  adicionarStatus(obj: Status): Promise<Status> {
    return firstValueFrom(this.http.post<Status>(this.statusURL, obj));
  }

  atualizarStatus(obj: Status): Promise<Status> {
    return firstValueFrom(
      this.http.put<Status>(`${this.statusURL}/${obj._id}`, obj),
    ).then((response) => response as Status);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.statusURL}/${id}`)).then(
      (response) => response as Status,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.statusURL}/${id}`)).then(
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