import { Routes } from '@angular/router';
import { CreateFormationComponent } from './createformation/createformation.component';
import { HomeComponent } from './home/home/home.component';
import { SavedformationsComponent } from './savedformations/savedformations/savedformations.component';

export const routes: Routes = [
    { path: '', redirectTo: '/create-formation', pathMatch: 'full' },
    { path: 'create-formation', component: CreateFormationComponent },
  ];
