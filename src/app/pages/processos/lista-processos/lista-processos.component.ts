import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';

import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { ProcessosService } from '../processos.service';
import { Processos } from 'src/app/core/models/processo.model';

@Component({
  selector: 'app-lista-processos',
  templateUrl: './lista-processos.component.html',
  styleUrls: ['./lista-processos.component.css'],
})
export class ListaProcessosComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 20, 30, 50, 100, 200];
  messagePageReport: 'Mostrando {first} a {last} de {totalRecords} registros';
  newprocesso = new Processos();
  cols: any[] | undefined;

  constructor(
    private title: Title,
    private processosService: ProcessosService,
    private ngxspinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Lista de Processos');
    this.carregarProcessos();

    this.cols = [
      { field: 'codigo', header: 'Código', width: '80px', type: 'text' },
      {
        field: 'numerProcesso',
        header: 'NumeroProcesso',
        width: '80px',
        type: 'text',
      },
      { field: 'cliente', header: 'Cliente', width: '150px', type: 'text' },
      { field: 'vara', header: 'Varas', width: '80px', type: 'text' },
      { field: 'status', header: 'Status', width: '80px', type: 'text' },
      { field: 'motivo', header: 'Motivos', width: '80px', type: 'text' },
      { field: 'descricao', header: 'Descrição', width: '80px', type: 'text' },
      { field: 'usuario', header: 'Usuario', width: '80px', type: 'text' },
      { field: 'data', header: 'Data', width: '80px', type: 'date' },
      { field: 'status', header: 'Status', width: '80px', type: 'boolean' },
    ];
  }

  refresh(): void {
    this.carregarProcessos();
  }

  onClear() {
    this.newprocesso._id = null;
    this.newprocesso.numeroProcesso = null;
    this.newprocesso.cliente = null;
    this.newprocesso.varas = null;
    this.newprocesso.statusdescricao = null;
    this.newprocesso.motivos = null;
    this.newprocesso.processos.informacoes = null;
    this.newprocesso.processos.datacriacao = null;
    this.newprocesso.processos.usuariocriacao = null;
    this.newprocesso.status = null;
    console.log(this.onClear);
  }

  carregarProcessos() {
    this.ngxspinner.show();
    this.processosService
      .listarProcessos()
      .then((obj) => {
        this.newprocesso = obj;
        this.ngxspinner.hide();
      })
      .catch((erro) => {
        this.ngxspinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  valorAcompanhamento(_id: string) {
    console.log(_id);
  }
}
