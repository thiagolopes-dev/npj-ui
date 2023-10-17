import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'npj-ui';

  constructor(
    private config: PrimeNGConfig,
    private router: Router
    ){}

  ngOnInit() {
    this.config.setTranslation({
      startsWith: 'Começa com',
      contains: 'Contém',
      notContains: 'Não Contém',
      endsWith: 'Termina com',
      equals: 'É igual',
      notEquals: 'Diferente',
      lt: 'Menor que',
      lte: 'Menor que ou igual a',
      gt: 'Maior que',
      gte: 'Maior que ou igual',
      is: 'É',
      isNot: 'Não é',
      before: 'Antes',
      after: 'Depois',
      dateIs: 'Data é',
      dateIsNot: 'Data não é',
      dateBefore: 'Data antes de',
      dateAfter: 'Data depois de',
      clear: 'Limpar',
      apply: 'Aplicar',
      matchAll: 'Combinar Tudo',
      matchAny: 'Corresponder a qualquer',
      addRule: 'Adicionar Regra',
      removeRule: 'Remover Regra',
      accept: 'Sim',
      reject: 'Não',
      today: 'Hoje',
      emptyMessage: 'Nenhum resultado encontrado',
      monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ],
      dayNames: [
        'domingo',
        'segunda',
        'terça',
        'quarta',
        'quinta',
        'sexta',
        'sábado',
      ],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    });
  }

  exibindoNavbar(){
    let chave: boolean;
    if(this.router.url === '/login'){
      chave = false;
    }else {
      chave = true;
    }
    return chave;
  }
}
