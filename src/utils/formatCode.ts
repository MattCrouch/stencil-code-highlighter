import Refractor from "refractor/core";
import Rehype from "rehype";

// Supported languages
import tsx from "refractor/lang/tsx.js";

Refractor.register(tsx);

export const formatCode = (code: string, type: string) => {
    var nodes = Refractor.highlight(code, type);

    var html = Rehype()
    .stringify({type: 'root', children: nodes})
    .toString();

    return html.trim();
}

export const isSupported = (type: string) => {
    return Refractor.listLanguages().includes(type);
}

export default formatCode;