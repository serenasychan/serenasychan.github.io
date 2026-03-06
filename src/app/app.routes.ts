import { Routes } from '@angular/router';
import { SearchAsYouTypeComponent } from '../pages/search-as-you-type/search-as-you-type.component';
import { HomePage } from '../pages/home-page/home-page.component';
import { CaseStudySelectAllPageComponent } from '../pages/case-study-select-all/select-all.component';
import { CaseStudyAssociationsPageComponent } from '../pages/case-study-associations/case-study-associations';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'search-words', component: SearchAsYouTypeComponent },
  { path: 'select-all', component: CaseStudySelectAllPageComponent },
  { path: 'associations', component: CaseStudyAssociationsPageComponent },
];
