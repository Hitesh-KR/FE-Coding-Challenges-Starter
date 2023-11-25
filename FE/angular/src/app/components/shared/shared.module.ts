import { NgModule } from '@angular/core';
import { PosterComponent } from './ui/poster/poster.component';
import { TitleComponent } from './ui/title/title.component';
import { MetaDataComponent } from './ui/metadata/metadata.component';
import { CommonModule } from '@angular/common';
import { PlotComponent } from './ui/plot/plot.component';

const components = [PosterComponent, TitleComponent, MetaDataComponent, PlotComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components]
})
export class SharedModule {}
