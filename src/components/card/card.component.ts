import { Component, input } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  imports: [
    FaIconComponent
  ],
  template: `
    <div class="card">
      <fa-icon
        [icon]="icon()"
        [size]="'2x'">
      </fa-icon>
      <div class="card__text">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './card.component.scss',
})
export class CardComponent {
  icon = input(faCircleInfo)
}
