import Refractor from "refractor";
import Rehype from "rehype";

export const formatCode = (code: string, type: string) => {
    var nodes = Refractor.highlight(code, type);

    var html = Rehype()
    .stringify({type: 'root', children: nodes})
    .toString();

    return html.trim();
}

export default formatCode;