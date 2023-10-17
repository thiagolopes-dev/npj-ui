import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
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

import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { Acompanhamentos } from 'src/app/core/models/acompanhamentos.model';
import { AcompanhamentosService } from '../acompanhamentos.service';

@Component({
  selector: 'app-cadastro-acompanhamento',
  templateUrl: './cadastro-acompanhamento.component.html',
  styleUrls: ['./cadastro-acompanhamento.component.css'],
})
export class CadastroAcompanhamentoComponent {
  @ViewChild('formAcompanhamento') formAcompanhamento: NgForm;

  regex = new Regex();
  newacompanhamento = new Acompanhamentos();
  idacompanhamento: string;
  salvando: boolean;
  mostrarToast: true;

  constructor(
    private acompanhamentoService: AcompanhamentosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService, // public auth: AuthService,
  ) {}

  ngOnInit() {
    this.newacompanhamento.status = true;
    this.idacompanhamento = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de acompanhamentos');

    if (this.idacompanhamento) {
      this.spinner.show();
      this.carregarAcompanhamentos(this.idacompanhamento);
    } else {
      this.newacompanhamento.status = true;
    }
  }

  get editando() {
    return Boolean(this.newacompanhamento._id);
  }

  salvar(form: NgForm) {
    if (form.invalid) {
      return; //Não prosseguir se o formulário não for válido
    }

    if (this.editando) {
      this.atualizarAcompanhamento(form);
    } else {
      this.adicionarAcompanhamento(form);
    }
  }

  adicionarAcompanhamento(form: NgForm) {
    console.log('entrei no adicionar');
    this.salvando = true;
    this.mostrarToast = true;
    this.acompanhamentoService
      .adicionarAcompanhamentos(this.newacompanhamento)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'acompanhamento',
          detail: `${obj.numeroProcesso}, adicionado com sucesso!`,
          life: 10000,
        });
        this.salvando = false;
        this.router.navigate(['/acompanhamento']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarAcompanhamento(form: NgForm) {
    console.log('entrei no atualizar');
    this.salvando = true;
    this.acompanhamentoService
      .atualizarAcompanhamentos(this.newacompanhamento)
      .then((obj) => {
        this.newacompanhamento = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'acompanhamento',
          detail: `${obj.numeroProcesso}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/acompanhamento']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarAcompanhamentos(_id: string) {
    this.acompanhamentoService
      .buscarPorID(_id)
      .then((obj) => {
        this.newacompanhamento = obj;
        console.log(obj);
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(
      `Edição de Acompanhamento: ${this.newacompanhamento.numeroProcesso}`,
    );
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newacompanhamento.numeroProcesso}</b> ?`,
      accept: () => {
        this.excluir(this.newacompanhamento._id);
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

  excluir(_id: any) {
    this.acompanhamentoService
      .excluir(_id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Acompanhamento',
          detail: `${this.newacompanhamento.numeroProcesso}, excluído com sucesso!`,
        });
        this.router.navigate(['/acompanhamento']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }
}
