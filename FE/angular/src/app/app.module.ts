import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationService } from './components/navigation/navigation.service';
import { DataService } from './data-access/services/data.service';
import { MoviesFacade } from './data-access/facades/movies.facade';
import { MovieStore } from './data-access/store/movies.store';
import { MoviesModule } from './components/movies/movies.module';
import { MovieModule } from './components/movie/movie.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, MoviesModule, MovieModule],
  providers: [DataService, NavigationService, MovieStore, MoviesFacade],
  bootstrap: [AppComponent]
})
export class AppModule {}
