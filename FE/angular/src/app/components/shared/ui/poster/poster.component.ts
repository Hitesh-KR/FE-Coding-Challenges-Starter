import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosterComponent {
  @Input() imgSrc: string;
  @Input() imgAlt: string;
}
