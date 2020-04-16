import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { TooltipDirective } from '../components/tooltip/tooltip.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SearchFilterPipe,
        TooltipDirective
    ],
    exports: [
        CommonModule,
        SearchFilterPipe,
        TooltipDirective
    ],
    providers: [
        SearchFilterPipe
    ]
})
export class SharedModule { }