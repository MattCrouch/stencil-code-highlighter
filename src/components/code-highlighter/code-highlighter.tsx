import { Component, Element, h, Prop, Watch, State } from "@stencil/core";
import formatCode, { isSupported } from "./formatCode";

@Component({
  tag: "code-highlighter",
  styleUrls: ["prism.css", "code-highlighter.css"],
  shadow: true
})
export class CodeHighlighter {
  @Prop() filename: string;
  @Prop() language: string;
  @Prop({ mutable: true, reflect: true }) collapsed: boolean = false;

  @State() error: boolean = false;

  @Watch('language')
  validateLanguage(value: string) {
    if(typeof value !== "string") {
      this.error = true;
      throw new Error("Language must be set");
    }

    if (!isSupported(value)) {
      this.error = true;
      throw new Error("Language not supported");
    }

    this.error = false;
  }

  @Element() el: HTMLElement;

  connectedCallback() {
    this.validateLanguage(this.language);
  }

  copy() {
    navigator.clipboard.writeText(this.el.innerHTML);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  render() {
    if(this.error) {
      return null;
    }

    return (
      <div class="container">
        { !this.collapsed && <pre class={`language-${this.language}`}>
          <code class={`language-${this.language}`} innerHTML={formatCode(this.el.innerHTML, this.language)} />
        </pre> }
        <div class="footer">
          <span>{ this.filename }</span>
          <button onClick={this.copy.bind(this)}>Copy</button>
          <button onClick={this.toggle.bind(this)}>Toggle</button>
        </div>
      </div>
    );
  }
}