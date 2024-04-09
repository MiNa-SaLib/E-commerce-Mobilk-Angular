import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  Input,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[LightBox]',
})
export class LightBoxDirective implements OnChanges {
  @Input() defaultColor: string = '';
  @Input('LightBox') lightColor: string = 'yellow';
  constructor(private ele: ElementRef) {}
  ngOnChanges(): void {
    this.ele.nativeElement.style = `border: 4px solid ${this.defaultColor};`;
  }
  @HostListener('mouseover') mouseover() {
    this.ele.nativeElement.style = `border: 4px solid ${this.lightColor};`;
  }
  @HostListener('mouseout') mouseout() {
    this.ele.nativeElement.style = `border: 4px solid ${this.defaultColor};`;
  }
}
