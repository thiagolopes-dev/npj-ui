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
import { Clientes } from 'src/app/core/models/cliente.model';
import { Regex } from 'src/app/core/validators/regex.model';
import { ClientesService } from '../clientes.service';

import { HttpClient } from '@angular/common/http';
import * as cpfCnpj from 'cpf-cnpj-validator';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { GovService } from 'src/app/core/services/gov.service';
import { ValidationService } from 'src/app/core/services/validations.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
})
export class CadastroClienteComponent {
  regex = new Regex();
  newcliente = new Clientes();
  salvando: boolean;
  estados = [];
  cidades = [];
  cidadesFiltradas = [];
  http: any;
  regexNumeros: RegExp = /^\d+$/;
  idcliente: number;
  cpfValid = false;
  stringCpf = '';

  constructor(
    private clienteService: ClientesService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private confirmation: ConfirmationService,
    private spinner: NgxSpinnerService,
    private errorHandler: ErrorHandlerService,
    private httpCliente: HttpClient,
    private govService: GovService,
    private validationService: ValidationService
  ) // public auth: AuthService,
  {}

  ngOnInit() {
    this.carregarEstados();
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
    return Boolean(this.newcliente._id);
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
        this.errorHandler.handle(erro);
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
        this.errorHandler.handle(erro);
      });
  }
  carregarCliente(id: number) {
    this.clienteService
      .buscarPorID(id)
      .then((obj) => {
        this.newcliente = obj;
        this.atualizarTituloEdicao();
        this.spinner.hide();
        if(this.newcliente.uf){
          const uf = this.newcliente.uf;
          setTimeout(() => {
            this.buscarCidades(uf);
          }, 300);
        }
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
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
        this.errorHandler.handle(erro);
      });
  }

  // getCep() {
  // const cep = this.newcliente.cep;
  // this.clienteService.consultaCEP(cep).subscribe(
  //   (endereco: any) => {
  //     if (endereco.erro) {
  //       alert('CEP não encontrado. Por favor, verifique o CEP.');
  //     } else {
  //       // Preencha as informações do cliente com os dados da API
  //       this.newcliente.logradouro = endereco.street.toUpperCase();
  //           this.newcliente.uf = endereco.state.toUpperCase();
  //           this.newcliente.bairro = endereco.neighborhood.toUpperCase();
  //           this.newcliente.cidade = endereco.city.toUpperCase();
  //     }
  //         },
  //         (error: any) => {
  //           console.error(error);
  //         }
  //       );
  // }

  clearInputs() {
    this.newcliente = {}; // Limpa as informações do cliente      
    this.newcliente.cep = '';
  }

  carregarEstados() {
    this.govService.getUf().then((obj) => {
      this.estados = obj;
      if (this.idcliente) {
        this.carregarCliente(this.idcliente);
      } else {
        this.newcliente.status = true;
        this.spinner.hide();
      }
    });
  }

  buscarCidades(value: string) {
    this.spinner.show();
    this.govService
      .getCidades(value)
      .then((obj) => {
        this.cidadesFiltradas = obj;
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }

  consultaCEP(cep, form) {
    this.spinner.show();
    cep = cep.replace(/\D/g, '');
    if (cep != null && cep !== '') {
      this.govService.consultaCEP(cep).subscribe({
        next: (dados) => {
          this.populaCepForm(dados, form);
        },
        error: (e) => {
          this.resetaCepForm(form);
          this.spinner.hide();
          this.messageService.add({
            severity: 'info',
            summary: 'Atenção',
            detail: `Erro ao buscar cep!`,
          });
        },
      });
    } else {
      this.spinner.hide();
    }
  }

  populaCepForm(dados, formulario) {
    formulario.form.patchValue({
      logradouro: dados.street?.toUpperCase(),
      bairro: dados.neighborhood?.toUpperCase(),
      cidade: dados.city?.toUpperCase(),
      uf: dados.state?.toUpperCase(),
    });
    const uf = dados.state;
    this.buscarCidades(uf);
    const cidade = this.validationService
      .removeAcento(dados.city)
      .toUpperCase();
    setTimeout(() => {
      this.newcliente.cidade = cidade;
      this.spinner.hide();
    }, 380);
  }

  resetaCepForm(formulario) {
    formulario.form.patchValue({
      logradouro: null,
      bairro: null,
      numero: null,
      complemento: null,
      uf: null,
      cidade: null,
    });
  }

  validateCPFCNPJ() {
    if (this.newcliente.cpf.length === 11) {
      if (cpfCnpj.cpf.isValid(this.newcliente.cpf)) {
        this.cpfValid = false;
      } else {
        this.cpfValid = true;
        this.stringCpf = 'CPF é Inválido';
      }
    }
  }
}
