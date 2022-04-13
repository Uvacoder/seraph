import { Box, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import DotMenu from "../samples/DotMenu";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="lg" cursor="pointer" mt={2}>
        <Link href="/" passHref>
          <Image
            src="/images/android-chrome-512x512.png"
            width={40}
            height={40}
          />
        </Link>
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
