import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

import DotMenu from "../samples/DotMenu";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="lg">
        <Link href="/">seraph</Link>
      </Heading>

      <Flex marginLeft="auto" alignContent="center">
        <Box mr={3} mt={2}>
          <DotMenu />
        </Box>
        <Box mt={1}>
          <ThemeToggle />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
