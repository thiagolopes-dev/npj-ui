import { Component, ViewChild } from '@angular/core';
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
import { ClientesService } from '../../clientes/clientes.service';
import { MotivosService } from '../../motivos/motivos.service';
import { AuthService } from '../../seguranca/auth.service';
import { StatusService } from '../../status/status.service';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { VarasService } from '../../varas/varas.service';
import { ProcessosService } from '../processos.service';
import { Usuarios } from 'src/app/core/models/usuarios.model';

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
  usuarios = new Usuarios();
  statusoptions = [];
  descricoes: any[] = [];
  displayTextarea = false;
  visible: boolean = false;


  tabProcessoInformacoesAtiva: boolean = false;
  showDialog: boolean = false;
  novaDescricao: string = '';

  constructor(
    private processoService: ProcessosService,
    private clientesService: ClientesService,
    private motivosService: MotivosService,
    private statusService: StatusService,
    private varasService: VarasService,
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    this.newprocesso.itensprocesso.datacriacao = new Date();
    this.idprocesso = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de processos');
    this.carregarClientes();
    this.carregarMotivos();
    this.carregarStatus();
    this.carregarVaras();
    if (this.idprocesso) {
      this.spinner.show();
      this.carregarProcessos(this.idprocesso);
    } else {
    }
  }

  onTabChange(event: any) {
    if (event.index === 1) {
      this.tabProcessoInformacoesAtiva = true;
    } else {
      this.tabProcessoInformacoesAtiva = false;
    }
    console.log('tabProcessoInformacoesAtiva:', this.tabProcessoInformacoesAtiva);
  }
  abrirDialog() {
    this.showDialog = true;
  }
  salvarDescricao() {
    // Adicione a nova descrição à lista
    this.descricoes.push({
      usuario: this.newprocesso.itensprocesso.usuariocriacao,
      descricao: this.novaDescricao,
      dataCriacao: this.newprocesso.itensprocesso.datacriacao,
    });
  
    // Limpe o campo de descrição
    this.novaDescricao = '';
  
    // Feche o diálogo
    this.showDialog = false;
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
    this.salvando = true;
    this.mostrarToast = true; // Substitua pela lógica real para obter o usuário
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

  // TODO Resolver o porque varas não aparece
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
      .ListarDrop()
      .then((response) => {
        this.statusoptions = response.map((status) => ({
          descricao: status.descricao,
          codigo: status.codigo,
        }));
        if(!this.idprocesso){
          this.atribuirStatus();
        }
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
      });
  }

  atribuirStatus() {
    this.newprocesso.status = this.statusoptions.find(
      (obj) => obj.descricao === 'ABERTO'
    );
  }

}
