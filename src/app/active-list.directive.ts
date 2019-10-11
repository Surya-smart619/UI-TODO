import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[appActiveList]'
})
export class ActiveListDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer) { }

    @HostListener('click')
    onClickList() {
        const collectionOfList = document.getElementsByClassName('list');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < collectionOfList.length; i++) {
            collectionOfList[i].classList.remove('bold', 'blue');
        }
        this.renderer.setElementClass(this.elementRef.nativeElement, 'bold', true);
        this.renderer.setElementClass(this.elementRef.nativeElement, 'blue', true);
    }
}
