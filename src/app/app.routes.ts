import { Routes } from '@angular/router';
import { HomePage } from '../pages/home-page/home-page.component';
import { CaseStudySelectAllPageComponent } from '../pages/case-study-select-all/select-all.component';
import { CaseStudyAssociationsPageComponent } from '../pages/case-study-associations/case-study-associations';
import { FinishNCourses } from '../pages/finish-n-courses/finish-n-courses';
import { SearchAsYouTypePageComponent } from '../pages/search-as-you-type/search-as-you-type-page.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'finish-courses', component: FinishNCourses },
  { path: 'search-words', component: SearchAsYouTypePageComponent },
  { path: 'select-all', component: CaseStudySelectAllPageComponent },
  { path: 'associations', component: CaseStudyAssociationsPageComponent },
];
