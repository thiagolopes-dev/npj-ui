import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';

import * as moment from 'moment-timezone';
import { Status } from 'src/app/core/models/status.model';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  statusURL: string = '';

  constructor(private http: HttpClient) {
    this.statusURL = `${environment.apiURL}/status`;
  }

  listarStatus(): Promise<Status> {
    return firstValueFrom(this.http.get(`${this.statusURL}`)).then(
      (response) => response as Status,
    );
  }

  adicionarStatus(obj: Status): Promise<Status> {
    return firstValueFrom(this.http.post<Status>(this.statusURL, obj));
  }

  atualizarStatus(obj: Status): Promise<Status> {
    return firstValueFrom(
      this.http.put<Status>(`${this.statusURL}/${obj._id}`, obj),
    ).then((response) => response as Status);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.statusURL}/${id}`)).then(
      (response) => response as Status,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.statusURL}/${id}`)).then(
      () => null,
    );
  }

  converteStringParaDatas(obj: any) {
    obj.forEach((element: any) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}
