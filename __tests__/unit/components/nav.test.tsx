import { render, screen, withSession } from "../../test-utils";
import MobileNav from "lib/components/mobile-nav";

jest.mock("next-auth/react");
let onOpen: () => void;

describe("Navigation component", () => {
  it("should render navigation with user details", async () => {
    withSession();

    render(<MobileNav onOpen={onOpen} />);

    const signOut = screen.getByText(/Sign out/i);
    const mySnippets = screen.getByText(/My Snippets/i);
    const newSnippet = screen.getByText(/New Snippet/i);
    const sourceCode = screen.getByText(/Source Code/i);

    expect(signOut).toBeInTheDocument();
    expect(mySnippets).toBeInTheDocument();
    expect(newSnippet).toBeInTheDocument();
    expect(sourceCode).toBeInTheDocument();
  });
});
