import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "mutationobserver-shim";
import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import type React from "react";

const ChakraWrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

// Custom render function allowing Chakra UI to be used
// Errors are thrown if Chakra UI is not used
const customRender = (ui, options?) =>
  render(ui, {
    wrapper: ChakraWrapper,
    ...options,
  });

// custom function to mock next-auth's session
// I call it in every test page that needs session
export function withSession() {
  const mockSession: Session = {
    expires: "1",
    user: { id: "1", email: "a", name: "Delta", image: "c" },
  };
  return (useSession as jest.Mock).mockReturnValueOnce([mockSession, false]);
}

export * from "@testing-library/react";
export { customRender as render };
