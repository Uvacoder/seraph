import { Box, Heading, Input } from "@chakra-ui/react";
// import { useRouter } from "next/router";
import { useState } from "react";

import UploadBox from "../../components/upload-box/Upload";

const CreateSnippet = () => {
  // const toast = useToast();
  // const router = useRouter();
  const [snippetName, setSnippetName] = useState<string>("");

  return (
    <Box minHeight="70vh" gap={8} my={8}>
      <Box
        display={{ base: "flex" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={{ base: "normal", md: "space-between" }}
        w="full"
      >
        <Heading as="h1" size="md" w="100%" mt={4}>
          Create Snippet
        </Heading>

        <Input
          w="100%"
          variant="filled"
          placeholder="Name the snippet"
          value={snippetName}
          onChange={(e) => setSnippetName(e.target.value)}
          mt={2}
        />
      </Box>

      <Box w="full" mt={8}>
        <UploadBox snippetName={snippetName} />
      </Box>
    </Box>
  );
};

export default CreateSnippet;
