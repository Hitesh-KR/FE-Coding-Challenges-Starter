import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-meta-data',
  templateUrl: './metadata.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaDataComponent {
  @Input() rated: string;
  @Input() runtime: string;
  @Input() released: string;
  @Input() genre: string;
}
