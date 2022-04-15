import {
  Box,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiFillFileAdd } from "react-icons/ai";

import MobileNav from "lib/components/mobile-nav";

export default function SidebarWithHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { onOpen } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.800")} margin={0}>
      <MobileNav onOpen={onOpen} />
      <Box p="2" mx="auto" maxW="90%" pt={10}>
        <Box display="flex" alignSelf="end">
          <Link href="/dashboard/new" passHref>
            <Button
              ml="auto"
              mr={6}
              borderRadius={4}
              borderWidth="1px"
              borderColor="gray.800"
              leftIcon={<AiFillFileAdd />}
              color={useColorModeValue("white", "gray.300")}
              bg={useColorModeValue("gray.700", "gray.900")}
              _hover={{
                transform: "translateY(-1.5px)",
              }}
            >
              Create Snippet
            </Button>
          </Link>
        </Box>
        {children}
      </Box>
    </Box>
  );
}
