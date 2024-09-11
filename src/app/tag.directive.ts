import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTag]',
  standalone: true,
})
export class TagDirective {
  showTagOptions = false;

  constructor(private el: ElementRef) {
  }

  @HostListener('keypress') onMouseEnter() {
    this.showTagOptions = true;
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }

  @HostListener('focusout') onFocusOut() {
    this.el.nativeElement.style.backgroundColor = 'white';
  }

}
