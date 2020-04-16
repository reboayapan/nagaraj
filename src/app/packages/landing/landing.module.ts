import { ReactiveFormsModule } from '@angular/forms';
// import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';

import { Ng5SliderModule } from 'ng5-slider';

import { LandingRouterModule } from './landing.router';
import { LandingComponent, HomePageComponent } from './components/index';
import { SharedModule, ModalDialogComponent, PaginationComponent, CategoryFilterPipe } from '@matrimony/common';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { EditDetailComponent } from './components/edit-detail/edit-detail.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
    declarations: [
        LandingComponent,
        ModalDialogComponent,
        PaginationComponent,
        CategoryFilterPipe,
        HomePageComponent,
        DetailsComponent,
        EditDetailComponent,
        ProfileComponent
    ],
    imports: [
        Ng5SliderModule,
        SharedModule,
        LandingRouterModule,
        FormsModule,
        ReactiveFormsModule
        
    ],
    entryComponents: [
        ModalDialogComponent
    ],
    providers: [
        CategoryFilterPipe
    ]
})
export class LandingModule { }