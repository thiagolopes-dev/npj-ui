import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { Motivos } from 'src/app/core/models/motivos.model';
import { MotivosService } from '../motivos.service';

@Component({
  selector: 'app-lista-motivos',
  templateUrl: './lista-motivos.component.html',
  styleUrls: ['./lista-motivos.component.css'],
})
export class ListaMotivosComponent implements OnInit {
  @ViewChild('tabela') table: Table;

  rowsPerPageTable: number[] = [10, 20, 30, 50, 100, 200];
  messagePageReport: 'Mostrando {first} a {last} de {totalRecords} registros';
  newmotivos= new Motivos();
  cols: any[] | undefined;


  constructor(
    private title: Title,
    private motivoService: MotivosService,
    private ngxspinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Lista de Motivos');
    this.carregarMotivos();

    this.cols = [
      { field: 'codigo', header: 'Código', width: '80px', type: 'text' },
      { field: 'descricao', header: 'Descrição', width: '150px', type: 'text' },
      { field: 'status', header: 'Status', width: '80px', type: 'boolean' },
    ];
  }

  refresh(): void {
    window.location.reload();
}

  onClear() {
    this.newmotivos._id = null;
    this.newmotivos.descricao = null;
    this.newmotivos.status = null;
    console.log(this.onClear)
  }

  carregarMotivos() {
    this.ngxspinner.show();
    this.motivoService
      .listarMotivos()
      .then((obj) => {
        this.newmotivos = obj;
        this.ngxspinner.hide();
      })
      .catch((erro) => {
        this.ngxspinner.hide();
        this.errorHandler.handle(erro);
      });
  }
}