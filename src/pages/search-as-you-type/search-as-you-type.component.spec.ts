import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAsYouType } from './search-as-you-type.component';

describe('SearchAsYouTyp', () => {
  let component: SearchAsYouType;
  let fixture: ComponentFixture<SearchAsYouType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAsYouType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAsYouType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
