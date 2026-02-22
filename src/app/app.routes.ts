import { Routes } from '@angular/router';
import { SearchAsYouType } from "../pages/search-as-you-type/search-as-you-type.component";
import { TableOfContents } from '../pages/table-of-contents/table-of-contents';

export const routes: Routes = [
  { path: '', component: TableOfContents },
  { path: 'searchWords', component: SearchAsYouType },
];
