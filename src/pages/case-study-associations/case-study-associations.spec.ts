import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudyAssociationsPageComponent } from './case-study-associations';

describe('CaseStudyAssociations', () => {
  let component: CaseStudyAssociationsPageComponent;
  let fixture: ComponentFixture<CaseStudyAssociationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudyAssociationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudyAssociationsPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
