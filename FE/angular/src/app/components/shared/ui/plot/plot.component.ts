import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html'
})
export class PlotComponent {
  @Input() plot: string;
}
