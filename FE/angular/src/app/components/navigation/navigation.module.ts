import { NgModule } from '@angular/core';
import { DecadesComponent } from './decades/decades.component';
import { GoDetailsComponent } from './go-details/go-details.component';
import { GoBackComponent } from './go-back/go-back.component';
import { GoImdbComponent } from './go-imdb/go-imdb.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DecadesComponent, GoDetailsComponent, GoBackComponent, GoImdbComponent, SidebarComponent],
  imports: [CommonModule],
  exports: [DecadesComponent, GoDetailsComponent, GoBackComponent, GoImdbComponent]
})
export class NavigationModule {}
