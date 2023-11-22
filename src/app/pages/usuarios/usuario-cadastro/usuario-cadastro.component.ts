import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Subject, fromEvent, takeUntil } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { Regex } from 'src/app/core/validators/regex.model';
import { AuthService } from '../../seguranca/auth.service';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  usuario = new Usuarios();
  salvando: boolean = false;
  regex = new Regex();
  id: number;
  selectedRows: any;
  displayMsg = false;
  usuSend = new Usuarios();
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  rowsPerPageTable: number[] = [10, 15, 25, 50, 100, 200];

  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private title: Title,
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Cadastro de Usuário');
    this.id = this.route.snapshot.params['id'];
  }

  ngAfterViewInit() {
    if (this.id) {
      this.spinner.show();
      this.carregarUsuario(this.id);
    } else {
      setTimeout(() => {
        this.usuario.status = true;
        this.usuario.permissao.motivos = false;
        this.usuario.permissao.varas = false;
        this.usuario.permissao.status = false;
        this.usuario.permissao.clientes = false;
        this.usuario.permissao.agendamentos = false;
        this.usuario.permissao.processos = false;
        this.usuario.permissao.usuarios = false;
      });

      history.pushState(null, '');
      fromEvent(window, 'popstate').pipe(
        takeUntil(this.unsubscriber)
      ).subscribe((_) => {
        history.pushState(null, '');
        this.validaBackRoute(this.form);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  get editando() {
    return Boolean(this.usuario._id);
  }


  carregarUsuario(id: number) {
    this.usuarioService
      .buscarPorId(id)
      .then((usuario: any) => {
        this.usuario = usuario;
        this.atualizarTituloEdicao();
        this.spinner.hide();
      })
      .catch((erro) => {
        this.errorHandler.handle(erro);
        this.spinner.hide();
      });
  }

  atualizarUsuario(form: NgForm) {
    let body = {
      _id: this.usuario._id,
      name: this.usuario.name,
      status: this.usuario.status,
      permissao: this.usuario.permissao
    }

    this.salvando = true;
    
    this.usuarioService
      .atualizar(body)
      .then((usuario) => {
        this.usuario = usuario;
        this.messageService.add({
          severity: 'info',
          summary: 'Usuário',
          detail: `${usuario.name}, alterado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/usuarios']);
        form.reset();
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }

  salvar(form: NgForm) {
    if (this.editando) {
      this.atualizarUsuario(form);
    } else {
      this.adicionarUsuario(form);
    }
  }

  adicionarUsuario(form: NgForm) {
    this.salvando = true;
    this.usuarioService
      .adicionar(this.usuario)
      .then((usuarioAdicionado) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Usuário',
          detail: `${usuarioAdicionado.name}, adicionado com sucesso!`,
        });
        this.salvando = false;
        this.router.navigate(['/usuarios']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro.error.message);
      });

  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Usuário: ${this.usuario.name}`);
  }

  desbloquearVoltar() {
    history.replaceState(null, '');
  }

  validaBackRoute(form: NgForm) {
    const verificationbackroute = this.validaForm(form);
    if (verificationbackroute && !this.editando) {
      this.confirmBackRoute();
    } else {
      this.desbloquearVoltar();
      setTimeout(() => {
        this.router.navigate(['/usuarios']);
      }, 60);
    }
  }

  validaForm(form: NgForm) {
    for (const controlName in form.controls) {
      if (form.controls.hasOwnProperty(controlName)) {
        const control = form.controls[controlName];
        if (control.value !== null && control.value !== undefined && control.value.toString().trim() !== ''
          && controlName !== 'status') {
          return true;
        }
      }
    }
  }

  confirmBackRoute() {
    this.confirmation.confirm({
      message: `Tem certeza que deseja retornar? Você perderá todos os dados preenchidos !`,
      accept: () => {
        this.router.navigate(['/usuarios']);
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      },
    });
  }

}
