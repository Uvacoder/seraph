import {
  Box,
  Grid,
  Heading,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { BsCheck2Circle } from "react-icons/bs";

const AboutText = () => {
  const { colorMode } = useColorMode();
  const textSize = useBreakpointValue({
    base: "xs",
    sm: "sm",
  });

  return (
    <Grid gap={2}>
      <Heading
        as="h2"
        fontSize={{ base: "lg", sm: "3xl" }}
        className="welcome-text"
      >
        Welcome to Seraph 👋
      </Heading>

      <Box
        backgroundColor={colorMode === "light" ? "gray.200" : "gray.700"}
        padding={7}
        borderRadius={4}
      >
        <Box fontSize={textSize}>
          <Text mb={2}>Code snippets sharing platform that allows you to:</Text>
          <Box display="flex" alignItems="center" mb={1}>
            <Box display="flex" fontSize={{ base: "md", sm: "lg" }} margin={0}>
              <BsCheck2Circle
                color={colorMode === "light" ? "#4D96FF" : "#00FFC6"}
              />
            </Box>
            <Text ml={1}>Share snippets via social media</Text>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Box display="flex" fontSize={{ base: "md", sm: "lg" }} margin={0}>
              <BsCheck2Circle
                color={colorMode === "light" ? "#4D96FF" : "#00FFC6"}
              />
            </Box>
            <Text ml={1}>Create public, private or protected snippets</Text>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Box display="flex" fontSize={{ base: "md", sm: "lg" }} margin={0}>
              <BsCheck2Circle
                color={colorMode === "light" ? "#4D96FF" : "#00FFC6"}
              />
            </Box>
            <Text ml={1}>Create new snippets on the fly</Text>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <Box display="flex" fontSize={{ base: "md", sm: "lg" }} margin={0}>
              <BsCheck2Circle
                color={colorMode === "light" ? "#4D96FF" : "#00FFC6"}
              />
            </Box>
            <Text ml={1}>Upload multiple files to create snippets</Text>
          </Box>
          <Text mt={2}>...and so much more!</Text>
        </Box>
      </Box>
    </Grid>
  );
};

export default AboutText;
