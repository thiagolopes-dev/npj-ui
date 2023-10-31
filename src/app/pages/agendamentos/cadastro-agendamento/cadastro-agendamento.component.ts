import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { Agendamento } from 'src/app/core/models/agendamento.model';
import { Regex } from 'src/app/core/validators/regex.model';
import { ClientesService } from '../../clientes/clientes.service';
import { AgendamentosService } from '../agendamentos.service';


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
  clientes = [];

  constructor(
    private agendamentoService: AgendamentosService,
    private clientesService: ClientesService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService, // public auth: AuthService,
  ) {}

  ngOnInit() {
    this.newagendamento.dataatendimento = new Date();
    this.newagendamento.status = true;
    this.idagendamento = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Agendamentos');
    this.carregarClientes();
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
          detail: `${obj.clientes}, Agendado com sucesso!`,
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
          detail: `${obj.clientes}, alterado com sucesso!`,
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
      `Edição de Agendamento: ${this.newagendamento.clientes}`,
    );
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newagendamento.clientes}</b> ?`,
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
          detail: `${this.newagendamento.clientes}, excluído com sucesso!`,
        });
        this.router.navigate(['/agendamento']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarClientes() {
    return this.clientesService
      .listarClientes()
      .then((response) => {
        const clientes = response.data; // Acesse a lista de clientes dentro de "data"
        console.log(clientes); // Verifique se você recebe a lista de clientes no console
        this.clientes = clientes.map((cliente) => ({
          label: cliente.nome,
          value: cliente.codigo,
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }
  
  
}
