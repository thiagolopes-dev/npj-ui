import { Injectable } from '@angular/core';
import { FiltrosUsuario } from '../../models/filtros.model';

@Injectable({
  providedIn: 'root',
})

export class FiltroUsuarioService {


  constructor() { }

  async filtro(value: any, oldFiltro: FiltrosUsuario): Promise<FiltrosUsuario> {

    let filtro = new FiltrosUsuario();

    filtro = { ...oldFiltro };

    filtro.pagina = 0;
    filtro.itensPorPagina = 10;

    if (value.field === 'id') {
      filtro.id = value.qty;
    }

    if (value.field === 'nome') {
      filtro.nome = value.qty;
    }

    if (value.field === 'email') {
      filtro.email = value.qty;
    }


    if (value.field === 'celular') {
      filtro.celular = value.qty;
    }

    if (value.field === 'tipo') {
      filtro.tipo = value.qty;
    }

    if (value.field === 'emailusuario') {
      filtro.emailusuario = value.qty;
    }

    if (value.field === 'usucriacao') {
      filtro.usucriacao = value.qty;
    }

    return filtro;
  }
}
