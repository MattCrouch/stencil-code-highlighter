import { Component, Element, h, Prop } from "@stencil/core";
import formatCode from "./formatCode";

@Component({
  tag: "code-highlighter",
  styleUrls: ["prism.css", "code-highlighter.css"],
  shadow: true
})
export class GroupOption {
  @Prop() filename: string;
  @Prop() language: string;
  @Element() el: HTMLElement;

  render() {
    return (
      <div class="container">
        <pre class={`language-${this.language}`}>
          <code class={`language-${this.language}`} innerHTML={formatCode(this.el.innerHTML, this.language)} />
        </pre>
        <div class="footer">
          <span>{ this.filename }</span>
          <button>Copy</button>
        </div>
      </div>
    );
  }
}
