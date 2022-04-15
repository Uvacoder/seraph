/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Switch,
  useColorMode,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useRouter } from "next/router";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";

import EditorBox from "../../components/editor/Editor";
import UploadBox from "../../components/upload-box/Upload";

const CreateSnippet = () => {
  // const toast = useToast();
  // const router = useRouter();
  const [snippetName, setSnippetName] = useState<string>("");
  const [checked, setChecked] = useState(false);
  const { colorMode } = useColorMode();

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
    <Box minHeight="70vh" gap={8} my={8} maxW={850} mx="auto">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box mt={2}>
          <Link href="/dashboard" passHref>
            <Box borderRadius="full" width="20%" mb={7}>
              <Button>
                <BsArrowLeft />
              </Button>
            </Box>
          </Link>
        </Box>
        {/* <Box display="flex" alignItems="center" mb={4}>
          <Text mr={2}>{checked ? "Upload" : "Editor"}</Text>
          <Switch
            isChecked={checked}
            onChange={() => setChecked(!checked)}
            _active={{
              boxShadow: 0,
              border: 0,
              borderColor: "none",
            }}
            _hover={{
              boxShadow: 0,
              border: 0,
              borderColor: "none",
            }}
            _focus={{
              boxShadow: 0,
              border: 0,
              borderColor: "none",
            }}
          />
        </Box> */}
      </Box>

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
          w={{ base: "100%", sm: "60%" }}
          variant="filled"
          placeholder="Name the snippet"
          value={snippetName}
          onChange={(e) => setSnippetName(e.target.value)}
          mt={2}
          bg={colorMode === "light" ? "#edf2f7" : "rgba(255, 255, 255, 0.04)"}
        />
      </Box>
      <Box w="full" mt={8}>
        <UploadBox snippetName={snippetName} setSnippetName={setSnippetName} />
      </Box>

      {/* {checked ? (
        <Box w="full" mt={8}>
          <EditorBox
            snippetName={snippetName}
            setSnippetName={setSnippetName}
          />
        </Box>
      ) : (
        <Box w="full" mt={8}>
          <UploadBox
            snippetName={snippetName}
            setSnippetName={setSnippetName}
          />
        </Box>
      )} */}
    </Box>
  );
};

export default CreateSnippet;
