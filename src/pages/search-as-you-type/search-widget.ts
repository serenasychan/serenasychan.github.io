import type { Root } from 'react-dom/client';
import { dom } from '@fortawesome/fontawesome-svg-core';

class SearchWidget extends HTMLElement {
  private root: Root | null = null;
  private readonly shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    // 1. Dynamically import React and the Component only when needed
    const [React, { createRoot }, { SearchAsYouTypeReactComponent }, styles] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('./search-as-you-type-react'),
      import('./search-as-you-type-react.css'),
    ]);

    const styleSheet = new CSSStyleSheet();

    const faStyles = dom.css();

    if (typeof styles.default === 'string') {
      const cssContent = `${faStyles}\n${styles.default}`;
      styleSheet.replaceSync(cssContent);
      this.shadow.adoptedStyleSheets = [styleSheet];
    } else {
      console.error('CSS failed to load as a string. Received:', styles.default);
    }
    if (!this.root) {
      this.root = createRoot(this.shadow);
    }
    this.root.render(React.createElement(SearchAsYouTypeReactComponent));
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }
}

// Define the custom element name with explicit typing
const tagName = 'search-widget';
const existingConstructor: CustomElementConstructor | undefined = customElements.get(tagName);

if (!existingConstructor) {
  customElements.define(tagName, SearchWidget);
} else {
  console.warn(`${tagName} is already defined by ${existingConstructor.name}`);
}
