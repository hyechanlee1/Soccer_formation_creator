import { Routes } from '@angular/router';
import { CreateFormationComponent } from './createformation/createformation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/create-formation', pathMatch: 'full' },
  { path: 'create-formation', component: CreateFormationComponent },
];
