import type { Session } from "next-auth";
import { useSession } from "next-auth/react";

import AllSnippets from "../../src/lib/views/all-snippets";
import { render, screen } from "../test-utils";

jest.mock("next-auth/react");

describe("HomePage", () => {
  it("should tell user about their snippets", async () => {
    const mockSession: Session = {
      expires: "1",
      user: { id: "1", email: "a", name: "Delta", image: "c" },
    };

    (useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);

    render(<AllSnippets snippets={[]} />);

    const heading = screen.getByRole("heading", {
      name: /Your snippets/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
