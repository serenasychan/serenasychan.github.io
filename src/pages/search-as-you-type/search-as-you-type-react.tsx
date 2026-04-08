import React from 'react';
import { SuggestedWord } from './suggested-word';
import { faCircleInfo, faHourglass, faSearch, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

const MIN_SEARCH_LENGTH = 3;
const cache = new Map();
type SearchState = 'loading' | 'initial' | 'empty' | 'loaded';
const MESSAGES: Record<SearchState, string> = {
  loading: "Loading...",
  initial: `Please enter at least ${MIN_SEARCH_LENGTH} characters`,
  empty: "No matches found.",
  loaded: "" // Unused but satisfies indexer
};

const ICONS: Record<string, IconDefinition> = {
  initial: faTriangleExclamation,
  loading: faHourglass,
  info: faCircleInfo,
  empty: faSearch,
}

export const SearchAsYouTypeReactComponent = () => {
  const [searchString, setSearchString] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<string[] | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Memoize current state to only update if there are changes
  const currentState: SearchState = React.useMemo(() => {
    if (searchString.length < MIN_SEARCH_LENGTH) return 'initial';
    if (isLoading) return 'loading';
    if (suggestions === null) return 'empty';
    return 'loaded';
  }, [isLoading, searchString, suggestions]);

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // 1. Filter out inputs less than minimum length
    if (searchString.length < MIN_SEARCH_LENGTH) {
      setSuggestions([]);
      return;
    }

    let active = true;

    // 2. Debounce: wait 300ms
    const timer = setTimeout(async() => {
      // 3. Cache check
      if (cache.has(searchString) && active) {
        setSuggestions(cache.get(searchString));
        return;
      }

      setSuggestions(null);
      setIsLoading(true);

      try {
        const response = await fetch(`https://api.datamuse.com/sug?s=${searchString}`, { signal });
        if (!response.ok) throw new Error('Network error');

        const data: SuggestedWord[] = await response.json();

        // 4. Sort results
        const sortedData = data.length === 0
          ? null
          : data.sort((a, b) => a.score - b.score)
            .map((s) => s.word);

        if (active) {
          cache.set(searchString, sortedData);
          setSuggestions(sortedData);
          setIsLoading(false);
        }
      } catch (error) {
        if (active) {
          setSuggestions(null);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }, 300);

    // 5. Cleanup
    return () => {
      active = false;         // "Unsubscribe" UI
      controller.abort();     // "Unsubscribe" Network
      clearTimeout(timer);    // "Unsubscribe" Timer
    };
  }, [searchString]);

  return (
    <>
      <input
        id="search-input"
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search for words starting with..."
      />

      {currentState === 'loaded' ? (
        <div className='results'>
          <ol>
            {suggestions?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className='noResults' aria-live="polite" role="status">
          <div className='fa-icon'>
            <FontAwesomeIcon icon={ICONS[currentState]} />
          </div>
          {MESSAGES[currentState]}
        </div>
      )}
    </>
  );
}
