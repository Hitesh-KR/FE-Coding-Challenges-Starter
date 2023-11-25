import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleComponent {
  @Input() title: string;
  @Input() year: number;
}
