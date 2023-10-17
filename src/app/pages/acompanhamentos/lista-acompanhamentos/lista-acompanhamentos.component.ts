import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { Acompanhamentos } from 'src/app/core/models/acompanhamentos.model';
import { AcompanhamentosService } from '../acompanhamentos.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';

@Component({
  selector: 'app-lista-acompanhamentos',
  templateUrl: './lista-acompanhamentos.component.html',
  styleUrls: ['./lista-acompanhamentos.component.css'],
})
export class ListaAcompanhamentosComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 20, 30, 50, 100, 200];
  messagePageReport: 'Mostrando {first} a {last} de {totalRecords} registros';
  newacompanhamento = new Acompanhamentos();
  cols: any[] | undefined;

  constructor(
    private title: Title,
    private acompanhamentosService: AcompanhamentosService,
    private ngxspinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Lista de Acompanhamentos');
    this.carregarAcompanhamentos();

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
      { field: 'data', header: 'Data', width: '80px', type: 'date' },
      { field: 'status', header: 'Status', width: '80px', type: 'boolean' },
    ];
  }

  refresh(): void {
    this.carregarAcompanhamentos();
  }

  onClear() {
    this.newacompanhamento._id = null;
    this.newacompanhamento.numeroProcesso = null;
    this.newacompanhamento.clientedescricao = null;
    this.newacompanhamento.varadescricao = null;
    this.newacompanhamento.statusdescricao = null;
    this.newacompanhamento.motivosdescricao = null;
    this.newacompanhamento.processos.informacoes = null;
    this.newacompanhamento.processos.data = null;
    this.newacompanhamento.status = null;
    console.log(this.onClear);
  }

  carregarAcompanhamentos() {
    this.ngxspinner.show();
    this.acompanhamentosService
      .listarAcompanhamentos()
      .then((obj) => {
        this.newacompanhamento = obj;
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
