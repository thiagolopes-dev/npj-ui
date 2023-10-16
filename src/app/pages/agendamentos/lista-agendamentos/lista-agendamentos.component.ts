import { Component, OnInit, ViewChild } from '@angular/core';
import { Agendamento } from 'src/app/core/models/agendamento.model';
import { Title } from '@angular/platform-browser';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { AgendamentosService } from '../agendamentos.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-lista-agendamentos',
  templateUrl: './lista-agendamentos.component.html',
  styleUrls: ['./lista-agendamentos.component.css']
})
export class ListaAgendamentosComponent implements OnInit {
  
@ViewChild('tabela') table: Table;

rowsPerPageTable: number[] = [10, 20, 30, 50, 100, 200];
messagePageReport: 'Mostrando {first} a {last} de {totalRecords} registros';
newagendamento= new Agendamento();
cols: any[] | undefined;
agendamento: any;


constructor(
  private title: Title,
  private agendamentoService: AgendamentosService,
  private ngxspinner: NgxSpinnerService,
  private errorHandler: ErrorHandlerService
) {}

ngOnInit(): void {
  this.title.setTitle('Lista de Agendamentos');
  this.carregarAgendamentos();

  this.cols = [
    { field: 'atendimento', header: 'Atendimento', width: '80px', type: 'text' },
    { field: 'id', header: 'Codigo', width: '80px', type: 'text' },
    { field: 'ClienteAgenda', header: 'Nome', width: '150px', type: 'text' },
    { field: 'dataatendimento', header: 'Data atendimento', width: '150px', type: 'text' },
    { field: 'MotivoAgenda', header: 'Motivo', width: '150px', type: 'text' },
    { field: 'numeroprontuario', header: 'Numero prontuario', width: '150px', type: 'text' },
    { field: 'StatusAgenda', header: 'Status', width: '150px', type: 'text' },
  ];
}

refresh(): void {
  this.carregarAgendamentos();
}

onClear() {}

carregarAgendamentos() {
  this.ngxspinner.show();
  this.agendamentoService
    .listarAgendamentos()
    .then((obj) => {
      this.newagendamento = obj;
      this.ngxspinner.hide();
    })
    .catch((erro) => {
      this.ngxspinner.hide();
      this.errorHandler.handle(erro);
    });
}

valoragendamento(_id: string){
  console.log(_id);
}
}