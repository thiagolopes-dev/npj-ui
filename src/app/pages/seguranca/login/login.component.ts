import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Message, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logo: any = '/assets/icons/logo_icon.png';
  messages: Message[] | undefined;

  constructor(
    private router: Router,
    private title: Title,
    private spinner: NgxSpinnerService,
    private auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Login');
  }

  login(email: string, senha: string){
    this.spinner.show();
    this.auth.login(email, senha)
    .then(()=> {
      this.spinner.hide();
      this.router.navigate(['/dashboard']);
    })
    .catch(erro => {
      this.spinner.hide();
      this.errorHandler.handle(erro);
    });
  }

  EnterSubmit(event: any, form: NgForm, usuario: string, senha: string){
    if(event.keyCode === 13){
      this.login(usuario, senha)
    }
  }

}