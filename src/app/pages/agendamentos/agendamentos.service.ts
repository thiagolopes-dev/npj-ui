import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Agendamentos } from 'src/app/core/models/agendamento.model';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import { FiltroAgendamentos } from 'src/app/core/models/filtros.model';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosService {
  agendamentoURL: string = '';

  constructor(private http: HttpClient) {
    this.agendamentoURL = `${environment.apiURL}/agendamentos`;
  }

  listarComFiltro(filtro: FiltroAgendamentos): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.agendamentoURL}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatas(response.data);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltroAgendamentos) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.perPage = filtro.itensPorPagina;

    if (filtro.atendimento) {
      obj.atendimento = filtro.atendimento;
    }

    if (filtro.dataatendimentode) {
      obj.dataatendimentode = filtro.dataatendimentode;
    }

    if (filtro.dataatendimentoate) {
      obj.dataatendimentoate = filtro.dataatendimentoate;
    }

    if (filtro.cliente) {
      obj.cliente = filtro.cliente;
    }

    if (filtro.motivo) {
      obj.motivo = filtro.motivo;
    }

    if (filtro.status) {
      obj.status = filtro.status;
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

  listarAgendamentos(): Promise<Agendamentos> {
    return firstValueFrom(this.http.get(`${this.agendamentoURL}`)).then(
      (response) => response as Agendamentos,
    );
  }

  adicionarAgendamento(obj: Agendamentos): Promise<Agendamentos> {
    return firstValueFrom(this.http.post<Agendamentos>(this.agendamentoURL, obj));
  }

  atualizarAgendamentos(obj: Agendamentos): Promise<Agendamentos> {
    return firstValueFrom(
      this.http.put<Agendamentos>(`${this.agendamentoURL}/${obj._id}`, obj),
    ).then((response) => response as Agendamentos);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.agendamentoURL}/${id}`)).then(
      (response) => {
        response as Agendamentos;
        this.converteStringParaData(response);
        return response;
      } 
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.agendamentoURL}/${id}`)).then(
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

  converteStringParaData(obj: any) {
      obj.dataatendimento = moment(obj.dataatendimento, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
 
  }
}