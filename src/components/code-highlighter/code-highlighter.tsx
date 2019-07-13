import { Component, Element, h, Prop, Watch, State } from "@stencil/core";
import formatCode, { isSupported } from "../../utils/formatCode";

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

  @Watch("language")
  validateLanguage(value: string) {
    if (typeof value !== "string") {
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
    const temp = document.createElement("textarea");
    temp.readOnly = true;
    temp.value = this.el.innerHTML;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  render() {
    if (this.error) {
      return null;
    }

    return (
      <div class="container">
        <div class="header">
          <button class="toggle" onClick={this.toggle.bind(this)}>
            <span
              class="indicator"
              innerHTML={this.collapsed ? "&#9656;" : "&#9662;"}
            />
            <span>{this.filename}</span>
          </button>
          <button class="copy" onClick={this.copy.bind(this)}>
            Copy
          </button>
        </div>
        {!this.collapsed && (
          <pre class={`language-${this.language}`}>
            <code
              class={`language-${this.language}`}
              innerHTML={formatCode(this.el.innerHTML, this.language)}
            />
          </pre>
        )}
      </div>
    );
  }
}
