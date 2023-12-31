import { Injectable } from '@angular/core';
import { FiltrosUsuario } from '../../models/filtros.model';

@Injectable({
  providedIn: 'root',
})

export class FiltrosUsuarioService {


  constructor() { }

  async filtro(value: any, oldFiltro: FiltrosUsuario): Promise<FiltrosUsuario> {

    let filtro = new FiltrosUsuario();

    filtro = { ...oldFiltro };

    filtro.pagina = 0;
    filtro.itensPorPagina = 10;

    if (value.field === 'id') {
      filtro.id = value.qty;
    }

    if (value.field === 'name') {
      filtro.name = value.qty;
    }

    if (value.field === 'username') {
      filtro.username = value.qty;
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
