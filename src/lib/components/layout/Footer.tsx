import { Box, Link, Text, useColorMode } from "@chakra-ui/react";

import HelperImage from "../samples/HelperImage";

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      as="footer"
      width="full"
      alignContent="center"
    >
      <Box>
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
      </Box>
      <Box display="flex">
        <Link href="https://nextjs.org" isExternal rel="noopener noreferrer">
          <HelperImage src={`/nextjs-icon-${colorMode}.svg`} label="NextJS" />
        </Link>
        <Link href="https://chakra-ui.com" isExternal rel="noopener noreferrer">
          <HelperImage
            src="/chakra-ui-logomark-colored.svg"
            label="Chakra UI"
          />
        </Link>
        <Link
          href="https://typescriptlang.org"
          isExternal
          rel="noopener noreferrer"
        >
          <HelperImage src="/ts-logo-512.svg" label="TypeScript" />
        </Link>
        <Link
          href="https://github.com/lucky-chap/seraph"
          isExternal
          rel="noopener noreferrer"
        >
          <HelperImage src="/github.png" label="Source Code" />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
