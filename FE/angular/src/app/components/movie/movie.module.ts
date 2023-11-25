import { NgModule } from '@angular/core';
import { MovieRoutingModule } from './movie-routing.module';
import { NavigationModule } from '../navigation/navigation.module';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [MovieRoutingModule, NavigationModule, CommonModule]
})
export class MovieModule {}
