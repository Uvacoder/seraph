/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Box, Heading, Badge, Button } from "@chakra-ui/react";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

import Preview from "lib/components/preview/Preview";
import ShareButton from "lib/components/samples/ShareMenu";
import { prisma } from "lib/prisma/prisma";
import type { Document, SnippetProps } from "lib/types";

export default function Index({ snippet }: { snippet: SnippetProps }) {
  // make this function optional in the future
  const handleRemove = (file: Document): void => {
    // const newDocs = snippet.files?.filter(
    //   (doc) => doc.fileName !== file.fileName
    // );
    console.log(file);
  };

  return (
    <Box minHeight="80vh" gap={8} mx="auto" maxW={850}>
      <Box my={10} py={4} display="flex" flexDirection="column">
        <Link href="/dashboard" passHref>
          <Box borderRadius="full" width="20%" mb={7}>
            <Button>
              <BsArrowLeft />
            </Button>
          </Box>
        </Link>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Heading as="h1" size="md" w="100%" mt={4}>
            {snippet.title}
          </Heading>
          {snippet.visibility === "PUBLIC" && <ShareButton />}
        </Box>
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
              {new Date(snippet.createdAt).toDateString()}
            </Badge>
          </Box>
          <Box>
            <Badge colorScheme="green" mt={6} py={1} px={2} borderRadius={5}>
              {snippet.files.length}{" "}
              {snippet.files.length === 1 ? "File" : "Files"}
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

// Using SSR when getting a single snippet is way faster than using SSG
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // simplernerd.com/next-js-error-serializing-date-returned-from-getserversideprops/
  // getServerSideProps will scream at you because it can't serialize the date object from prisma as JSON
  const snippet = await prisma.snippet.findUnique({
    where: {
      id: params?.id as string,
    },
    include: {
      files: true,
      author: {
        select: {
          email: true,
        },
      },
    },
  });
  return {
    props: {
      snippet: JSON.parse(JSON.stringify(snippet)),
    },
  };
};

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // simplernerd.com/next-js-error-serializing-date-returned-from-getserversideprops/
//   // getServerSideProps will scream at you because it can't serialize the date object from prisma as JSON
//   const snippet = await prisma.snippet.findUnique({
//     where: {
//       id: params?.id as string,
//     },
//     include: {
//       files: true,
//       author: {
//         select: {
//           email: true,
//         },
//       },
//     },
//   });
//   return {
//     props: {
//       snippet: JSON.parse(JSON.stringify(snippet)),
//     },
//     revalidate: 3,
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await prisma.snippet.findMany();
//   // const snippets = await res.json();
//   const paths = res.map((snippet) => ({
//     params: {
//       id: snippet.id,
//     },
//   }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
