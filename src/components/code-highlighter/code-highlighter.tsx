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
  @Prop({ mutable: true, reflectToAttr: true }) collapsed: boolean = false;

  @Element() el: HTMLElement;

  copy() {
    navigator.clipboard.writeText(this.el.innerHTML);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

  render() {
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
