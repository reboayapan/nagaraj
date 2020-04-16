import { Directive, Input, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[tooltip]'
})
export class TooltipDirective {

    @HostBinding('style.cursor') _cursor: string = 'pointer';
    @Input() tooltip: string;

    private _container: HTMLDivElement;
    private _createTimeout: any;
    private _deleteTimeout: any;

    constructor(private _elementRef: ElementRef) { }

    /**
     * Host listener for handle mouse hover
     */
    @HostListener('mouseenter')
    onMouseEnter(): void {
        this._createTimeout = setTimeout(() => {
            clearTimeout(this._deleteTimeout);
            this._checkIsOveflowed(this._elementRef.nativeElement.parentElement);
        }, 200);
    }

    /**
     * Host listener for handle mouse leave
     */
    @HostListener('mouseleave')
    onMouseLeave(): void {
        clearTimeout(this._createTimeout);
        this._destoryTooltip();
    }

    /**
     * Method to check element overflowed or not
     * @param {HTMLElement} element
     */
    private _checkIsOveflowed(element: HTMLElement): void {
        // create tooltip only when element has overflowed
        if (element && element.scrollHeight > element.clientHeight ||
            element.scrollWidth > element.clientWidth) {
            this._createTooltip();
        }
    }

    /**
     * Method to create a tooltip
     */
    private _createTooltip(): void {
        this._container = document.createElement('div');
        this._container.className = 'tooltip-container';
        const tooltipText = document.createElement('span');
        tooltipText.className = 'tooltip-text';

        if (this.tooltip && this.tooltip.length) {
            tooltipText.innerHTML = this.tooltip;
            this._container.appendChild(tooltipText);
            document.body.appendChild(this._container);
        }

        this._setPosition();
    }

    /**
     * Method to destroy a tooltip
     */
    private _destoryTooltip(): void {
        if (this._container) {
            document.body.removeChild(this._container);
            this._container = null;
        }
    }

    /**
     * Set a tooltip position
     */
    private _setPosition(): void {
        const elementRect: any = this._elementRef.nativeElement.getBoundingClientRect();
        this._container.style.top = `${elementRect.top - this._container.offsetHeight}px`;
        this._container.style.left = `${elementRect.left}px`;
    }
}