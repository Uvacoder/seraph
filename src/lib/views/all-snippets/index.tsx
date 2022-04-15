/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  useToast,
  useColorMode,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineDelete } from "react-icons/ai";

import SnippetCard from "lib/components/snippet-card";
import type { SnippetProps } from "lib/types";

const AllSnippets = ({ snippets }: { snippets: SnippetProps[] }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const removeSnippet = (snippetId: string) => {
    if (session && session.user) {
      fetch(`/api/snippets/delete/${snippetId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: "Success",
              description: "Snippet deleted",
              status: "success",
              duration: 3000,
              isClosable: true,
              position: "top-end",
            });
            router.push("/dashboard");
          } else {
            toast({
              title: "Error",
              description: "Something went wrong",
              status: "error",
              duration: 3000,
              isClosable: true,
              position: "top-end",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (status === "unauthenticated") {
    router.push("/");
  }

  if (status === "loading") {
    return (
      <Box display="grid" placeContent="center" height="80vh">
        <Text>Loading...</Text>
      </Box>
    );
  }
  return (
    <Box p="2" minH="80vh">
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        flexWrap="wrap"
        mt={10}
        mx={4}
      >
        <Text
          color={colorMode === "light" ? "gray.800" : "white"}
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="lg"
          textTransform="uppercase"
          ml="2"
        >
          Your snippets
        </Text>
        <Box>
          <Badge rounded="full" px="2" alignContent="center" colorScheme="teal">
            {snippets?.length} in total
          </Badge>
        </Box>
      </Box>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacingX={4}
        // mx="auto"
        maxW={{ base: "full", sm: "90%" }}
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="flex-start"
        alignContent="center"
        flexWrap="wrap"
        px={{ base: 1, sm: 6 }}
      >
        {snippets?.length !== 0 ? (
          snippets?.map((snippet: SnippetProps) => (
            <Box key={snippet.id}>
              <SnippetCard
                remove={() => removeSnippet(snippet.id)}
                snippet={snippet}
              />
            </Box>
          ))
        ) : (
          <Box
            display="grid"
            placeContent="center"
            alignContent="center"
            height="55vh"
          >
            <Text mb={3}>Oops! You don&apos;t have any snippets yet. 🥲</Text>
            <Link href="/dashboard/new" passHref>
              <Button borderRadius={5} width="55%">
                Add
              </Button>
            </Link>
          </Box>
        )}
      </SimpleGrid>
    </Box>
  );
};

export default AllSnippets;
