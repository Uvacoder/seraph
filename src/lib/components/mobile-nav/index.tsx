/* eslint-disable react/jsx-no-undef */
import type { FlexProps } from "@chakra-ui/react";
import {
  Flex,
  useColorModeValue,
  HStack,
  Menu,
  MenuButton,
  Avatar,
  VStack,
  Box,
  Text,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";

import ThemeToggle from "../layout/ThemeToggle";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { data: session } = useSession();
  return (
    <Flex
      // ml={{ base: 0 }}
      px={{ base: 4, md: 4 }}
      py={4}
      height="55px"
      alignItems="center"
      bg={useColorModeValue("white", "gray.800")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <Link href="/" passHref>
        <Box mr="auto" mt={1.5}>
          <Image
            src="/images/android-chrome-192x192.png"
            width={30}
            height={30}
          />
        </Box>
      </Link>

      {/* <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Seraph
      </Text> */}

      <HStack spacing={{ base: "0", md: "6" }}>
        <ThemeToggle />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size="sm" src={session?.user?.image as string} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{session?.user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Expires on:{" "}
                    {new Date(session?.expires as string).toDateString()}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.800")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>New Snippet</MenuItem>
              <MenuItem>My Snippets</MenuItem>
              <MenuItem>Source Code</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MobileNav;
