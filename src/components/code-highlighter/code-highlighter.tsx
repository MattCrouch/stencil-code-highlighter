// Import Stencil decorators and JSX transform
import { Component, Element, h, Prop, Watch, State } from "@stencil/core";

// Import util used to format code
import formatCode, { isSupported } from "../../utils/formatCode";

// Create a `code-highlighter` component
@Component({
  shadow: true,
  styleUrls: ["prism.css", "code-highlighter.css"],
  tag: "code-highlighter"
})
export class CodeHighlighter {
  // Create props for filename, language and collapsed attributes
  @Prop() filename: string;
  @Prop() language: string;
  @Prop({ mutable: true, reflect: true }) collapsed: boolean = false;

  // Hold state for whether an error has occured or not
  @State() error: boolean = false;

  // Watch and validate the `language` prop
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

  // Keep a reference to the element itself
  @Element() el: HTMLElement;

  // Check the language when the component is added
  connectedCallback() {
    this.validateLanguage(this.language);
  }

  // Copy code to clipboard
  copy() {
    // Generate a temporary textarea
    const temp = document.createElement("textarea");
    temp.readOnly = true;

    // Apply code to textarea
    temp.value = this.el.innerHTML;

    // Add to page to enable copy ability
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");

    // Clean up textarea
    document.body.removeChild(temp);
  }

  // Toggle the code area on/off
  toggle() {
    this.collapsed = !this.collapsed;
  }

  // Define what the component looks like
  render() {
    // Don't show anything if there is an error
    if (this.error) {
      return null;
    }

    return (
      <div class="container">
        <div class="header">
          {/* Toggle the code if the filename is clicked */}
          <button class="toggle" onClick={this.toggle.bind(this)}>
            {/* Indicate if the code is collapsed or not */}
            <span
              class="indicator"
              innerHTML={this.collapsed ? "&#9656;" : "&#9662;"}
            />
            <span>{this.filename}</span>
          </button>
          {/* Copy code in one button click */}
          <button class="copy" onClick={this.copy.bind(this)}>
            Copy
          </button>
        </div>
        {/* Only show code if it is not collapsed */}
        {!this.collapsed && (
          // Add `language-*` class for Prism styling to apply
          <pre class={`language-${this.language}`}>
            {/* Apply code using `innerHTML` on <code> element */}
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
