import { Routes } from '@angular/router';
import { SearchAsYouType } from "../pages/search-as-you-type/search-as-you-type.component";
import { TableOfContents } from '../pages/table-of-contents/table-of-contents';
import { CaseStudySelectAllPageComponent } from '../pages/case-study-select-all/select-all.component';

export const routes: Routes = [
  { path: '', component: TableOfContents },
  { path: 'searchWords', component: SearchAsYouType },
  { path: 'selectAll', component: CaseStudySelectAllPageComponent },
];
