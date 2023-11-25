import { NgModule } from '@angular/core';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { NavigationModule } from '../navigation/navigation.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MoviesComponent],
  imports: [MoviesRoutingModule, NavigationModule, CommonModule, SharedModule]
})
export class MoviesModule {}
