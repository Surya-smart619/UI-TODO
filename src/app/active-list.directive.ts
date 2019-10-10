import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[appActiveList]'
})
export class ActiveListDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer) { }

    @HostListener('click', ['$event.target'])
    onClickList(list) {
        if (this.elementRef !== undefined) {
            console.log(this.elementRef.nativeElement);
            console.log(list);
            // this.renderer.setElementClass(this.elementRef.nativeElement, 'blue bold', true);
        } else {
            // this.renderer.setElementClass(this.elementRef, 'blue bold', false);
        }
    }
}
