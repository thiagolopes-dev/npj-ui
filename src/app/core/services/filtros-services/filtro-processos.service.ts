import { Injectable } from '@angular/core';
import { FiltroProcessos } from '../../models/filtros.model';

@Injectable({
    providedIn: 'root',
})

export class FiltroProcessosService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltroProcessos): Promise<FiltroProcessos> {

        let filtro = new FiltroProcessos();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'numeroprocesso') {
            filtro.numeroprocesso = value.qty;
        }

        if (value.field === 'desccliente') {
            filtro.desccliente = value.qty;
        }

        if (value.field === 'descmotivo') {
            filtro.descmotivo = value.qty;
        }

        if (value.field === 'descvara') {
            filtro.descvara = value.qty;
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
