import { Box, Heading, Text, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import { useState } from "react";

import UploadBox from "../../components/upload-box/Upload";

const CreateSnippet = () => {
  // const toast = useToast();
  // const router = useRouter();
  const [snippetName, setSnippetName] = useState<string>("");

  // https://next-auth.js.org/getting-started/client#require-session
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/");
    },
  });

  if (status === "loading") {
    return (
      <Box display="grid" placeContent="center" height="80vh">
        <Text>Loading...</Text>
      </Box>
    );
  }

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
        <UploadBox snippetName={snippetName} setSnippetName={setSnippetName} />
      </Box>
    </Box>
  );
};

export default CreateSnippet;
