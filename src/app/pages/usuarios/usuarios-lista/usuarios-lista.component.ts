import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { FiltrosUsuario } from 'src/app/core/models/filtros.model';
import { Usuarios } from 'src/app/core/models/usuarios.model';
import { FiltroUsuarioService } from 'src/app/core/services/filtros-services/filtro-usuario.service';
import { AuthService } from '../../seguranca/auth.service';
import { UsuariosService } from '../usuarios.service';
import { FiltrosUsuarioService } from 'src/app/core/services/filtros-services/filtro-usuario.service';
import { LocalstorageTableService } from 'src/app/core/services/localstorage-table.service';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
})
export class UsuariosListaComponent implements OnInit, AfterViewInit {
  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  sinal = true;
  selectionCols: Usuarios;
  usuarios: Usuarios[];
  items: MenuItem[];
  cols = [];
  exportColumns: any[];
  _selectedColumns: any[];
  valorTooltip = 'Inativos';
  dialogColunas: boolean;
  filtro = new FiltrosUsuario();
  totalRegistros = 0;
  totalPages = 0;
  blockBtnFilter = false;
  timeout: any;
  datagravacaode: string;
  datagravacaoate: string;
  datausucriacaode: string;
  datausucriacaoate: string;
  firstLoading = true;
  noRecords = true;
  state = 'state-usuarios';
  nameColumns = 'usuariosColumns';

  constructor(
    private title: Title,
    private usuarioService: UsuariosService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private spinner: NgxSpinnerService,
    private filtroUsuario: FiltrosUsuarioService,
    public auth: AuthService,
    private localstorageTableService: LocalstorageTableService

  ) {
    this.timeout = 0;
  }



  onClear() {
    this.selectedColumns.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.selectedColumns.forEach(col => {
      if (col.datagravacaode === null || col.datagravacaode === undefined) { } else {
        col.datagravacaode = null;
      }
      if (col.datagravacaoate === null || col.datagravacaoate === undefined) { } else {
        col.datagravacaoate = null;
      }

      if (col.datausucriacaode === null || col.datausucriacaode === undefined) { } else {
        col.datausucriacaode = null;
      }
      if (col.datausucriacaoate === null || col.datausucriacaoate === undefined) { } else {
        col.datausucriacaoate = null;
      }
    });
    this.datagravacaode = null;
    this.datagravacaoate = null;
    this.datausucriacaode = null;
    this.datausucriacaoate = null;
    this.filtro = new FiltrosUsuario();
    this.filtroDefault();
    this.saveLocalStorage(null);
    this.carregar();
  }

  ngOnInit() {
    this.title.setTitle('Lista de Usuários');
    this.filtroDefault();
    this.carregar();
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
        field: 'id',
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
       header: 'Data Gravacao',
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
  

  if (!localStorage.getItem('usuariosColumns')) {
    this.setColumnsDefaultValue();
  } else {
    // get selected columns from local storage
    this.selectedColumns = JSON.parse(localStorage.getItem('usuariosColumns'));
  }
}

ngAfterViewInit() {
  this.table.filterGlobal('', 'contains');
  this.buscarFiltroLocalStorage();
}

setColumnsDefaultValue() {
  this.selectedColumns = this.cols;
  this.saveLocalStorage(null);
}

@Input('usuariosColumns')
set selectedColumns(selectedColumns: any) {
  this._selectedColumns = selectedColumns;
}

get selectedColumns(): any {
  return this._selectedColumns;
}

saveLocalStorage(event: any) {
  this.localstorageTableService.saveLocalStorage(event, this.selectedColumns, this.state, this.nameColumns)
}

eventReorder() {
  setTimeout(() => {
    this.localstorageTableService.eventReorder(this.state, this.selectedColumns, this.nameColumns)
  }, 300);
}

refresh() {
  this.carregar();
}

carregar() {
  this.spinner.show();
  this.usuarioService
    .listarComFiltro(this.filtro)
    .then((obj) => {
      this.usuarios = obj.data;
      if (this.usuarios.length > 0) {
        this.noRecords = true;
      }
      else {
        this.noRecords = false;
      }
      this.totalRegistros = obj.totalCount;
      this.totalPages = obj.totalPages;
      this.spinner.hide();
    })
    .catch((erro) => {
      this.spinner.hide();
      this.errorHandler.handle(erro);
    });
}

changePage(event: LazyLoadEvent) {
  this.filtro.pagina = event.first / event.rows;
  this.filtro.itensPorPagina = event?.rows;
  if (this.firstLoading === true) {
    this.firstLoading = false;
  } else {
    this.carregar();
  }
}

search(value: any) {
  if (this.timeout) { clearTimeout(this.timeout); }
  this.timeout = setTimeout(() => {
    this.applySearch(value);
  }, 800);
}

buscarFiltroLocalStorage() {
  this.selectedColumns.forEach((element: any) => {
    if (element.qty) {
      this.filtro[element.field] = element.qty;
    }
    if (element.field === 'datagravacao') {
      if (element.datagravacaode) {
        this.filtro.datagravacaode = element.datagravacaode;
        const valorFormatadode = element.datagravacaode.split('-').reverse().join('-');
        this.datagravacaode = valorFormatadode.replace(/-/g, '');
      }

      if (element.datagravacaoate) {
        this.filtro.datagravacaoate = element.datagravacaoate;
        const valorFormatadoate = element.datagravacaoate.split('-').reverse().join('-');
        this.datagravacaoate = valorFormatadoate.replace(/-/g, '');
      }

    }
    if (element.field === 'datausucriacao') {
      if (element.datausucriacaode) {
        this.filtro.datausucriacaode = element.datausucriacaode;
        const valorFormatadode = element.datausucriacaode.split('-').reverse().join('-');
        this.datausucriacaode = valorFormatadode.replace(/-/g, '');
      }
      if (element.datausucriacaoate) {
        this.filtro.datausucriacaoate = element.datausucriacaoate;
        const valorFormatadoate = element.datausucriacaoate.split('-').reverse().join('-');
        this.datausucriacaoate = valorFormatadoate.replace(/-/g, '');
      }
    }
  });
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
      this.saveLocalStorage(null);
      this.carregar();
      this.FirstPage();
      this.btnBlock();
    }).catch((erro) => {
      this.btnBlock();
      this.errorHandler.handle(erro);
    });
  }
}

FirstPage() {
  this.paginator.changePage(0);
}

btnBlock() {
  setTimeout(() => {
    this.blockBtnFilter = false;
  }, 680);
}

filtroDefault() {
  this.filtro.pagina = 0;
  this.filtro.itensPorPagina = 10;
  this.filtro.status = 'true';
}

salvarDataLocalStorage(tipo: string, valor: string, nome: string) {
  const itemEncontrado = this.selectedColumns.find(item => item.field === nome);
  if (itemEncontrado) {
    itemEncontrado[tipo] = valor;
  }
}

searchData(tipo: string) {
  this.filtroDefault();
  if (tipo === 'datagravacaode') {
    if (this.datagravacaode && this.datagravacaode.length === 10) {
      const dia = this.datagravacaode.substring(0, 2);
      const mes = this.datagravacaode.substring(3, 5);
      const ano = this.datagravacaode.substring(6, 10);
      this.filtro.datagravacaode = ano + '-' + mes + '-' + dia;
      this.salvarDataLocalStorage(tipo, this.filtro.datagravacaode, 'datacriacao');
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
      this.salvarDataLocalStorage(tipo, this.filtro.datagravacaoate, 'datacriacao');
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
      this.salvarDataLocalStorage(tipo, this.filtro.datausucriacaode, 'dataalteracao');
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
      this.salvarDataLocalStorage(tipo, this.filtro.datausucriacaoate, 'dataalteracao');
    } else {
      this.filtro.datausucriacaoate = '';
    }
  }
  if (this.timeout) { clearTimeout(this.timeout); }
  this.timeout = setTimeout(() => {
    this.carregar();
    this.FirstPage();
    this.saveLocalStorage(null);
  }, 800);
}

limparData(tipo: string) {
  if (tipo === 'dataGravacao') {
    this.filtro.datagravacaode = '';
    this.filtro.datagravacaoate = '';
    this.datagravacaode = '';
    this.datagravacaoate = '';
    this.removerDataLocalStorage('datagravacao', 'datagravacaode', 'datagravacaoate');
  }

  if (tipo === 'dataUsucriacao') {
    this.filtro.datausucriacaode = '';
    this.filtro.datausucriacaoate = '';
    this.datausucriacaode = '';
    this.datausucriacaoate = '';
    this.removerDataLocalStorage('datausucriacao', 'datausucriacaode', 'datausucriacaoate');
  }

  this.saveLocalStorage(null);
  this.carregar();
}

removerDataLocalStorage(nome: string, tipode: string, tipoate: string) {
  const itemEncontrado = this.selectedColumns.find(item => item.field === nome);

  if (itemEncontrado) {
    itemEncontrado[tipode] = '';
    itemEncontrado[tipoate] = '';
  }
}

verifyFocus() {
  this.buttonFilter.nativeElement.focus();
}

AlternarLista() {
  if (this.filtro.status === 'true') {
    this.filtro.status = 'false';
  } else {
    this.filtro.status = 'true';
  }
  this.carregar();
}
}
