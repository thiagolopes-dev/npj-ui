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
import { ClientesService } from '../clientes.service';
import { Clientes } from 'src/app/core/models/cliente.model';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
})
export class CadastroClienteComponent {
  regex = new Regex();
  newcliente = new Clientes();
  idcliente: string;
  salvando: boolean;

  constructor(
    private clienteService: ClientesService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    // private errorHandler: ErrorHandlerService,
    // public auth: AuthService,
  ) {}

  ngOnInit() {
    this.idcliente = this.route.snapshot.params['id'];
    this.title.setTitle('Cadastro de Cliente');

    if (this.idcliente) {
      this.spinner.show();
      this.carregarCliente(this.idcliente);
    } else {
      this.newcliente.status = true;
    }
  }

  get editando() {
    return Boolean(this.newcliente.id);
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarClientes(form);
    } else {
      this.adicionarCliente(form);
    }
  }

  adicionarCliente(form: NgForm) {
    this.salvando = true;
    this.clienteService
      .adicionarCliente(this.newcliente)
      .then((obj) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Cliente',
          detail: `${obj.nome}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/clientes']);
      })
      .catch((erro) => {
        this.salvando = false;
        //this.errorHandler.handle(erro);
      });
  }
  atualizarClientes(form: NgForm) {
    this.salvando = true;
    this.clienteService
      .atualizarClientes(this.newcliente)
      .then((obj) => {
        this.newcliente = obj;
        this.messageService.add({
          severity: 'info',
          summary: 'Cliente',
          detail: `${obj.nome}, alterado com sucesso!`,
        });
        this.atualizarTituloEdicao();
        this.salvando = false;
        this.router.navigate(['/clientes']);
      })
      .catch((erro) => {
        this.salvando = false;
        //this.errorHandler.handle(erro);
      });
  }
  carregarCliente(id: string) {
    this.clienteService
      .buscarPorID(id)
      .then((obj) => {
        this.newcliente = obj;
        this.atualizarTituloEdicao();
        //this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        //this.errorHandler.handle(erro);
      });
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Cliente: ${this.newcliente.nome}`);
  }

  confirmarExclusao() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja excluir: <b>${this.newcliente.nome}</b> ?`,
      accept: () => {
        this.excluir(this.idcliente);
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
    this.clienteService
      .excluir(id)
      .then(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Cliente',
          detail: `${this.newcliente.nome}, excluído com sucesso!`,
        });
        this.router.navigate(['/clientes']);
      })
      .catch((erro) => {
        //this.errorHandler.handle(erro);
      });
  }
}
