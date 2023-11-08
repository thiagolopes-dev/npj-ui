import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { FiltrosUsuario } from 'src/app/core/models/filtros.model';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { AuthService } from '../../seguranca/auth.service';
import { UsuariosService } from '../usuarios.service';
import { FiltrosUsuarioService } from 'src/app/core/services/filtros-services/filtro-usuario.service';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
})
export class UsuariosListaComponent implements OnInit {
  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;
  rowsPerPageTable: number[] = [10, 15, 20, 25, 50, 100, 200];
  status = 'Ativo';
  cols: any[];
  sinal = true;
  usuarios = [];
  user: Usuarios[];
  selectionCols: Usuarios;
  display: boolean;
  evento = 'Usuários';
  items: MenuItem[];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  valorTooltip = 'Inativos';
  value: any;
  totalRegistros = 0;
  totalPages = 0;
  filtro = new FiltrosUsuario();
  filtroValor = new Array<any>();
  timeout: any;
  datagravacaode: string;
  datagravacaoate: string;
  datausucriacaode: string;
  datausucriacaoate: string;
  blockBtnFilter = false;
  first: number = 0;
  rows: number = 10;

  showDialog() {
    this.display = true;
  }

  constructor(
    private title: Title,
    private usuarioService: UsuariosService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    private filtroUsuario: FiltrosUsuarioService,
    public auth: AuthService
  ) {
    this.timeout = 0;
  }



  //  onPageChange(event: PageEvent) {
  //    this.first = event.first;
  //    this.rows = event.rows;
  //  }

  ngOnInit() {
    this.title.setTitle('Lista de Usuários');
    this.filtroDefault();
    this.carregarUsers();
    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];

    this.cols = [
      {
        field: 'codigo',
        header: 'Código',
        width: '135px',
        type: 'numeric',
        key: 1,
      },
      { field: 'name', header: 'Nome', width: '200px', type: 'text', key: 2 },
      {
        field: 'username',
        header: 'E-mail',
        width: '200px',
        type: 'text',
        key: 3,
      },

      { field: 'celular', header: 'Celular', width: '200px', type: 'text', key: 2 },
      { field: 'tipo', header: 'Tipo', width: '200px', type: 'text', key: 2 },



     {
       field: 'emailusuario',
       header: 'Usuário Alteração',
       width: '200px',
       key: 4,
       type: 'text',
     },
     {
       field: 'datagravacao',
       header: 'Data Alteração',
       width: '200px',
       data: true,
       format: `dd/MM/yyyy H:mm`,
       key: 5,
       type: 'date',
     },
     {
       field: 'usucriacao',
       header: 'Usuário Criação',
       width: '200px',
       key: 6,
       type: 'text',
     },
     {
       field: 'datausucriacao',
       header: 'Data Criação',
       width: '200px',
       data: true,
       format: `dd/MM/yyyy H:mm`,
       key: 7,
       type: 'date',
     },
      { field: 'status', header: 'Status', width: '100px', type: 'status', status: true, key: 8 }
    ];
  }

  refresh() {
    if (this.evento === 'Usuários') {
      this.carregarUsers();
    }
  }

  onClear() {
    this.table.clear();
  }


  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarUsers();
  }

  limparData(tipo: string) {
    if (tipo === 'dataGravacao') {
      this.filtro.datagravacaode = '';
      this.filtro.datagravacaoate = '';
      this.datagravacaode = '';
      this.datagravacaoate = '';
    }

    if (tipo === 'dataCriacao') {
      this.filtro.datausucriacaode = '';
      this.filtro.datausucriacaoate = '';
      this.datausucriacaode = '';
      this.datausucriacaoate = '';
    }

    this.carregarUsers();
  }

  search(value: any) {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.applySearch(value);
    }, 800);
  }

  searchData(tipo: string) {
    this.filtroDefault();
    if (tipo === 'datagravacaode') {
      if (this.datagravacaode && this.datagravacaode.length === 10) {
        const dia = this.datagravacaode.substring(0, 2);
        const mes = this.datagravacaode.substring(3, 5);
        const ano = this.datagravacaode.substring(6, 10);
        this.filtro.datagravacaode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaode = '';
      }
    }
    if (tipo === 'datagravacaoate') {
      if (this.datagravacaoate && this.datagravacaoate.length === 10) {
        const dia = this.datagravacaoate.substring(0, 2);
        const mes = this.datagravacaoate.substring(3, 5);
        const ano = this.datagravacaoate.substring(6, 10);
        this.filtro.datagravacaoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datagravacaoate = '';
      }
    }

    if (tipo === 'datausucriacaode') {
      if (this.datausucriacaode && this.datausucriacaode.length === 10) {
        const dia = this.datausucriacaode.substring(0, 2);
        const mes = this.datausucriacaode.substring(3, 5);
        const ano = this.datausucriacaode.substring(6, 10);
        this.filtro.datausucriacaode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datausucriacaode = '';
      }
    }
    if (tipo === 'datausucriacaoate') {
      if (this.datausucriacaoate && this.datausucriacaoate.length === 10) {
        const dia = this.datausucriacaoate.substring(0, 2);
        const mes = this.datausucriacaoate.substring(3, 5);
        const ano = this.datausucriacaoate.substring(6, 10);
        this.filtro.datausucriacaoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.datausucriacaoate = '';
      }
    }
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.carregarUsers();
      this.FirstPage();
    }, 800);
  }

  FirstPage() {
    this.paginator.changePage(0);
  }

  applySearch(value: any) {
    this.blockBtnFilter = true;
    if (
      value.qty === null ||
      value.qty === undefined
    ) {
      this.btnBlock();
    } else {
      this.filtroUsuario.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarUsers();
        this.FirstPage();
        this.btnBlock();
      }).catch((erro) => {
        this.btnBlock();
        this.errorHandler.handle(erro);
      });
    }
  }

  verifyFocus() {
    this.buttonFilter.nativeElement.focus();
  }

  btnBlock() {
    setTimeout(() => {
      this.blockBtnFilter = false;
    }, 680);
  }

  carregarUsers() {
   this.spinner.show();
   this.usuarioService
     .listarComFiltro(this.filtro)
     .then((obj) => {
       this.usuarios = obj.content;
       this.totalRegistros = obj.totalElements;
       this.totalPages = obj.totalPages;
       this.spinner.hide();
     })
     .catch((erro) => {
       this.spinner.hide();
       this.errorHandler.handle(erro);
     });
    this.spinner.show();
    this.usuarioService
      .listarUsuarios()
      .then((obj) => {

        this.usuarios = obj;
        console.log(this.usuarios);
       this.totalRegistros = obj.totalElements;
       this.totalPages = obj.totalPages;
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });
  }
  public getEstilosAlternarLista() {
    return {
      backgroundColor: !this.sinal ? '#28a745cc' : '#dc3545',
      textAlign: 'center',
      valorTolltip: !this.sinal ? 'Ativos' : 'Inativos',
    };
  }

  trocarUsuarios(evento: any) {
    this.evento = evento;
    if (evento === 'Usuários') {
      this.filtro.tipo = 'usuario';
    } else {
      this.filtro.tipo = 'motorista';
    }
    this.carregarUsers();
  }
  AlternarLista() {
    if (this.filtro.status === 'Ativos') {
      this.filtro.status = 'Inativos';
    } else {
      this.filtro.status = 'Ativos';
    }
    this.carregarUsers();
  }

}
