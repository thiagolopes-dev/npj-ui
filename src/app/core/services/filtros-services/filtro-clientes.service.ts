import { Injectable } from '@angular/core';
import { FiltroClientes } from '../../models/filtros.model';

@Injectable({
  providedIn: 'root',
})
export class FiltroClientesService {
  constructor() {}

  async filtro(value: any, oldFiltro: FiltroClientes): Promise<FiltroClientes> {
    let filtro = new FiltroClientes();

    filtro = { ...oldFiltro };

    filtro.pagina = 0;
    filtro.itensPorPagina = 10;

    if (value.field === 'codigo') {
      filtro.codigo = value.qty;
    }

    if (value.field === 'nome') {
      filtro.nome = value.qty;
    }

    if (value.field === 'cpf') {
      filtro.cpf = value.qty;
    }

    if (value.field === 'rg') {
      filtro.rg = value.qty;
    }

    if (value.field === 'cep') {
      filtro.cep = value.qty;
    }

    if (value.field === 'logradouro') {
      filtro.logradouro = value.qty;
    }

    if (value.field === 'bairro') {
      filtro.bairro = value.qty;
    }

    if (value.field === 'numero') {
      filtro.numero = value.qty;
    }

    if (value.field === 'complemento') {
      filtro.complemento = value.qty;
    }

    if (value.field === 'cidade') {
      filtro.cidade = value.qty;
    }

    if (value.field === 'uf') {
      filtro.uf = value.qty;
    }

    if (value.field === 'whatsapp') {
      filtro.whatsapp = value.qty;
    }

    if (value.field === 'usuariocriacao') {
      filtro.usuariocriacao = value.qty;
    }

    if (value.field === 'usuarioalteracao') {
      filtro.usuarioalteracao = value.qty;
    }

    return filtro;
  }
}
