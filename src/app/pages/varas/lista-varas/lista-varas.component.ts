import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { VarasService } from '../varas.service';


@Component({
  selector: 'app-lista-varas',
  templateUrl: './lista-varas.component.html',
  styleUrls: ['./lista-varas.component.css'],
})
export class ListaVarasComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 20, 30, 50, 100, 200];
  messagePageReport: 'Mostrando {first} a {last} de {totalRecords} registros';
  varas: any;
  cols: any[] | undefined;

  constructor(
    private title: Title,
    private motivoService: VarasService,
    private ngxspinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService

  ) {}

  ngOnInit(): void {
    this.title.setTitle('Lista de Varas');
    this.carregarVaras();

    this.cols = [
      { field: 'codigo', header: 'Código', width: '80px', type: 'text' },
      { field: 'descricao', header: 'Descrição', width: '150px', type: 'text' },
      { field: 'status', header: 'Status', width: '80px', type: 'boolean' },
    ];
  }

  refresh(): void {
    this.carregarVaras();
  }

  onClear() {}

  carregarVaras() {
    this.ngxspinner.show();
    this.motivoService
      .listarVaras()
      .then((obj) => {
        this.varas = obj;
        this.ngxspinner.hide();
      })
      .catch((erro) => {
        this.ngxspinner.hide();
        this.errorHandler.handle(erro);
      });
  }

}
