import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: '', component: MoviesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
