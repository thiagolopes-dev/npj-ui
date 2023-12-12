import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { UsuariosService } from 'src/app/pages/usuarios/usuarios.service';
import { ErrorHandlerService } from '../../errorhandler.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css'],
})
export class AlterarSenhaComponent implements OnInit {
  usuario = new Usuarios();
  salvando: boolean;

  constructor(
    private usuarioService: UsuariosService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {}

  alterarSenha(form: NgForm) {
    this.salvando = true;
    this.usuarioService
      .alterarSenhaUsuario(this.usuario.password)
      .then((obj) => {
        // this.usuario = obj;
        this.salvando = false;
        this.messageService.add({
          severity: 'info',
          summary: 'Senha',
          detail: `alterada com sucesso!`,
        });
        this.router.navigate(['/dashboard']);
      })
      .catch((erro) => {
        this.salvando = false;
        this.errorHandler.handle(erro);
      });
  }
  
}
