import { render, screen, withSession } from "../../test-utils";
import SnippetCard from "lib/components/snippet-card";
import type { SnippetProps } from "lib/types/index";

jest.mock("next-auth/react");

const snippet: SnippetProps = {
  id: "1",
  title: "test",
  author: {
    id: "1",
    email: "a",
    name: "Delta",
  },
  createdAt: "1",
  updatedAt: "1",
  files: [],
  visibility: "public",
};

let remove: () => void;

describe("Dashboard Component", () => {
  it("should render a snippet card", async () => {
    withSession();

    render(<SnippetCard snippet={snippet} remove={remove} />);

    const createdOn = screen.getByText(/Created on:/i);
    const updatedOn = screen.getByText(/Updated on:/i);

    expect(createdOn).toBeInTheDocument();
    expect(updatedOn).toBeInTheDocument();
  });
});
