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
import { Processos } from 'src/app/core/models/processo.model';
import { ProcessosService } from '../processos.service';

@Component({
  selector: 'app-cadastro-processo',
  templateUrl: './cadastro-processo.component.html',
  styleUrls: ['./cadastro-processo.component.css'],
})
export class CadastroProcessoComponent {
  @ViewChild('formProcesso') formProcesso: NgForm;

  regex = new Regex();
  newprocesso = new Processos();
  idprocesso: string;
  salvando: boolean;
  mostrarToast: true;

  displayTextarea = false;


  constructor(
    private processoService: ProcessosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService, // public auth: AuthService,
  ) {}

  ngOnInit() {
    this.newprocesso.processos.datacriacao = new Date();
    this.newprocesso.status = true;
    this.idprocesso = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de processos');

    if (this.idprocesso) {
      this.spinner.show();
      this.carregarProcessos(this.idprocesso);
    } else {
      this.newprocesso.status = true;
    }
  }

  toggleTextarea() {
    this.displayTextarea = !this.displayTextarea;
  }

  get editando() {
    return Boolean(this.newprocesso._id);
  }

  salvar(form: NgForm) {
    if (form.invalid) {
      return; //Não prosseguir se o formulário não for válido
    }

    if (this.editando) {
      this.atualizarProcesso(form);
    } else {
      this.adicionarProcesso(form);
    }
  }

  adicionarProcesso(form: NgForm) {
    console.log('entrei no adicionar');
    this.salvando = true;
    this.mostrarToast = true;
    this.processoService
      .adicionarProcessos(this.newprocesso)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'processo',
          detail: `${obj.numeroProcesso}, adicionado com sucesso!`,
          life: 10000,
        });
        this.salvando = false;
        this.router.navigate(['/processo']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarProcesso(form: NgForm) {
    console.log('entrei no atualizar');
    this.salvando = true;
    this.processoService
      .atualizarProcessos(this.newprocesso)
      .then((obj) => {
        this.newprocesso = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'processo',
          detail: `${obj.numeroProcesso}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/processo']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarProcessos(_id: string) {
    this.processoService
      .buscarPorID(_id)
      .then((obj) => {
        this.newprocesso = obj;
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
      `Edição de processo: ${this.newprocesso.numeroProcesso}`,
    );
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newprocesso.numeroProcesso}</b> ?`,
      accept: () => {
        this.excluir(this.newprocesso._id);
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
    this.processoService
      .excluir(_id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'processo',
          detail: `${this.newprocesso.numeroProcesso}, excluído com sucesso!`,
        });
        this.router.navigate(['/processo']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }
}
