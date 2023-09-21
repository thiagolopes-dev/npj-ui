import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { StatusService } from '../status.service';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';

@Component({
  selector: 'app-lista-status',
  templateUrl: './lista-status.component.html',
  styleUrls: ['./lista-status.component.css'],
})
export class ListaStatusComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 20, 30, 50, 100, 200];
  messagePageReport: 'Mostrando {first} a {last} de {totalRecords} registros';
  status: any;
  cols: any[] | undefined;

  constructor(
    private title: Title,
    private statusService: StatusService,
    private ngxspinner: NgxSpinnerService,
    //private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Lista de Status');
    this.carregarStatus();

    this.cols = [
      { field: 'id', header: 'ID', width: '80px', type: 'text' },
      { field: 'descricao', header: 'Descrição', width: '150px', type: 'text' },
      { field: 'status', header: 'Status', width: '80px', type: 'boolean' },
    ];
  }

  refresh() {}

  onClear() {}

  carregarStatus() {
    this.ngxspinner.show();
    this.statusService
      .listarStatus()
      .then((obj) => {
        this.status = obj;
        this.ngxspinner.hide();
      })
      .catch((erro) => {
        this.ngxspinner.hide();
        //this.errorHandler.handle(erro);
      });
  }
}
