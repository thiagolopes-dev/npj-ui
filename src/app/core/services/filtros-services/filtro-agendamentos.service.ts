import { Injectable } from '@angular/core';
import { FiltroAgendamentos } from '../../models/filtros.model';

@Injectable({
    providedIn: 'root',
})

export class FiltroAgendamentosService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltroAgendamentos): Promise<FiltroAgendamentos> {

        let filtro = new FiltroAgendamentos();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'atendimento') {
            filtro.atendimento = value.qty;
          }

          if (value.field === 'numeroprontuario') {
            filtro.numeroprontuario = value.qty;
          }

        if (value.field === 'desccliente') {
            filtro.desccliente = value.qty;
        }

        if (value.field === 'descmotivo') {
            filtro.descmotivo = value.qty;
        }

        if (value.field === 'descstatus') {
            filtro.descstatus = value.qty;
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