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

        if (value.field === 'numeroProcesso') {
            filtro.numeroProcesso = value.qty;
        }

        if (value.field === 'cliente') {
            filtro.cliente = value.qty;
        }

        if (value.field === 'motivos') {
            filtro.motivos = value.qty;
        }

        if (value.field === 'varas') {
            filtro.varas = value.qty;
        }

        if (value.field === 'status') {
            filtro.status = value.qty;
        }

        if (value.field === 'processos') {
            filtro.processos = value.qty;
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
