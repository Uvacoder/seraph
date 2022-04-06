/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Center,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Avatar as ChakraAvatar,
  Box,
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  AiFillFileAdd,
  AiOutlineInfoCircle,
  AiFillGithub,
} from "react-icons/ai";
import { BiBookContent } from "react-icons/bi";
import { HiDotsVertical } from "react-icons/hi";

export default function DotMenu() {
  const { data: session } = useSession();
  return (
    <div>
      <Menu>
        {/* <MenuButton
            as={Button}
            rounded="full"
            variant="link"
            cursor="pointer"
            minW={0}
            borderRadius={4}
          >
            <HiDotsVertical />
          </MenuButton> */}
        <MenuButton
          as={Button}
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
        >
          <HiDotsVertical />
        </MenuButton>
        <MenuList alignItems="center" zIndex={34}>
          {session?.user && (
            <>
              <br />
              <Center>
                <ChakraAvatar size="2xl" src={session.user.image as string} />
              </Center>
              <br />
              <Center>
                <Text p={4}>{session.user.name}</Text>
              </Center>
              <br />
              <MenuDivider />
              <Link href="/snippets" passHref>
                <Box display="flex" justifyContent="space-between">
                  <MenuItem>
                    <BiBookContent />
                    <Text ml={2}>My Snippets</Text>
                  </MenuItem>
                </Box>
              </Link>
              <Link href="/create-snippet" passHref>
                <Box display="flex" justifyContent="space-between">
                  <MenuItem>
                    <AiFillFileAdd />
                    <Text ml={2}>New Snippet</Text>
                  </MenuItem>
                </Box>
              </Link>
            </>
          )}
          {!session && (
            <Link href="/api/auth/signin" passHref>
              <MenuItem
                width="80%"
                mx="auto"
                _hover={{
                  boxShadow: "none",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                as={Button}
                mb={3}
                borderRadius={7}
              >
                Log in
              </MenuItem>
            </Link>
          )}
          {/* <Link href="/about" passHref>
            <Box display="flex" justifyContent="space-between">
              <MenuItem disabled>
                <AiOutlineInfoCircle />
                <Text ml={2}>About</Text>
              </MenuItem>
            </Box>
          </Link> */}
          <a
            href="https://github.com/lucky-chap/seraph"
            target="_blank"
            rel="noreferrer"
          >
            <Box display="flex" justifyContent="space-between">
              <MenuItem>
                <AiFillGithub />
                <Text ml={2}>GitHub</Text>
              </MenuItem>
            </Box>
          </a>
          {session?.user && (
            <>
              <MenuDivider />
              <MenuItem
                width="70%"
                mx="auto"
                _hover={{
                  boxShadow: "none",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                as={Button}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logout
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </div>
  );
}
