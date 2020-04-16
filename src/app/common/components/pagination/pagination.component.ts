import {
    Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy,
    ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';
import { Pagination } from '../../models/pagination.model';

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {

    @Input() pagination: Pagination = new Pagination();
    @Input() totalItems: number = 0;
    @Output() onPaginationClick: EventEmitter<Pagination> = new EventEmitter<Pagination>();

    _indexes: any[] = [];
    _maxIndex: number;

    constructor(private _changeDetectorRef: ChangeDetectorRef) { }

    /**
     * Hook to handle functions when component input changes
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.totalItems || changes.pagination) {
            this._setPagination();
        }
    }

    /**
     * Method to change the indexes and visible options
     * @param {any} index
     */
    _changeIndex(index: any): void {
        if (this.pagination.currentPage > index.value) {
            this._indexes.forEach((t, i) => {
                t.active = false;
                if (index.value >= 2) {
                    t.visible = false
                }
                if (i <= index.value && i > index.value - this.pagination.alternative) {
                    t.visible = true;
                }
            });
        } else {
            this._indexes.forEach((t, i) => {
                t.active = false;
                if (index.value + this.pagination.alternative <= this._maxIndex) {
                    t.visible = false;
                }
                if (i >= index.value && i < index.value + this.pagination.alternative) {
                    t.visible = true;
                }
            });
        }
        index.active = true;
        this.pagination.currentPage = index.value;
        this.onPaginationClick.emit(this.pagination);
    }

    /**
     * Method to handle previous action
     */
    _onPrevClick(): void {
        this.pagination.currentPage--;
        this._indexes.forEach((t, i) => {
            t.active = false; t.visible = false;
            if (i === this.pagination.currentPage) {
                t.active = true;
            }
            if (i >= this.pagination.currentPage && i < this.pagination.currentPage + this.pagination.alternative) {
                t.visible = true;
            }
        });
        this.onPaginationClick.emit(this.pagination);
    }

    /**
     * Method to handl next action
     */
    _onNextClick(): void {
        this.pagination.currentPage++;
        this._indexes.forEach((t, i) => {
            t.active = false;
            if (i === this.pagination.currentPage) {
                t.active = true;
            }
            if (i + this.pagination.alternative <= this._maxIndex - 1) {
                t.visible = false;
            }
            if (i >= this.pagination.currentPage && i < this.pagination.currentPage + this.pagination.alternative) {
                t.visible = true;
            }
        });
        this.onPaginationClick.emit(this.pagination);
    }

    /**
     * Function to reset entire pagination
     */
    private _setPagination(): void {
        this._indexes = [];
        this._maxIndex = Math.floor(this.totalItems / this.pagination.alternative) + 1;
        for (let i = 0; i < this._maxIndex; i++) {
            this._indexes.push({
                value: i,
                visible: false,
                active: false
            });
        }
        this._indexes.forEach((t, i) => {
            if (i === 0) {
                t.active = true;
            }
            if (i < this.pagination.alternative) {
                t.visible = true;
            }
        });
        this._detectChanges();
    }

    /**
     * Hit detect changes
     */
    private _detectChanges(): void {
        this._changeDetectorRef.detectChanges();
    }

}