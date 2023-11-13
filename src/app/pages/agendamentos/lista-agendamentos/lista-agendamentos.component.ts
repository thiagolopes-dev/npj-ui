import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/errorhandler.service';
import { Agendamentos } from 'src/app/core/models/agendamento.model';
import { FiltroAgendamentos } from 'src/app/core/models/filtros.model';
import { FiltroAgendamentosService } from 'src/app/core/services/filtros-services/filtro-agendamentos.service';
import { LocalstorageTableService } from 'src/app/core/services/localstorage-table.service';
import { AuthService } from '../../seguranca/auth.service';
import { AgendamentosService } from '../agendamentos.service';

@Component({
  selector: 'app-lista-agendamentos',
  templateUrl: './lista-agendamentos.component.html',
  styleUrls: ['./lista-agendamentos.component.css']
})
export class ListaAgendamentosComponent implements OnInit, AfterViewInit {
  @ViewChild('tabela') table: Table;
  @ViewChild('paginator') paginator: Paginator;
  @ViewChild('buttonFilter') buttonFilter: ElementRef;

  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  sinal = true;
  selectionCols: Agendamentos;
  agendamentos: Agendamentos[];
  items: MenuItem[];
  cols = [];
  exportColumns: any[];
  _selectedColumns: any[];
  valorTooltip = 'Inativos';
  dialogColunas: boolean;
  filtro = new FiltroAgendamentos();
  totalRegistros = 0;
  totalPages = 0;
  blockBtnFilter = false;
  timeout: any;
  datacriacaode: string;
  datacriacaoate: string;
  dataalteracaode: string;
  dataalteracaoate: string;
  firstLoading = true;
  noRecords = true;
  state = 'state-agendamentos';
  nameColumns = 'agendamentosColumns';

  constructor(
    private title: Title,
    private agendamentosService: AgendamentosService,
    private errorHandler: ErrorHandlerService,
    private filtroAgendamento: FiltroAgendamentosService,
    public auth: AuthService,
    private spinner: NgxSpinnerService,
    private localstorageTableService: LocalstorageTableService
  ) { }

  onClear() {
    this.selectedColumns.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.selectedColumns.forEach(col => {
      if (col.datacriacaode === null || col.datacriacaode === undefined) { } else {
        col.datacriacaode = null;
      }
      if (col.datacriacaoate === null || col.datacriacaoate === undefined) { } else {
        col.datacriacaoate = null;
      }

      if (col.dataalteracaode === null || col.dataalteracaode === undefined) { } else {
        col.dataalteracaode = null;
      }
      if (col.dataalteracaoate === null || col.dataalteracaoate === undefined) { } else {
        col.dataalteracaoate = null;
      }
    });
    this.datacriacaode = null;
    this.datacriacaoate = null;
    this.dataalteracaode = null;
    this.dataalteracaoate = null;
    this.filtro = new FiltroAgendamentos();
    this.filtroDefault();
    this.saveLocalStorage(null);
    this.carregar();
  }

  ngOnInit() {
    this.title.setTitle('Lista de Agendamentos');
    this.filtroDefault();
    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      },
    ];

    this.cols = [
      { field: 'atendimento', header: 'Atendimento', width: '130px', key: 1, type: 'numeric', qty: '' },
      {
        field: 'dataatendimento', header: 'Data Atendimento', width: '180px', key: 2, type: '', qty: '',
        data: true,
        format: `dd/MM/yyyy H:mm`,
        dataatendimentode: '',
        datatendimentoate: ''
      },
      { field: 'numeroprontuario', header: 'Num. Prontuário', width: '130px', key: 3, type: 'numeric', qty: '' },
      { field: 'desccliente', header: 'Cliente', key: 4, width: '250px', type: 'text', qty: '' },
      { field: 'descmotivo', header: 'Motivo', key: 5, width: '250px', type: 'text', qty: '' },
      { field: 'descstatus', header: 'Status', key: 6, width: '250px', type: 'text', qty: '' },

      {
        field: 'usuarioalteracao',
        header: 'Usuário Alteração',
        width: '200px',
        key: 7,
        type: 'text',
        qty: ''
      },
      {
        field: 'dataalteracao',
        header: 'Data Alteração',
        width: '200px',
        data: true,
        format: `dd/MM/yyyy H:mm`,
        key: 8,
        type: 'date',
        dataalteracaode: '',
        dataalteracaoate: ''
      },
      {
        field: 'usuariocriacao',
        header: 'Usuário Criação',
        width: '200px',
        key: 9,
        type: 'text',
        qty: ''
      },
      {
        field: 'datacriacao',
        header: 'Data Criação',
        width: '200px',
        data: true,
        format: `dd/MM/yyyy H:mm`,
        key: 10,
        type: 'date',
        datacriacaode: '',
        datacriacaoate: ''
      },

    ];

    if (!localStorage.getItem('agendamentosColumns')) {
      this.setColumnsDefaultValue();
    } else {
      // get selected columns from local storage
      this.selectedColumns = JSON.parse(localStorage.getItem('agendamentosColumns'));
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

  @Input('agendamentosColumns')
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
    this.agendamentosService
      .listarComFiltro(this.filtro)
      .then((obj) => {
        this.agendamentos = obj.data;
        if (this.agendamentos.length > 0) {
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
      if (element.field === 'datacriacao') {
        if (element.datacriacaode) {
          this.filtro.datacriacaode = element.datacriacaode;
          const valorFormatadode = element.datacriacaode.split('-').reverse().join('-');
          this.datacriacaode = valorFormatadode.replace(/-/g, '');
        }

        if (element.datacriacaoate) {
          this.filtro.datacriacaoate = element.datacriacaoate;
          const valorFormatadoate = element.datacriacaoate.split('-').reverse().join('-');
          this.datacriacaoate = valorFormatadoate.replace(/-/g, '');
        }

      }
      if (element.field === 'dataalteracao') {
        if (element.dataalteracaode) {
          this.filtro.dataalteracaode = element.dataalteracaode;
          const valorFormatadode = element.dataalteracaode.split('-').reverse().join('-');
          this.dataalteracaode = valorFormatadode.replace(/-/g, '');
        }
        if (element.dataalteracaoate) {
          this.filtro.dataalteracaoate = element.dataalteracaoate;
          const valorFormatadoate = element.dataalteracaoate.split('-').reverse().join('-');
          this.dataalteracaoate = valorFormatadoate.replace(/-/g, '');
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
      this.filtroAgendamento.filtro(value, this.filtro).then((obj) => {
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
    if (tipo === 'datacriacaode') {
      if (this.datacriacaode && this.datacriacaode.length === 10) {
        const dia = this.datacriacaode.substring(0, 2);
        const mes = this.datacriacaode.substring(3, 5);
        const ano = this.datacriacaode.substring(6, 10);
        this.filtro.datacriacaode = ano + '-' + mes + '-' + dia;
        this.salvarDataLocalStorage(tipo, this.filtro.datacriacaode, 'datacriacao');
      } else {
        this.filtro.datacriacaode = '';
      }
    }
    if (tipo === 'datacriacaoate') {
      if (this.datacriacaoate && this.datacriacaoate.length === 10) {
        const dia = this.datacriacaoate.substring(0, 2);
        const mes = this.datacriacaoate.substring(3, 5);
        const ano = this.datacriacaoate.substring(6, 10);
        this.filtro.datacriacaoate = ano + '-' + mes + '-' + dia;
        this.salvarDataLocalStorage(tipo, this.filtro.datacriacaoate, 'datacriacao');
      } else {
        this.filtro.datacriacaoate = '';
      }
    }

    if (tipo === 'dataalteracaode') {
      if (this.dataalteracaode && this.dataalteracaode.length === 10) {
        const dia = this.dataalteracaode.substring(0, 2);
        const mes = this.dataalteracaode.substring(3, 5);
        const ano = this.dataalteracaode.substring(6, 10);
        this.filtro.dataalteracaode = ano + '-' + mes + '-' + dia;
        this.salvarDataLocalStorage(tipo, this.filtro.dataalteracaode, 'dataalteracao');
      } else {
        this.filtro.dataalteracaode = '';
      }
    }
    if (tipo === 'dataalteracaoate') {
      if (this.dataalteracaoate && this.dataalteracaoate.length === 10) {
        const dia = this.dataalteracaoate.substring(0, 2);
        const mes = this.dataalteracaoate.substring(3, 5);
        const ano = this.dataalteracaoate.substring(6, 10);
        this.filtro.dataalteracaoate = ano + '-' + mes + '-' + dia;
        this.salvarDataLocalStorage(tipo, this.filtro.dataalteracaoate, 'dataalteracao');
      } else {
        this.filtro.dataalteracaoate = '';
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
    if (tipo === 'dataCriacao') {
      this.filtro.datacriacaode = '';
      this.filtro.datacriacaoate = '';
      this.datacriacaode = '';
      this.datacriacaoate = '';
      this.removerDataLocalStorage('datacriacao', 'datacriacaode', 'datacriacaoate');
    }

    if (tipo === 'dataAlteracao') {
      this.filtro.dataalteracaode = '';
      this.filtro.dataalteracaoate = '';
      this.dataalteracaode = '';
      this.dataalteracaoate = '';
      this.removerDataLocalStorage('dataalteracao', 'dataalteracaode', 'dataalteracaoate');
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
