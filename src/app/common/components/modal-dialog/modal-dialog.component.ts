import {
    Component, OnInit, ElementRef, Renderer2, ViewChild,
    ChangeDetectionStrategy, Input, OnDestroy, Output,
    EventEmitter
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { MatchesCategories } from '../../models/matches-categories.model';
import { SearchFilterPipe } from '../../shared/pipes/search-filter.pipe';

@Component({
    selector: 'modal-dialog',
    templateUrl: 'modal-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalDialogComponent implements OnInit, OnDestroy {

    @ViewChild('closeButton')
    _closeButton: ElementRef;
    @ViewChild('wrapper')
    _wrapperElement: ElementRef;
    @Input() isModalActive: boolean = false;
    @Input() targetElement: Element;
    @Input() modalData: any;
    @Input() category: MatchesCategories;
    @Output() onCategorySelect: EventEmitter<any> = new EventEmitter<any>();

    _searchText: string;
    _modalData: any;
    _styles: any = { left: '', top: '' };

    private _canDestroy$: Subject<any> = new Subject<any>();
    private _onClickListener: Function;

    constructor(
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private _searchFilter: SearchFilterPipe
    ) { }

    /**
     * Hook to handle functions when component load
     */
    ngOnInit(): void {
        this._modalData = _.cloneDeep(this.modalData);
        this._setDialogPosition();
        setTimeout(() => {
            this._listenOnClick();
        });
    }

    /**
     * Hook to handle functions when component destroy
     */
    ngOnDestroy(): void {
        if (this._onClickListener) {
            this._onClickListener();
        }
    }

    /**
     * Method to expose a subject as a observable
     */
    canDestroy(): Observable<any> {
        return this._canDestroy$.asObservable();
    }

    /**
     * Method to emit a filtering when option get select/deselect
     * @param {any[]} option
     */
    _filterByCategory(option: any[]): void {
        const category = this.category;
        this.onCategorySelect.emit({ option, category });
    }

    /**
     * Method to handle search filter in positioned dialog
     */
    _onSearchFilter(filterText: string): void {
        this._searchText = filterText;
        if (filterText) {
            this._modalData.options.forEach((option, i) => {
                option.options = this._searchFilter.transform(
                    _.cloneDeep(this.modalData.options[i].options), filterText
                );
            });
        } else {
            this._modalData = this.modalData;
        }
    }

    /**
     * Method to handle element scroll
     * @param {any} elementId
     */
    _focusScroll(elementId: any) {
        const element = document.getElementById(elementId);
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Listener to close the modal when DOM get clicked
     */
    private _listenOnClick(): void {
        this._onClickListener = this._renderer.listen('document', 'click', (event) => {
            if ((this._elementRef && this._elementRef.nativeElement !== event.target && !this._elementRef.nativeElement.contains(event.target)) || this._closeButton && this._closeButton.nativeElement.contains(event.target)) {
                if (this.isModalActive) {
                    this._canDestroy$.next();
                }
            }
        });
    }

    /**
     * Method to set dynamic dialog position
     */
    private _setDialogPosition(): void {
        const parentRect: any = this.targetElement.getBoundingClientRect();
        const dialogRect: any = this._wrapperElement.nativeElement.getBoundingClientRect();
        const windowHeight = window.innerHeight - 10;
        const windowWidth = window.innerWidth - 10;
        let top = parentRect.top, left = parentRect.left;

        if (top + dialogRect.height >= windowHeight) {
            top = windowHeight - dialogRect.height;
        }
        if (left + dialogRect.width >= windowWidth) {
            left = windowWidth - dialogRect.width;
        }

        this._styles.left = `${left}px`;
        this._styles.top = `${top}px`;
    }
}