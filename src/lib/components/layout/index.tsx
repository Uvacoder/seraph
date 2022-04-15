import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

import SideBarWithHeader from "lib/components/dashboard";

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
        <Box margin="8" transition="0.5s ease-out">
          <Box maxWidth={1300} mx="auto">
            <Header />
            <Box as="main" marginY={22}>
              {children}
            </Box>
            <Footer />
          </Box>
        </Box>
      ) : (
        <Box maxWidth={4500} mx="auto">
          <Box margin="0">
            <SideBarWithHeader>{children}</SideBarWithHeader>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Layout;
