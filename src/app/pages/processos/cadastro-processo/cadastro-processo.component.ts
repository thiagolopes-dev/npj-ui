import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as cpfCnpj from 'cpf-cnpj-validator';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { ItensProcesso, Partes, Processos } from 'src/app/core/models/processo.model';
import { Regex } from 'src/app/core/validators/regex.model';
import { AgendamentosService } from '../../agendamentos/agendamentos.service';
import { MotivosService } from '../../motivos/motivos.service';
import { AuthService } from '../../seguranca/auth.service';
import { StatusService } from '../../status/status.service';
import { VarasService } from '../../varas/varas.service';
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
  clientes = [];
  motivos = [];
  varas = [];
  username: string | null;
  statusoptions = [];
  descricoes: any[] = [];
  displayTextarea = false;
  visible: boolean = false;
  itensprocesso: ItensProcesso;
  partes: Partes;
  infoIndex: number;
  parteIndex: number;
  showDialogProcesso: boolean = false;
  showDialogParte: boolean = false;
  colsInfo = [];
  colsPartes = [];
  cpfValid = false;
  stringCpf = '';

  constructor(
    private processoService: ProcessosService,
    private agendamentoService: AgendamentosService,
    private motivosService: MotivosService,
    private statusService: StatusService,
    private varasService: VarasService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
  ) {
    this.newprocesso.itensprocesso = [];
  }

  ngOnInit() {
    this.newprocesso.datacriacao = new Date();
    this.idprocesso = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de processos');
    this.carregarClientes();
    //this.carregarMotivos();
    this.carregarStatus();
    this.carregarVaras();
    if (this.idprocesso) {
      this.spinner.show();
      this.carregarProcessos(this.idprocesso);
    } else {
    }

    this.colsInfo = [
      // { field: 'codigo', header: 'Código', width: '100px' },
      { field: 'cpf', header: 'Informações', width: '250px' },
      { field: 'datacriacao', header: 'Data Criação', width: '130px', data: true, format: `dd/MM/yyyy H:mm`, },
      { field: 'usuariocriacao', header: 'Usuário Criação', width: '150px' },

    ];

    this.colsPartes = [
      { field: 'nome', header: 'Nome', width: '250px' },
      { field: 'cpf', header: 'CPF', width: '150px' },
      { field: 'whats', header: 'Whats', width: '150px' },
      { field: 'telefone', header: 'Telefone', width: '150px' },
      { field: 'email', header: 'E-mail', width: '200px' },
      { field: 'datacriacao', header: 'Data Criação', width: '130px', data: true, format: `dd/MM/yyyy H:mm`, },
      { field: 'usuariocriacao', header: 'Usuário Criação', width: '150px' },
    ];
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
    this.salvando = true;
    this.mostrarToast = true;
    this.processoService
      .adicionarProcessos(this.newprocesso)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Processo',
          detail: `${obj.numeroprocesso}, adicionado com sucesso!`,
          life: 10000,
        });
        this.salvando = false;
        this.router.navigate(['/processos']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  atualizarProcesso(form: NgForm) {
    this.salvando = true;
    this.processoService
      .atualizarProcessos(this.newprocesso)
      .then((obj) => {
        this.newprocesso = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'processo',
          detail: `${obj.numeroprocesso}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/processos']);
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
        if(!this.newprocesso.partes){
          this.newprocesso.partes = [];
        }
        this.atribuirMotivos(obj);
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
      `Edição de processo: ${this.newprocesso.numeroprocesso}`,
    );
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newprocesso.numeroprocesso}</b> ?`,
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
          detail: `${this.newprocesso.numeroprocesso}, excluído com sucesso!`,
        });
        this.router.navigate(['/processo']);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarClientes() {
    return this.agendamentoService
      .ListarDrop()
      .then((response) => {
        this.clientes = response.map((agendamento) => ({
          nome: agendamento.cliente.nome,
          codigo: agendamento.cliente.codigo,
          id: agendamento._id
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }


  // carregarMotivos() {
  //   return this.motivosService
  //     .ListarDrop()
  //     .then((response) => {
  //       this.motivos = response.map((motivo) => ({
  //         descricao: motivo.descricao,
  //         codigo: motivo.codigo,
  //       }));
  //     })
  //     .catch((erro) => {
  //       this.errorHandler.handle(erro);
  //     });
  // }

  carregarVaras() {
    return this.varasService
      .ListarDrop()
      .then((response) => {
        this.varas = response.map((vara) => ({
          descricao: vara.descricao,
          codigo: vara.codigo,
        }));
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  carregarStatus() {
    return this.statusService
      .listarDropProcesso()
      .then((response) => {
        this.statusoptions = response.map((status) => ({
          descricao: status.descricao,
          codigo: status.codigo,
        }));
        if (!this.idprocesso) {
          this.atribuirStatus();
        }
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  atribuirStatus() {
    this.newprocesso.status = this.statusoptions.find(
      (obj) => obj.descricao === 'PETICAO INICIAL'
    );
  }

  carregarDadosCliente(event: any) {
    this.agendamentoService
      .buscarClienteID(event.value.id)
      .then((obj: any) => {
        this.atribuirMotivos(obj);
      })
      .catch((erro) => {
        this.errorHandler.handle(erro)
      });
  }

  atribuirMotivos(obj: any) {
    this.motivos = [];
    this.motivos.push(obj.motivo);
    setTimeout(() => {
      this.newprocesso.motivo = this.motivos.find(
        (element) => element.codigo === obj.motivo?.codigo
      );

    }, 100);
  }


  prepararNovaInfo() {
    this.showDialogProcesso = true;
    this.itensprocesso = new ItensProcesso();
  }

  preparaEdicaoInfo(info: ItensProcesso, index: number) {
    this.itensprocesso = { ...info };
    this.showDialogProcesso = true;
    this.infoIndex = index;
  }

  confirmarItensProcesso(frm: NgForm) {
    this.itensprocesso.usuariocriacao = this.auth.jwtPayload.username;
    this.itensprocesso.datacriacao = new Date();
    this.newprocesso.itensprocesso.push({ ...this.itensprocesso });
    this.showDialogProcesso = false;
    frm.reset();
  }

  removerInfo(index: number) {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir ?`,
      accept: () => {
        this.newprocesso.itensprocesso.splice(index, 1);
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

  validateCPFCNPJ() {
    if (this.partes.cpf.length === 11) {
      if (cpfCnpj.cpf.isValid(this.partes.cpf)) {
        this.cpfValid = false;
      } else {
        this.cpfValid = true;
        this.stringCpf = 'CPF é Inválido';
      }
    }
  }

  prepararNovaParte(){
    this.showDialogParte = true;
    this.partes = new Partes();
    this.parteIndex = this.newprocesso.partes.length;
  }

  preparaEdicaoPartes(parte: Partes, index: number) {
    this.partes = { ...parte };
    this.showDialogParte = true;
    this.parteIndex = index;
  }

  removerParte(index: number){
    this.newprocesso.partes.splice(index, 1);
  }

  confirmarParte(frm: NgForm) {
    this.partes.usuariocriacao = this.auth.jwtPayload.username;
    this.partes.datacriacao = new Date();
    this.newprocesso.partes[this.parteIndex] = { ... this.partes};
    // this.newprocesso.partes.push({ ...this.partes });
    this.showDialogParte = false;
    frm.reset();
  }
}
