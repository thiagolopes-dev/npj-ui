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
import { VarasService } from '../varas.service';
import { Varas } from 'src/app/core/models/varas.model';

@Component({
  selector: 'app-cadastro-varas',
  templateUrl: './cadastro-varas.component.html',
  styleUrls: ['./cadastro-varas.component.css'],
})
export class CadastroVaraComponent {
  regex = new Regex();
  newvara = new Varas();
  idvara: string;
  salvando: boolean;

  constructor(
    private varaService: VarasService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
  ) // private errorHandler: ErrorHandlerService,
  // public auth: AuthService,
  {}

  ngOnInit() {
    this.idvara = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Vara');

    if (this.idvara) {
      this.spinner.show();
      this.carregarVara(this.idvara);
    } else {
      this.newvara.status = true;
    }
  }

  get editando() {
    return Boolean(this.newvara.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarVara(form);
    } else {
      this.adicionarVara(form);
    }
  }

  adicionarVara(form: NgForm) {
    this.salvando = true;
    this.varaService
      .adicionarVara(this.newvara)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Vara',
          detail: `${obj.descricao}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/varas']);
      })
      .catch((erro) => {
        this.salvando = false;
        // this.errorHandler.handle(erro);
      });
  }
  atualizarVara(form: NgForm) {
    this.salvando = true;
    this.varaService
      .atualizarVaras(this.newvara)
      .then((obj) => {
        this.newvara = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'Vara',
          detail: `${obj.descricao}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/varas']);
      })
      .catch((erro) => {
        this.salvando = false;
        // this.errorHandler.handle(erro);
      });
  }
  carregarVara(id: string) {
    this.varaService
      .buscarPorID(id)
      .then((obj) => {
        this.newvara = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        // this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Vara: ${this.newvara.descricao}`);
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newvara.descricao}</b> ?`,
      accept: () => {
        this.excluir(this.idvara);
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
    this.varaService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Vara',
          detail: `${this.newvara.descricao}, excluído com sucesso!`,
        });
        this.router.navigate(['/varas']);
      })
      .catch((erro) => {
        // this.errorHandler.handle(erro);
      });
  }
}
