import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex as="footer" width="full" align="center">
      <Text>
        {new Date().getFullYear()} -{" "}
        <Link
          href="https://seraph-app.vercel.app/"
          isExternal
          rel="noopener noreferrer"
        >
          seraph
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
