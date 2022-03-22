import { Box, Heading, Input } from "@chakra-ui/react";
// import Cookies from "js-cookie";
import Link from "next/link";
// import { useRouter } from "next/router";
// import { useCallback, useState } from "react";

import UploadBox from "../../components/upload-box/Upload";
// import { Prism } from "@mantine/prism";

export type Document = {
  title: string;
  content: string;
  id?: string;
};

const CreateSnippet = () => {
  // const toast = useToast();
  // const router = useRouter();

  return (
    <Box minHeight="70vh" gap={8} my={8}>
      <Box
        display={{ base: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ base: "normal", md: "space-between" }}
        w="full"
      >
        <Heading as="h1" size="md" w="100%" mt={4}>
          <Link href="/">Create Snippet</Link>
        </Heading>

        <Input
          w="100%"
          variant="filled"
          placeholder="Name the snippet"
          mt={4}
        />
      </Box>

      <Box w="full" mt={8}>
        <UploadBox />
      </Box>

      <Box w="full" mt={12}>
        {/* <Prism>

        </Prism> */}
      </Box>
    </Box>
  );
};

export default CreateSnippet;
