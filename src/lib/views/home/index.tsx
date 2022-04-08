import { Box } from "@chakra-ui/react";

import AboutText from "lib/components/samples/AboutText";
import CTASection from "lib/components/samples/CTASection";
import HomeImage from "lib/components/samples/HomeImage";

const Home = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="70vh"
      placeContent="center"
      gap={8}
      mb={8}
      w="full"
    >
      <Box w={{ base: "100%", md: "60%" }} mx="auto">
        <AboutText />
        <CTASection />
      </Box>
      <HomeImage />
    </Box>
  );
};

export default Home;
