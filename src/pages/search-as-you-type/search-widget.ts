import React from 'react';
import ReactDOM from 'react-dom/client';
import {SearchAsYouTypeReactComponent} from './search-as-you-type-react';

class SearchWidget extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  constructor() {
    super();
    this.root = null;
  }

  async connectedCallback() {
    // 1. Dynamically import React and the Component only when needed
    const [React, { createRoot }, { SearchAsYouTypeReactComponent }] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('./search-as-you-type-react')
    ]);

    this.root = ReactDOM.createRoot(this);
    this.render();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  render() {
    if (this.root) {
      this.root.render(React.createElement(SearchAsYouTypeReactComponent));
    }
  }
}

// Define the custom element name
if (!customElements.get('search-widget')) {
  customElements.define('search-widget', SearchWidget);
}
