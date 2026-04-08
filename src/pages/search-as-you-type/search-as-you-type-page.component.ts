import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SearchAsYouTypeComponent } from './search-as-you-type.component';
import { ToggleComponent } from '../../components/toggle/toggle.component';
import './search-widget';

@Component({
  selector: 'app-search-as-you-type',
  imports: [
    CardComponent,
    SearchAsYouTypeComponent,
    ToggleComponent,
  ],
  templateUrl: './search-as-you-type-page.component.html',
  styleUrls: [
    './search-as-you-type-page.component.scss',
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchAsYouTypePageComponent {
  showReactCode = signal(false);

  toggleIsOn(isOn: boolean) {
    this.showReactCode.set(isOn)
  }
}
