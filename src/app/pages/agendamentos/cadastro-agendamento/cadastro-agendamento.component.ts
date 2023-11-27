import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { Agendamentos } from 'src/app/core/models/agendamento.model';
import { Regex } from 'src/app/core/validators/regex.model';
import { ClientesService } from '../../clientes/clientes.service';
import { MotivosService } from '../../motivos/motivos.service';
import { AuthService } from '../../seguranca/auth.service';
import { StatusService } from '../../status/status.service';
import { AgendamentosService } from '../agendamentos.service';


@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.css']
})
export class CadastroAgendamentoComponent {
  @ViewChild('formAgendamento') formAgendamento: NgForm;

  regex = new Regex();
  newagendamento = new Agendamentos();
  idagendamento: string;
  salvando: boolean;
  mostrarToast: true;
  clientes = [];
  motivos = [];
  statusoptions = [];

  constructor(
    private agendamentoService: AgendamentosService,
    private clientesService: ClientesService,
    private motivosService: MotivosService,
    private statusService: StatusService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
  ) { }

  ngOnInit() {
    this.newagendamento.dataatendimento = new Date();
    this.idagendamento = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Agendamentos');
    this.carregarClientes();
    this.carregarMotivos();
    this.carregarStatus();
    if (this.idagendamento) {
      this.spinner.show();
      this.carregarAgendamentos(this.idagendamento);
    } else {

    }
  }

  get editando() {
    return Boolean(this.newagendamento._id);
  }

  salvar(form: NgForm) {
    if (form.invalid) {
      return; //Não prosseguir se o formulário não for válido
    }
      this.removeHrsDataAtendimento();
    if (this.editando) {
      this.atualizarAgendamento(form);
    } else {
      this.adicionarAgendamento(form);
    }
  }

  //pode estar deixando a data errdada 
  removeHrsDataAtendimento(){
      let horaformatada =  moment(this.newagendamento.dataatendimento).format("YYYY-MM-DD");
      this.newagendamento.dataatendimento = new Date(horaformatada);
  }

  adicionarAgendamento(form: NgForm) {
    this.salvando = true;
    this.mostrarToast = true;
    this.agendamentoService
      .adicionarAgendamento(this.newagendamento)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Agendamento',
          detail: `${obj.cliente.nome}, realizado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/agendamentos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  atualizarAgendamento(form: NgForm) {
    this.salvando = true;
    this.agendamentoService
      .atualizarAgendamentos(this.newagendamento)
      .then((obj) => {
        this.newagendamento = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'Agendamento',
          detail: `${obj.cliente.nome}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/agendamentos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  carregarAgendamentos(_id: string) {
    this.agendamentoService
      .buscarPorID(_id)
      .then((obj: Agendamentos) => {
        this.newagendamento = obj;
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
      `Edição de Agendamento: ${this.newagendamento.cliente.nome}`,
    );
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newagendamento.cliente.nome}</b> ?`,
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

  carregarClientes() {
    return this.clientesService
      .ListarDrop()
      .then((response) => {
        this.clientes = response.map((cliente) => ({
          nome: cliente.nome,
          codigo: cliente.codigo,
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarMotivos() {
    return this.motivosService
      .ListarDrop()
      .then((response) => {
        this.motivos = response.map((motivo) => ({
          descricao: motivo.descricao,
          codigo: motivo.codigo,
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarStatus() {
    return this.statusService
      .listarDropAgendamento()
      .then((response) => {
        this.statusoptions = response.map((status) => ({
          descricao: status.descricao,
          codigo: status.codigo,
        }));
        if(!this.idagendamento){
          this.atribuirStatus();
        }
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  atribuirStatus() {
    this.newagendamento.status = this.statusoptions.find(
      (obj) => obj.descricao === 'EM ANÁLISE'
    );
  }
}
