import { Component, Element, h } from "@stencil/core";
import formatCode from "./formatCode";

@Component({
  tag: "code-highlighter",
  styleUrls: ["prism.css", "code-highlighter.css"],
  shadow: true
})
export class GroupOption {
  @Element() el: HTMLElement;

  render() {
    return (
      <pre class="language-css">
        <code class="language-css" innerHTML={formatCode(this.el.innerHTML, "css")} />
      </pre>
    );
  }
}
