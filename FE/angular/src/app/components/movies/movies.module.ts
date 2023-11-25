import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { NavigationModule } from '../navigation/navigation.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MoviesComponent],
  imports: [MoviesRoutingModule, NavigationModule, CommonModule]
})
export class MoviesModule {}
