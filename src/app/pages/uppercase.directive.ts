import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[upperCase]'
})
export class UppercaseDirective {
  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const upperCaseValue = value.toUpperCase();
    this.el.nativeElement.value = upperCaseValue;
    this.ngModelChange.emit(upperCaseValue);
  }
}
