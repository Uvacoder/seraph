import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useColorMode,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";

export default function SaveButton({
  radioValue,
  setRadioValue,
  submitting,
}: {
  radioValue: string;
  setRadioValue: (value: string) => void;
  submitting: boolean;
}) {
  const { colorMode } = useColorMode();
  return (
    <div>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignContent="center"
        mt={10}
      >
        <Button
          p={2}
          borderRadius={5}
          w={{ base: "100%", sm: "40%" }}
          type="submit"
          bg={colorMode === "light" ? "blue.500" : "blue.600"}
          color="white"
          _hover={{
            bg: colorMode === "light" ? "blue.600" : "blue.700",
          }}
          _active={{
            bg: colorMode === "light" ? "blue.700" : "blue.800",
          }}
          aria-label="Save snippet"
          isLoading={submitting}
        >
          Save
        </Button>
        <Menu>
          <MenuButton
            as={Button}
            borderRadius={5}
            ml={2}
            bg={colorMode === "light" ? "blue.500" : "blue.600"}
            color="white"
            _hover={{
              bg: colorMode === "light" ? "blue.600" : "blue.700",
            }}
            _active={{
              bg: colorMode === "light" ? "blue.700" : "blue.800",
            }}
            aria-label="Save snippet"
            disabled={submitting}
          >
            <HiDotsVertical />
          </MenuButton>
          <MenuList>
            <RadioGroup
              defaultValue="PUBLIC"
              onChange={setRadioValue}
              value={radioValue}
            >
              <MenuItem>
                <Radio value="PUBLIC">PUBLIC</Radio>
              </MenuItem>
              <MenuItem>
                <Radio value="PRIVATE">PRIVATE</Radio>
              </MenuItem>
            </RadioGroup>
          </MenuList>
        </Menu>
      </Box>
    </div>
  );
}
