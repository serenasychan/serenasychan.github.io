import { Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  imports: [
    FaIconComponent
  ],
  template: `
    <span class="title">
      <fa-icon
        [icon]="icon()">
        </fa-icon>
      {{ title() }}
    </span>
    <div class="text">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  icon = input(faCircleInfo)
  title = input('');
}
