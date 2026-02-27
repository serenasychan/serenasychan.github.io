import { Component } from '@angular/core';
import { faLightbulb, faListCheck, faRoadBarrier } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-case-study-associations',
  imports: [
    CardComponent
  ],
  templateUrl: './case-study-associations.html',
  styleUrls: ['./case-study-associations.scss', '../case-study-select-all/select-all.component.scss'],
})
export class CaseStudyAssociationsPageComponent {
  ICONS = {
    lightbulb: faLightbulb,
    roadBarrier: faRoadBarrier,
    task: faListCheck,
    };
}
