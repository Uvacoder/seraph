import {
  Badge,
  Box,
  Flex,
  Heading,
  Link as ChakraLink,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="lg" cursor="pointer" mt={2} alignContent="center">
        <Link href="/" passHref>
          <Image
            src="/images/android-chrome-512x512.png"
            width={40}
            height={40}
          />
        </Link>
        <Badge
          textTransform="none"
          colorScheme="teal"
          borderRadius="full"
          ml={2}
          mb={5}
        >
          v1.1.0
        </Badge>
      </Heading>

      <Flex marginLeft="auto" alignContent="center">
        <ChakraLink isExternal href="https://github.com/lucky-chap/seraph">
          <Box mr={3} mt="19px" fontSize="lg">
            {/* <DotMenu /> */}
            <FaGithub />
          </Box>
        </ChakraLink>
        <Box mt={1}>
          <ThemeToggle />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
