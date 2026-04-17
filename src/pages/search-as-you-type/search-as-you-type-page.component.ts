import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { SearchAsYouTypeComponent } from './search-as-you-type.component';
import { ToggleComponent } from '../../components/toggle/toggle.component';

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
export class SearchAsYouTypePageComponent implements OnInit {
  ngOnInit() {
    if (!document.getElementById('search-widget')) {
      const script = document.createElement('script');
      script.id = 'search-widget';

      script.src = 'assets/search-widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }

  showReactCode = signal(false);

  toggleIsOn(isOn: boolean) {
    this.showReactCode.set(isOn)
  }
}
