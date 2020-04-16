import { DetailsComponent } from './components/details/details.component';
import { EditDetailComponent } from './components/edit-detail/edit-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent, HomePageComponent } from './components/index';

const routes: Routes = [
    { path: '', component: HomePageComponent, pathMatch: 'full' },
    { path: 'landing', component: LandingComponent },
    { path: 'detail', component: DetailsComponent },
    { path: 'edit', component: EditDetailComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', component: HomePageComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRouterModule { }