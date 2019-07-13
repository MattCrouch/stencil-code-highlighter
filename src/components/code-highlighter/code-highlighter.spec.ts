jest.mock("./formatCode", () => (code: string) => code);

import { newSpecPage } from '@stencil/core/testing';
import { CodeHighlighter } from './code-highlighter';

it('renders successfully', async () => {
  const component = await newSpecPage({
    components: [CodeHighlighter],
    html: `<code-highlighter language="css"></code-highlighter>`,
  });
  expect(component.root).toMatchSnapshot();
});