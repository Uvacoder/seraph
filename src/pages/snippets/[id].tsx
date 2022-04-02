/* eslint-disable no-console */
import { Box, Heading, Badge, Button } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import Preview from "lib/components/preview/Preview";
import { prisma } from "lib/prisma/prisma";
import type { Document } from "lib/types/Document";

import type { SnippetProps } from ".";

export default function Index({ snippet }: { snippet: SnippetProps }) {
  // make this function optional in the future
  const handleRemove = (file: Document): void => {
    // const newDocs = snippet.files?.filter(
    //   (doc) => doc.fileName !== file.fileName
    // );
    console.log(file);
  };

  return (
    <Box minHeight="80vh" gap={8}>
      <Box my={10} py={4} display="flex" flexDirection="column">
        <Link href="/snippets" passHref>
          <Box borderRadius="full" width="20%" mb={7}>
            <Button>
              <BsArrowLeft />
            </Button>
          </Box>
        </Link>
        <Heading as="h1" size="md" w="100%" mt={4}>
          {snippet.title}
        </Heading>
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "space-between" }}
          flexWrap="wrap"
        >
          <Box>
            <Badge colorScheme="green" mt={6} py={1} px={2} borderRadius={5}>
              {snippet.visibility}
            </Badge>
          </Box>
          <Box>
            <Badge colorScheme="green" mt={6} py={1} px={2} borderRadius={5}>
              {new Date(snippet.createdAt).toLocaleDateString()}
            </Badge>
          </Box>
          <Box>
            <Badge colorScheme="green" mt={6} py={1} px={2} borderRadius={5}>
              {snippet.files.length} Files
            </Badge>
          </Box>
        </Box>
        {snippet.files.map((file, index) => (
          <Box key={Math.floor(Math.random() * 103975803405 + index)}>
            <Preview doc={file} remove={handleRemove} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // simplernerd.com/next-js-error-serializing-date-returned-from-getserversideprops/
  // getServerSideProps will scream at you because it can't serialize the date object from prisma as JSON
  const snippet = await prisma.snippet.findUnique({
    where: {
      id: params?.id as string,
    },
    include: {
      files: true,
    },
  });
  return {
    props: {
      snippet: JSON.parse(JSON.stringify(snippet)),
    },
  };
};
