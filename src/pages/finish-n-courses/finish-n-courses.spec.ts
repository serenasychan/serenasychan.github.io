import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishNCourses } from './finish-n-courses';

describe('FinishNCourses', () => {
  let component: FinishNCourses;
  let fixture: ComponentFixture<FinishNCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishNCourses]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FinishNCourses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete if all courses have no prereqs', () => {
    expect(component.checkIfCanFinishAllCourses(['math', 'science', 'english'], [])).toBeTruthy();
  });

  it('should not complete if course has cyclic prereq that is not available', () => {
    const courses = ['math', 'science'];
    const coursePreReqs = [
      { course: 'math', preReq: 'science'},
      { course: 'science', preReq: 'math'},
    ];

    expect(component.checkIfCanFinishAllCourses(courses, coursePreReqs)).toBeFalsy();
  });

  it('should complete if a course with prereq is met', () => {
    const courses = ['math','physics'];
    const coursePreReqs = [
      { course: 'physics', preReq: 'math'},
    ];

    expect(component.checkIfCanFinishAllCourses(courses, coursePreReqs)).toBeTruthy();
  });

  it('should complete a course if a preReq and the preReq of the preReq is met', () => {
    const courses = ['math', 'calculus I', 'calculus II'];
    const coursePreReqs = [
      { course: 'calculus I', preReq: 'math'},
      { course: 'calculus II', preReq: 'calculus I' },
      { course: 'calculus II', preReq: 'math'},
    ];

    expect(component.checkIfCanFinishAllCourses(courses, coursePreReqs)).toBeTruthy();
  });

  it('should not complete if a prereq is not met', () => {
    const courses = ['calculus'];
    const coursePreReqs = [
      { course: 'calculus', preReq: 'algebra' }
    ];

    expect(component.checkIfCanFinishAllCourses(courses, coursePreReqs)).toBeFalsy();
  })
});
