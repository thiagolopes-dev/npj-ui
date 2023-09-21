import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

import { Regex } from 'src/app/core/validators/regex.model';
import { Status } from 'src/app/core/models/status.model';
import { StatusService } from '../status.service';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';

@Component({
  selector: 'app-cadastro-status',
  templateUrl: './cadastro-status.component.html',
  styleUrls: ['./cadastro-status.component.css'],
})
export class CadastroStatusComponent {
  regex = new Regex();
  newstatus = new Status();
  idstatus: string;
  salvando: boolean;

  constructor(
    private statusService: StatusService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    //private errorHandler: ErrorHandlerService,
  ) // public auth: AuthService,
  {}

  ngOnInit() {
    this.idstatus = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Vara');

    if (this.idstatus) {
      this.spinner.show();
      this.carregarStatus(this.idstatus);
    } else {
      this.newstatus.status = true;
    }
  }

  get editando() {
    return Boolean(this.newstatus.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarStatus(form);
    } else {
      this.adicionarStatus(form);
    }
  }

  adicionarStatus(form: NgForm) {
    this.salvando = true;
    this.statusService
      .adicionarStatus(this.newstatus)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Status',
          detail: `${obj.descricao}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/status']);
      })
      .catch((erro) => {
        this.salvando = false;
        // this.errorHandler.handle(erro);
      });
  }
  atualizarStatus(form: NgForm) {
    this.salvando = true;
    this.statusService
      .atualizarStatus(this.newstatus)
      .then((obj) => {
        this.newstatus = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'Status',
          detail: `${obj.descricao}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/Status']);
      })
      .catch((erro) => {
        this.salvando = false;
        // this.errorHandler.handle(erro);
      });
  }
  carregarStatus(id: string) {
    this.statusService
      .buscarPorID(id)
      .then((obj) => {
        this.newstatus = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Status: ${this.newstatus.descricao}`);
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newstatus.descricao}</b> ?`,
      accept: () => {
        this.excluir(this.idstatus);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'warn',
              summary: 'Ação cancelada',
              detail: 'Você cancelou',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'error',
              summary: 'Ação rejeitada',
              detail: 'Você rejeitou',
            });
            break;
        }
      },
    });
  }

  excluir(id: any) {
    this.statusService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Status',
          detail: `${this.newstatus.descricao}, excluído com sucesso!`,
        });
        this.router.navigate(['/status']);
      })
      .catch((erro) => {
        // this.errorHandler.handle(erro);
      });
  }
}
