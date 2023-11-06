import { Injectable } from '@angular/core';
import { FiltroMotivos, FiltroVaras } from '../../models/filtros.model';

@Injectable({
    providedIn: 'root',
})

export class FiltroVarasService {


    constructor() { }

    async filtro(value: any, oldFiltro: FiltroMotivos): Promise<FiltroMotivos> {

        let filtro = new FiltroMotivos();

        filtro = { ...oldFiltro };

        filtro.pagina = 0;
        filtro.itensPorPagina = 10;

        if (value.field === 'codigo') {
            filtro.codigo = value.qty;
        }

        if (value.field === 'descricao') {
            filtro.descricao = value.qty;
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
