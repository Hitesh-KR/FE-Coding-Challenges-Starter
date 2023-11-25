import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent {
  @Input() director: string;
  @Input() writer: string;
  @Input() actors: string;
}
