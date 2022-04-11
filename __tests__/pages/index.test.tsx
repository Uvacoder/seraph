/* eslint-disable @typescript-eslint/no-unused-vars */

import AboutText from "../../src/lib/components/samples/AboutText";
import { render, screen } from "../test-utils";

describe("HomePage", () => {
  it("should render welcome text", async () => {
    render(<AboutText />);

    const heading = screen.getByRole("heading", {
      name: /Welcome to Seraph 👋/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
