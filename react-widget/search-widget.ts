import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { dom } from '@fortawesome/fontawesome-svg-core';
import { SearchAsYouTypeReactComponent } from './search-as-you-type-react';
import styles from './search-as-you-type-react.css?inline';

class SearchWidget extends HTMLElement {
  private root: Root | null = null;
  private readonly shadow: ShadowRoot;

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.setupStyles();
  }

  private setupStyles() {
    const styleSheet = new CSSStyleSheet();
    const faStyles = dom.css();
    // Combine FontAwesome and custom CSS into the Shadow DOM
    styleSheet.replaceSync(`${faStyles}\n${styles}`);
    this.shadow.adoptedStyleSheets = [styleSheet];
  }

  connectedCallback() {
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
