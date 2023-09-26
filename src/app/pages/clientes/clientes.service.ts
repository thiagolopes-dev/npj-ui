import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Clientes } from 'src/app/core/models/cliente.model';
import { environment } from 'src/environment/environment';

import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

    clienteURL: string = '';

  constructor(
    private http: HttpClient
  ) {
    this.clienteURL = `${environment.apiURL}/clientes`;
  }

  listarClientes(): Promise<Clientes> {
    return firstValueFrom(this.http.get(`${this.clienteURL}`))
      .then((response) => response as Clientes);
  }

  adicionarCliente(obj: Clientes): Promise<Clientes> {
    return firstValueFrom(this.http.post<Clientes>(this.clienteURL, obj));
  }

  atualizarClientes(obj: Clientes): Promise<Clientes> {
    return firstValueFrom(this.http.put<Clientes>(`${this.clienteURL}/${obj.id}`, obj))
      .then((response) => response as Clientes);
  }

  buscarPorID(id: string){
    return firstValueFrom(this.http.get(`${this.clienteURL}/${id}`))
    .then((response) => response as Clientes);
  }

  excluir(id: string){
    return firstValueFrom(this.http.delete(`${this.clienteURL}/${id}`))
    .then(() => null);
  }

  converteStringParaDatas(obj: any){
    obj.forEach((element: any) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
      .tz('America/Sao_Paulo')
      .toDate();
    });

  }
}
