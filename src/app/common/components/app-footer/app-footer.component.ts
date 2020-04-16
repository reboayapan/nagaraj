import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: 'app-footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFooterComponent implements OnInit {

    _currentYear: any;

    /**
     * Hook to handle functions when component load
     */
    ngOnInit(): void {
        this._currentYear = new Date().getFullYear();
    }
}
