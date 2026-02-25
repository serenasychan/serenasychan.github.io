import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { faLightbulb, faListCheck, faRoadBarrier } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-case-study-select-all',
  imports: [
    CardComponent
  ],
  templateUrl: './select-all.component.html',
  styleUrl: './select-all.component.scss',
})
export class CaseStudySelectAllPageComponent {
  ICONS = {
    lightbulb: faLightbulb,
    roadBarrier: faRoadBarrier,
    task: faListCheck
    ,
  }
}
