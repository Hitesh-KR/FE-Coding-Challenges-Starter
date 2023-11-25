import { NgModule } from '@angular/core';
import { MovieRoutingModule } from './movie-routing.module';
import { NavigationModule } from '../navigation/navigation.module';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MovieComponent],
  imports: [MovieRoutingModule, NavigationModule, CommonModule, SharedModule]
})
export class MovieModule {}
