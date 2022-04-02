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
} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { HiDotsVertical } from "react-icons/hi";

export default function DotMenu() {
  const { data: session } = useSession();
  return (
    <div>
      {session && session.user ? (
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
          <MenuList alignItems="center">
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
              <MenuItem>My Snippets</MenuItem>
            </Link>
            <Link href="/create-snippet" passHref>
              <MenuItem>New Snippet</MenuItem>
            </Link>
            <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : null}
    </div>
  );
}
