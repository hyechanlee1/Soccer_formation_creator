import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { SavedformationsComponent } from './savedformations/savedformations/savedformations.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-formation', component: HomeComponent, pathMatch: 'full' },
  { path: 'saved-formations', component: SavedformationsComponent, pathMatch: 'full' }
];
