import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudySelectAllPageComponent } from './select-all.component';

describe('ServerSideGrid', () => {
  let component: CaseStudySelectAllPageComponent;
  let fixture: ComponentFixture<CaseStudySelectAllPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudySelectAllPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudySelectAllPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
