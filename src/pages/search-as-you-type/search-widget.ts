class SearchWidget extends HTMLElement {
  private root: any = null;

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

    this.root = createRoot(this);
    this.root.render(React.createElement(SearchAsYouTypeReactComponent));
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }
}

// Define the custom element name
if (!customElements.get('search-widget')) {
  customElements.define('search-widget', SearchWidget);
}
