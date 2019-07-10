/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface CodeHighlighter {}
}

declare global {


  interface HTMLCodeHighlighterElement extends Components.CodeHighlighter, HTMLStencilElement {}
  var HTMLCodeHighlighterElement: {
    prototype: HTMLCodeHighlighterElement;
    new (): HTMLCodeHighlighterElement;
  };
  interface HTMLElementTagNameMap {
    'code-highlighter': HTMLCodeHighlighterElement;
  }
}

declare namespace LocalJSX {
  interface CodeHighlighter extends JSXBase.HTMLAttributes<HTMLCodeHighlighterElement> {}

  interface IntrinsicElements {
    'code-highlighter': CodeHighlighter;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


