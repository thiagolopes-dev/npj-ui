import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/pages/seguranca/auth.service';
import { ErrorHandlerService } from '../../errorhandler.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sibebar: boolean;
  sair: any;

  constructor(
    public auth: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private confirmation: ConfirmationService,
    private messageService: MessageService
     ) {  }

     ngOnInit() {
      }

     confirmarLogout() {
      this.confirmation.confirm({
        message: `Tem certeza que deseja sair? `,
        accept: () => {
          this.logout();
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
    logout() {
      this.auth
        .logout()
        .then(() => {
          this.router.navigate(['/login']);
        })
        .catch((erro) => this.errorHandler.handle(erro));
    }
  
}
