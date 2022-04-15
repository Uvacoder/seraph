import {
  chakra,
  Box,
  useColorModeValue,
  Button,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const IndexHero = () => {
  const { data: session, status } = useSession();

  return (
    <Box px={{ base: 0, sm: 8 }} py={24} mx="auto">
      <Box
        w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        textAlign={{ base: "left", md: "center" }}
      >
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "6xl" }}
          fontWeight="bold"
          lineHeight="none"
          letterSpacing={{ base: "normal", md: "tight" }}
          color={useColorModeValue("gray.900", "gray.100")}
        >
          All your{" "}
          <Text
            display={{ base: "block", lg: "inline" }}
            w="full"
            bgClip="text"
            bgGradient="linear(to-r, green.400,purple.500)"
            fontWeight="extrabold"
          >
            code snippets
          </Text>{" "}
          in one single place.
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 24 }}
          mb={6}
          fontSize={{ base: "lg", md: "xl" }}
          color={useColorModeValue("gray.600", "gray.300")}
        >
          Seraph is a feature-rich web application where you can create and save
          code snippets for easier access and sharing. Give it a try!
        </chakra.p>
        <Stack
          direction={{ base: "column", sm: "row" }}
          mb={{ base: 4, md: 8 }}
          mt={{ base: 4, md: 10 }}
          spacing={2}
          justifyContent={{ sm: "left", md: "center" }}
        >
          {!session?.user ? (
            <>
              <Button
                as="a"
                colorScheme="gray"
                leftIcon={<FcGoogle />}
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                isLoading={status === "loading"}
                disabled={status === "loading"}
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                w={{ base: "full", sm: "auto" }}
                px={{ base: 10, sm: 5 }}
                mb={{ base: 2, sm: 0 }}
                size="lg"
                cursor="pointer"
              >
                Continue with Google
              </Button>
              <Button
                as="a"
                colorScheme="gray"
                display="inline-flex"
                leftIcon={<AiFillGithub />}
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                isLoading={status === "loading"}
                disabled={status === "loading"}
                alignItems="center"
                justifyContent="center"
                w={{ base: "full", sm: "auto" }}
                px={{ base: 10, sm: 5 }}
                mb={{ base: 2, sm: 0 }}
                size="lg"
                cursor="pointer"
              >
                Signin with GitHub
              </Button>
            </>
          ) : (
            <>
              <Link href="/dashboard" passHref>
                <Button
                  as="a"
                  colorScheme="gray"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  w={{ base: "full", sm: "auto" }}
                  mb={{ base: 2, sm: 0 }}
                  size="lg"
                  cursor="pointer"
                >
                  My Snippets
                </Button>
              </Link>
              <Link href="/dashboard/new" passHref>
                <Button
                  as="a"
                  colorScheme="gray"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  w={{ base: "full", sm: "auto" }}
                  mb={{ base: 2, sm: 0 }}
                  size="lg"
                  cursor="pointer"
                >
                  Create Snippet
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Box>
      <Box
        w={{ base: "full", md: 10 / 12 }}
        mx="auto"
        mt={20}
        textAlign="center"
      >
        <Image
          w="full"
          rounded="lg"
          shadow="2xl"
          src="/images/screenshot.png"
          alt="Seraph app screenshot"
        />
      </Box>
    </Box>
  );
};

export default IndexHero;
