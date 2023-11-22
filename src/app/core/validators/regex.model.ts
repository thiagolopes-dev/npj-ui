export class Regex {
    blockSpecial: RegExp = /^[\d-/.]$/;     // Libera somente números ponto barra e traço.
    stringNumber: RegExp = /[\w\s]$/;       // Libera somente string e números.
    string: RegExp = /[A-Za-z\s]/;          // Libera somente string e espaços
    numberEPonto: RegExp = /^[\d.]$/;       // Libera somente números e ponto
    numberEVirgula: RegExp = /^[\d,]$/;       // Libera somente números e virgula
    number: RegExp = /^[0-9]$/;          // Libera somente números sem espaço
    stringEspecial: RegExp = /[A-Za-z\s\d-/.%]/; // Libera string, números e traços especiais
  }