import { Routes } from '@angular/router';
import { SearchAsYouTypeComponent } from '../pages/search-as-you-type/search-as-you-type.component';
import { TableOfContents } from '../pages/table-of-contents/table-of-contents';
import { CaseStudySelectAllPageComponent } from '../pages/case-study-select-all/select-all.component';
import { CaseStudyAssociationsPageComponent } from '../pages/case-study-associations/case-study-associations';

export const routes: Routes = [
  { path: '', component: TableOfContents },
  { path: 'searchWords', component: SearchAsYouTypeComponent },
  { path: 'selectAll', component: CaseStudySelectAllPageComponent },
  { path: 'associations', component: CaseStudyAssociationsPageComponent },
];
