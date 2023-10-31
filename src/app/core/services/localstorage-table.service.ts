import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageTableService {

  constructor() { }

  eventReorder(state: string, selectedColumns: any[], nameColumns: string) {
    var obj = JSON.parse(localStorage.getItem(state));
    this.orderAndSaveColumns(obj, selectedColumns, nameColumns);
  }

  orderAndSaveColumns(obj, selectedColumns: any[], nameColumns: string) {
    const orderArray = [];
    obj.columnOrder.forEach(element => {
      selectedColumns.forEach(child => {
        if (element === child.field) {
          orderArray.push(child);
        }

      });
    });
    localStorage.setItem(
      nameColumns,
      JSON.stringify(orderArray)
    );
  }

  saveLocalStorage(event: any, selectedColumns: any[], state: string, nameColumns: string) {
    if (event) {
      if (event.itemValue && localStorage.getItem(state)) {
        this.updateState(event.itemValue.field, selectedColumns, state, nameColumns);
      } else {
        this.saveColumnLocalStorage(selectedColumns, nameColumns);
        if (selectedColumns.length === 0) {
          localStorage.removeItem(state)
        } else {
          if (localStorage.getItem(state)) {
            selectedColumns.forEach(element => {
              this.updateState(element.field, selectedColumns, state, nameColumns);
            });
          }
        }
      }
    } else {
      this.saveColumnLocalStorage(selectedColumns, nameColumns);
      localStorage.removeItem(state);
    }
  }

  saveColumnLocalStorage(selectedColumns: any[], nameColumns: string) {
    return localStorage.setItem(
      nameColumns,
      JSON.stringify(selectedColumns)
    );
  }

  updateState(event: any, selectedColumns: any[], state: string, nameColumns: string) {
    if (JSON.parse(localStorage.getItem(state))) {
      var obj = JSON.parse(localStorage.getItem(state));
    } else {
      var obj: any;
    }
    let chave = 0;
    let index = 0;
    obj.columnOrder.forEach((element, i) => {
      if (event === element) {
        chave = 1;
        index = i;
      }
    });
    if (chave === 0) {
      obj.columnOrder.push(event);
      this.salvarState(obj, state);
    }
    else {
      // obj.columnOrder.splice(index, 1);
      this.salvarState(obj, state);
    }
    this.orderAndSaveColumns(obj, selectedColumns, nameColumns);
  }

  salvarState(obj, state: string) {
    localStorage.setItem(
      state,
      JSON.stringify(obj)
    );
  }

}
