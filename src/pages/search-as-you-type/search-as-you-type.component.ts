import { Component, computed, DestroyRef, signal, WritableSignal } from '@angular/core';
import { SuggestedWord } from './suggested-word';
import { catchError, debounceTime, distinctUntilChanged, filter, map, of, Subject, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faCircleInfo, faHourglass, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type State = 'loading' | 'empty' | 'initial' | 'loaded';

@Component({
  selector: 'app-search-as-you-type',
  imports: [
    FormsModule,
    FaIconComponent
  ],
  templateUrl: './search-as-you-type.component.html',
  styleUrl: './search-as-you-type.component.scss',
})
export class SearchAsYouType {
  ICONS = {
    alert: faTriangleExclamation,
    hourglass: faHourglass,
    info: faCircleInfo,
  }
  MIN_SEARCH_LENGTH = 3;

  searchString = signal('');
  private showLoading = signal(false);
  state = computed<State>(() => {
    if (this.showLoading()) {
      return 'loading';
    }
    if (this.searchString().length < this.MIN_SEARCH_LENGTH) {
      return 'initial';
    }
    if (this.suggestions().length === 0) {
      return 'empty'
    }
    return 'loaded';
  })

  suggestions: WritableSignal<SuggestedWord[]> = signal([]);

  private cache = new Map<string, SuggestedWord[]>();
  private searchSubject = new Subject<string>();

  constructor(private http: HttpClient, destroyRef: DestroyRef) {
    this.searchSubject.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((searchString: string) => searchString.length >= this.MIN_SEARCH_LENGTH),
      tap(() => this.showLoading.set(true)),
      switchMap((searchString) => {
        const cachedSuggestion = this.cache.get(searchString);
        if (cachedSuggestion) {
          return of(cachedSuggestion);
        } else {
          return this.http.get<SuggestedWord[]>(`https://api.datamuse.com/sug?s=${searchString}`)
            .pipe(
              tap((suggestions) => {
                this.cache.set(searchString, suggestions)
              }),
              catchError(() => of([])))
        }
      }),
      map((suggestionDTOs) => suggestionDTOs.sort((s) => s.score)),
      takeUntilDestroyed(destroyRef),
    ).subscribe({
      next: (suggestions: SuggestedWord[]) => {
        this.suggestions.set(suggestions);
        this.showLoading.set(false);
      },
      error: () => { this.showLoading.set(false); }
    });
  }

  onInputChange(searchString: string) {
    this.searchSubject.next(searchString);
  }
}
