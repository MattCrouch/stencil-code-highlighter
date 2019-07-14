// Import Refractor and Rehype to apply the formatting
import Refractor from "refractor/core";
import Rehype from "rehype";

// Import supported languages
import tsx from "refractor/lang/tsx.js";

// Apply language support
Refractor.register(tsx);

// Create function that applies formatting classes to code
export const formatCode = (code: string, type: string) => {
  // Use Refractor to format code in to Prism syntax
  const nodes = Refractor.highlight(code, type);

  // Parse syntax to HTML
  const html = Rehype()
    .stringify({ type: "root", children: nodes })
    .toString();

  return html.trim();
};

// Check if Refractor setup supports the defined type
export const isSupported = (type: string) => {
  return Refractor.listLanguages().includes(type);
};

export default formatCode;
