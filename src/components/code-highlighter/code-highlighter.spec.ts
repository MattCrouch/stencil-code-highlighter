// Mock `formatCode` to avoid complicating the unit test
jest.mock("./formatCode", () => (code: string) => code);

// Import Stencil testing tools
import { newSpecPage } from "@stencil/core/testing";

// Import component under test
import { CodeHighlighter } from "./code-highlighter";

// All tests must run async
it("renders as expected", async () => {
  // Generate a SpecPage containing this component
  const component = await newSpecPage({
    components: [CodeHighlighter],
    html: `<code-highlighter language="css"></code-highlighter>`
  });

  // Check it renders as expected
  expect(component.root).toMatchSnapshot();
});
