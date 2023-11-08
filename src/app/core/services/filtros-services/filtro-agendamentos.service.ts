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

        if (value.field === 'dataatendimento') {
            filtro.dataatendimento = value.qty;
        }

        if (value.field === 'cliente') {
            filtro.cliente = value.qty;
        }

        if (value.field === 'motivo') {
            filtro.motivo = value.qty;
        }

        if (value.field === 'status') {
            filtro.status = value.qty;
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