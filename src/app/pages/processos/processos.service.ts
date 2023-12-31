import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import { FiltroProcessos } from 'src/app/core/models/filtros.model';
import { Processos } from 'src/app/core/models/processo.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessosService {
  processoURL: string = '';

  constructor(private http: HttpClient) {
    this.processoURL = `${environment.apiURL}/processos`;
  }

  listarComFiltro(filtro: FiltroProcessos): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(this.http.get(`${this.processoURL}`, { params: param })).then(
      (response: any) => {
        this.converterStringsParaDatas(response.data);
        return response;
      }
    );
  }

  validarParametros(filtro: FiltroProcessos) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.perPage = filtro.itensPorPagina;

    if (filtro.numeroprocesso) {
      obj.numeroprocesso = filtro.numeroprocesso;
    }

    if (filtro.desccliente) {
      obj.desccliente = filtro.desccliente;
    }

    if (filtro.descvara) {
      obj.descvara = filtro.descvara;
    }

    if (filtro.descmotivo) {
      obj.descmotivo = filtro.descmotivo;
    }

    if (filtro.descstatus) {
      obj.descstatus = filtro.descstatus;
    }

    if (filtro.usuariocriacao) {
      obj.usuariocriacao = filtro.usuariocriacao;
    }

    // if (filtro.usuarioalteracao) {
    //   obj.usuarioalteracao = filtro.usuarioalteracao;
    // }


    if (filtro.datacriacaode) {
      obj.datacriacaode = filtro.datacriacaode;
    }

    if (filtro.datacriacaoate) {
      obj.datacriacaoate = filtro.datacriacaoate;
    }

    // if (filtro.dataalteracaode) {
    //   obj.dataalteracaode = filtro.dataalteracaode;
    // }

    // if (filtro.dataalteracaoate) {
    //   obj.dataalteracaoate = filtro.datacriacaoate;
    // }

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

  listarProcessos(): Promise<Processos> {
    return firstValueFrom(this.http.get(`${this.processoURL}`)).then(
      (response) => response as Processos,
    );
  }

  adicionarProcessos(obj: Processos): Promise<Processos> {
    return firstValueFrom(this.http.post<Processos>(this.processoURL, obj));
  }

  atualizarProcessos(obj: Processos): Promise<Processos> {
    return firstValueFrom(
      this.http.put<Processos>(`${this.processoURL}/${obj._id}`, obj),
    ).then((response) => response as Processos);
  }


  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.processoURL}/${id}`)).then(
      (response) => {
        this.converterStringsParaData(response);
            return response as Processos;
      },
    );
  }
  

  private converterStringsParaData(obj: any) { 
    console.log(obj);
    if (obj.datacriacao) {
      obj.datacriacao = moment(obj.datacriacao, 'YYYY-MM-DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    }  
}


  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.processoURL}/${id}`)).then(
      () => null,
    );
  }

}
