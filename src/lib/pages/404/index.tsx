import {
  Box,
  Button,
  Heading,
  Image,
  // Text,
  // Link as ChakraLink,
  useColorMode,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";

import MotionBox from "lib/components/motion/Box";

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={["100%", "70%", "60%", "60%"]}
        margin="0 auto"
      >
        <Image
          src="/404 Error-pana.svg"
          alt="Error 404 not found Illustration"
        />
      </MotionBox>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Link href="/" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "blue.500"}
            >
              Let&apos;s Head Back
            </Button>
          </Link>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page404;
