/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { Box, Button, Input, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import light from "react-syntax-highlighter/dist/esm/styles/prism/material-light";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/nord";

import type { Document } from "lib/types/Document";

export type PreviewProps = {
  // editable?: boolean;
  remove: (file: Document) => void;
  // title?: string;
  // content?: string | null;
  // setTitle?: (title: string) => void;
  // setContent?: (content: string) => void;
  // initialTab?: "edit" | "preview";
  // skeleton?: boolean;
  // id?: string;
  // language: string | undefined;
  doc: Document;
};

const DownloadButton = ({ rawLink }: { rawLink?: string }) => {
  return (
    <a href={`${rawLink}?download=true`}>
      <Button size="xs" aria-label="Download">
        Download
      </Button>
    </a>
  );
};

const Preview = ({ doc, remove }: PreviewProps) => {
  const { colorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        mt={12}
      >
        <Input
          w={{ base: "80%", sm: "60%", md: "40%" }}
          variant="filled"
          placeholder="File name"
          defaultValue={doc.fileName}
          isReadOnly
        />

        {router.pathname.includes("/create-snippet") && (
          <Box onClick={() => remove(doc)}>
            <Button borderRadius={5} ml={2}>
              <AiOutlineDelete />
            </Button>
          </Box>
        )}
      </Box>
      <Box mt={3} transition="0.5s ease-out" backgroundColor="inherit">
        <SyntaxHighlighter
          showLineNumbers
          customStyle={{}}
          language={doc.extension}
          style={colorMode === "light" ? light : dark}
        >
          {doc.content}
        </SyntaxHighlighter>
      </Box>
    </Box>
  );
};

export default memo(Preview);
