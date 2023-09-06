import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-motivos',
  templateUrl: './lista-motivos.component.html',
  styleUrls: ['./lista-motivos.component.css']
})
export class ListaMotivosComponent {
  motivos =[
    {
      "id": 1,
      "descricao": 'Teste',
      "status": true
    },
    {
      "id": 2,
      "descricao": 'Teste',
      "status": true
    }
  ]
}
