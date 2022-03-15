import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        {new Date().getFullYear()} -{" "}
        <Link
          href="https://huncho-dev.vercel.app"
          isExternal
          rel="noopener noreferrer"
        >
          Quavo
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
