import AllSnippets from "../../../src/lib/views/all-snippets";
import { render, screen, withSession } from "../../test-utils";

jest.mock("next-auth/react");

describe("SnippetsPage", () => {
  it("should display all user snippets", async () => {
    withSession();

    render(<AllSnippets snippets={[]} />);

    const heading = screen.getByText(/Your snippets/i);

    expect(heading).toBeInTheDocument();
  });
});
