import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestScheduler } from 'rxjs/testing';
import { SearchAsYouTypeComponent } from './search-as-you-type.component';

describe('SearchAsYouType', () => {
  let component: SearchAsYouTypeComponent;
  let fixture: ComponentFixture<SearchAsYouTypeComponent>;
  let httpMock: HttpTestingController;
  let testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });

  const expectedUrl = 'https://api.datamuse.com/sug?s=apple';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAsYouTypeComponent],
      providers: [SearchAsYouTypeComponent, provideHttpClientTesting()]
    }).compileComponents();
    jasmine.clock().install();

    fixture = TestBed.createComponent(SearchAsYouTypeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    await fixture.whenStable();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with initial state', () => {
    expect(component.state()).toEqual('initial');
  });

  it('should have initial state if search string is less than 3 characters', () => {
    component.searchString.set('ab');
    expect(component.state()).toEqual('initial');
  });

  it('should have empty state if search string is at least 3 characters but there are no suggested words', () => {
    component.searchString.set('abo');
    expect(component.state()).toEqual('empty');
  });

  it('should have loaded state if search string is at least 3 characters and there are suggestions', () => {
    component.searchString.set('abo');
    component.suggestions.set([
      { word: 'abode', score: 3 },
      { word: 'about', score: 2},
      { word: 'above', score: 1 }]);
    expect(component.state()).toEqual('loaded');
  });

  it('should debounce the search and only call API after 300ms', () => {
    testScheduler.run(({ flush }) => {
      // Simulate the user typing
      component.onInputChange('appl');
      jasmine.clock().tick(299);
      component.onInputChange('apple');

      // No request should have been made yet
      httpMock.expectNone(expectedUrl);

      // Move time forward the final 1ms
      jasmine.clock().tick(1);
      flush();

      // Assert: The request is now fired
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');

      // Complete the request
      const expected = { word: 'apple', score: 100 }
      req.flush([expected]);

      // Final state check
      expect(component.suggestions()).toContain(expected);
      jasmine.clock().uninstall();
    });
  });

  it('should not send another request if response is cached', () => {
    testScheduler.run(({ flush }) => {
      // Make a search and have response cached
      component.onInputChange('apple');
      jasmine.clock().tick(300);
      flush();
      const req = httpMock.expectOne(expectedUrl);
      req.flush([{ word: 'apple', score: 100 }]);

      // Clear search string
      component.onInputChange(''); // clear request
      jasmine.clock().tick(300);
      flush();

      // Make same search, no request made because response retrieved from cached
      component.onInputChange('apple');
      jasmine.clock().tick(300);
      flush();
      httpMock.expectNone(expectedUrl);
    })
  });

  it('should not send a request if search string is less than 3 characters', () => {
    testScheduler.run(({ flush }) => {
      component.onInputChange('ap');
      jasmine.clock().tick(300);
      flush();
      httpMock.expectNone(expectedUrl);
    })
  })
});
