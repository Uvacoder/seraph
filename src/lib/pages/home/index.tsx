import { Box } from "@chakra-ui/react";

import AboutText from "lib/components/samples/AboutText";
import CTASection from "lib/components/samples/CTASection";
import SomeImage from "lib/components/samples/Illustration";

const Home = () => {
  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      minHeight="70vh"
      gap={8}
      mb={8}
      w="full"
    >
      <SomeImage />

      <Box>
        <AboutText />
        <CTASection />
      </Box>
    </Box>
  );
};

export default Home;
