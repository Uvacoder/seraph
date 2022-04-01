import {
  Box,
  Heading,
  Badge,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";
// import { useRouter } from "next/router";
// import { useCallback, useState } from "react";

const AllSnippets = () => {
  // const toast = useToast();
  // const router = useRouter();

  return (
    <Box minHeight="70vh" gap={8} my={8}>
      <Box
        display={{ base: "flex" }}
        flexDirection={{ base: "row" }}
        justifyContent={{ base: "space-between" }}
        alignItems="center"
        alignContent="center"
        w="full"
      >
        <Box>
          <Heading as="h1" size="md" w="100%" mt={4}>
            Your snippets
          </Heading>
        </Box>

        <Box>
          <Badge colorScheme="green" mt={6} p={1} borderRadius={5}>
            4 in total
          </Badge>
        </Box>
      </Box>

      <Box
        w="full"
        mt={8}
        display={{ base: "flex" }}
        flexDirection={{ base: "column" }}
      >
        <Box
          display={{ base: "flex" }}
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          w="full"
          borderRadius={10}
          p={4}
          mt={4}
          bg={useColorModeValue("gray.100", "gray.900")}
          transition="all 0.2s"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box width="70%" cursor="pointer">
            <Heading size="sm">Insomnia 🚀❤️✅</Heading>
          </Box>

          <Box
            zIndex={10}
            alignSelf="end"
            alignItems="flex-end"
            cursor="pointer"
          >
            <Button
              borderRadius={5}
              bg={useColorModeValue("gray.300", "gray.800")}
            >
              <AiOutlineDelete />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AllSnippets;
