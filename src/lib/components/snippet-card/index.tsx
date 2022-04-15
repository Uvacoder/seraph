import { Box, Badge, Text, useColorMode, Button } from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";

import type { SnippetProps } from "lib/types";

export default function SnippetCard({
  snippet,
  remove,
}: {
  snippet: SnippetProps;
  remove: () => void;
}) {
  const { colorMode } = useColorMode();
  return (
    <Box my={10} w={{ base: "full", sm: "auto" }}>
      <Box
        bg={colorMode === "light" ? "white" : "gray.900"}
        borderWidth={colorMode === "light" ? "2px" : "1px"}
        borderColor={colorMode === "light" ? "gray.100" : "gray.700"}
        rounded="lg"
        shadow="sm"
      >
        <Box p="7" w={{ base: "auto", sm: "sm" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
          >
            {/* <Badge rounded="full" px="2" colorScheme="telegram">
              {snippet.files?.length}{" "}
              {snippet.files?.length === 1 ? "file" : "files"}
            </Badge> */}
            <Badge rounded="full" px="2" colorScheme="telegram">
              {snippet.visibility}
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              <Button
                borderRadius={5}
                bg={colorMode === "light" ? "gray.200" : "gray.700"}
                p={0}
                onClick={remove}
              >
                <AiOutlineDelete />
              </Button>
            </Box>
          </Box>

          <Link href={`/dashboard/s/${snippet.id}`} passHref>
            <Text
              mt="1"
              fontWeight="semibold"
              textTransform="uppercase"
              as="p"
              lineHeight="tight"
              minH="12"
              cursor="pointer"
              color={colorMode === "light" ? "gray.800" : "white"}
            >
              {snippet.title}
            </Text>
          </Link>

          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Box d="flex" mt="2" alignItems="center">
              <Text
                textTransform="uppercase"
                color="gray.600"
                fontSize="sm"
                fontWeight="semibold"
              >
                Created on:
              </Text>
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {new Date(snippet.createdAt).toDateString()}
              </Box>
            </Box>
            <Box d="flex" mt="2" alignItems="center">
              <Text
                textTransform="uppercase"
                color="gray.600"
                fontSize="sm"
                fontWeight="semibold"
              >
                Updated on:
              </Text>
              <Box as="span" ml="2" color="gray.600" fontSize="sm">
                {new Date(snippet.updatedAt).toDateString()}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
