import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Clientes } from 'src/app/core/models/cliente.model';
import { environment } from 'src/environments/environment';

import * as moment from 'moment-timezone';
import { FiltroClientes } from 'src/app/core/models/filtros.model';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  clienteURL: string = '';

  constructor(private http: HttpClient) {
    this.clienteURL = `${environment.apiURL}/clientes`;
  }

  listarComFiltro(filtro: FiltroClientes): Promise<any> {
    const param: { [k: string]: any } = this.validarParametros(filtro);
    return firstValueFrom(
      this.http.get(`${this.clienteURL}`, { params: param }),
    ).then((response: any) => {
      this.converterStringsParaDatas(response.data);
      return response;
    });
  }

  validarParametros(filtro: FiltroClientes) {
    const obj: { [k: string]: any } = {};

    obj.page = filtro.pagina;
    obj.perPage = filtro.itensPorPagina;

    if (filtro.codigo) {
      obj.codigo = filtro.codigo;
    }

    if (filtro.nome) {
      obj.nome = filtro.nome;
    }

    if (filtro.cpf) {
      obj.cpf = filtro.cpf;
    }

    if (filtro.rg) {
      obj.rg = filtro.rg;
    }

    if (filtro.cep) {
      obj.cep = filtro.cep;
    }

    if (filtro.logradouro) {
      obj.logradouro = filtro.logradouro;
    }

    if (filtro.bairro) {
      obj.bairro = filtro.bairro;
    }

    if (filtro.numero) {
      obj.numero = filtro.numero;
    }

    if (filtro.complemento) {
      obj.complemento = filtro.complemento;
    }

    if (filtro.cidade) {
      obj.cidade = filtro.cidade;
    }

    if (filtro.uf) {
      obj.uf = filtro.uf;
    }

    if (filtro.whatsapp) {
      obj.whatsapp = filtro.whatsapp;
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

  listarClientes(): Promise<any> {
    return firstValueFrom(this.http.get(`${this.clienteURL}`)).then(
      (response) => response as any[],
    );
  }

  adicionarCliente(obj: Clientes): Promise<Clientes> {
    return firstValueFrom(this.http.post<Clientes>(this.clienteURL, obj));
  }

  atualizarClientes(obj: Clientes): Promise<Clientes> {
    return firstValueFrom(
      this.http.put<Clientes>(`${this.clienteURL}/${obj._id}`, obj),
    ).then((response) => response as Clientes);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.clienteURL}/${id}`)).then(
      (response) => response as Clientes,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.clienteURL}/${id}`)).then(
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

  consultaCEP(cep: string) {
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        return this.http.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      }
    }
  }
}
