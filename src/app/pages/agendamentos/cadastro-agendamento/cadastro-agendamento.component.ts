import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { Regex } from 'src/app/core/validators/regex.model';
import { AgendamentosService } from '../agendamentos.service';
import { Agendamento } from 'src/app/core/models/agendamento.model';


@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.css']
})
export class CadastroAgendamentoComponent{
  @ViewChild('formAgendamento') formAgendamento: NgForm;

  regex = new Regex();
  newagendamento = new Agendamento();
  idagendamento: string;
  salvando: boolean;
  mostrarToast: true;

  constructor(
    private agendamentoService: AgendamentosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService, // public auth: AuthService,
  ) {}

  ngOnInit() {
    this.newagendamento.status = true;
    this.idagendamento = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Agendamentos');

    if (this.idagendamento) {
      this.spinner.show();
      this.carregarAgendamentos(this.idagendamento);
    } else {
      this.newagendamento.status = true;
    }
  }

  get editando() {
    return Boolean(this.newagendamento._id);
  }

  salvar(form: NgForm) {
    if (form.invalid) {
      return; //Não prosseguir se o formulário não for válido
    }

    if (this.editando) {
      this.atualizarAgendamento(form);
    } else {
      this.adicionarAgendamento(form);
    }
  }

  adicionarAgendamento(form: NgForm) {
    console.log('entrei no adicionar');
    this.salvando = true;
    this.mostrarToast = true;
    this.agendamentoService
      .adicionarAgendamento(this.newagendamento)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'agendamento',
          detail: `${obj.cliente}, Agendado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/agendamento']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarAgendamento(form: NgForm) {
    console.log('entrei no atualizar');
    this.salvando = true;
    this.agendamentoService
      .atualizarAgendamentos(this.newagendamento)
      .then((obj) => {
        this.newagendamento = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'agendamento',
          detail: `${obj.cliente}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/agendamento']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarAgendamentos(_id: string) {
    this.agendamentoService
      .buscarPorID(_id)
      .then((obj) => {
        this.newagendamento = obj;
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
      `Edição de Agendamento: ${this.newagendamento.cliente}`,
    );
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newagendamento.cliente}</b> ?`,
      accept: () => {
        this.excluir(this.newagendamento._id);
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
    this.agendamentoService
      .excluir(_id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Agendamento',
          detail: `${this.newagendamento.cliente}, excluído com sucesso!`,
        });
        this.router.navigate(['/agendamento']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }
}
