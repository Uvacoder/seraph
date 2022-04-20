/* eslint-disable @typescript-eslint/no-unused-vars */
import IndexHero from "../../../src/pages/index";
import { render, screen, withSession } from "../../test-utils";

jest.mock("next-auth/react");

describe("HomePage", () => {
  it("should render tagline and button text", async () => {
    withSession();

    render(<IndexHero />);

    const heading = screen.getByText(
      /Seraph is a feature-rich web application where you can create and save code snippets for easier access and sharing. Give it a try!/i
    );

    const github = screen.getByText(/Signin with GitHub/i);
    const google = screen.getByText(/Continue with Google/i);

    expect(heading).toBeInTheDocument();
    expect(github).toBeInTheDocument();
    expect(google).toBeInTheDocument();
  });
});
