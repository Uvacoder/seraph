import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

import colors from "./colors";
import Button from "./components/button";
import fonts from "./fonts";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  fonts,
  colors,
  components: {
    Button,
  },
});

export default customTheme;
