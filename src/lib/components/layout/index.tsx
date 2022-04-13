import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <Box>
      {!router.pathname.includes("/dashboard") ? (
        <Box margin="0 auto" maxWidth={1300} transition="0.5s ease-out">
          <Box margin="8">
            <Header />
            <Box as="main" marginY={22}>
              {children}
            </Box>
            <Footer />
          </Box>
        </Box>
      ) : (
        <Box maxWidth={4500}>
          <Box margin="0">
            <Box as="main">{children}</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Layout;
