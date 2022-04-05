import { IconButton, useColorMode } from "@chakra-ui/react";
import { RiMoonFill, RiSunLine } from "react-icons/ri";

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="theme toggle"
      icon={colorMode === "light" ? <RiMoonFill /> : <RiSunLine />}
      onClick={toggleColorMode}
      size="lg"
      backgroundColor="transparent"
      _active={{
        backgroundColor: "transparent",
      }}
      _hover={{
        backgroundColor: "transparent",
      }}
      _focus={{
        border: "none",
      }}
    />
  );
};

export default ThemeToggle;
