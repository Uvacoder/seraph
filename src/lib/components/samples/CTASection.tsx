import { Box, Button, Code, Flex, Link } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const repoLink = "https://github.com/lucky-chap/seraph";

const CTASection = () => {
  return (
    <Box textAlign={{ base: "center", md: "left" }} marginTop={8}>
      <Flex
        marginY={4}
        justifyContent={{ base: "center", md: "left" }}
        gridGap={2}
      >
        <Button
          as="a"
          href={repoLink}
          target="_blank"
          leftIcon={<FcGoogle />}
          size="sm"
        >
          Continue with Google
        </Button>

        <Button
          as="a"
          href={repoLink}
          target="_blank"
          leftIcon={<AiFillGithub />}
          size="sm"
        >
          Login with GitHub
        </Button>
      </Flex>

      <Box mt={3}>
        <Code>
          This app is heavily inspired by{" "}
          <Link href="https://github.com/MaxLeiter">@maxleiter</Link>
        </Code>
        <br />
      </Box>

      <Flex
        justifyContent={{ base: "center", md: "left" }}
        alignItems="center"
        gridGap={2}
      >
        <Button
          as="a"
          href={repoLink}
          target="_blank"
          leftIcon={<AiFillGithub />}
          size="sm"
          mt={3}
        >
          Source Code
        </Button>
        {/* <Link href={repoLink} isExternal rel="noopener noreferrer">
          <Image
            align="center"
            src="https://img.shields.io/github/stars/sozonome/nextarter-chakra?style=social"
            alt="github stars"
          />
        </Link> */}
      </Flex>
    </Box>
  );
};

export default CTASection;
