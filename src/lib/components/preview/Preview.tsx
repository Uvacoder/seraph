/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { Box, Button, useColorMode } from "@chakra-ui/react";
import {
  ChangeEvent,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import light from "react-syntax-highlighter/dist/esm/styles/prism/material-light";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/nord";

type PreviewProps = {
  editable?: boolean;
  remove?: () => void;
  title?: string;
  content?: string | null;
  setTitle?: (title: string) => void;
  setContent?: (content: string) => void;
  initialTab?: "edit" | "preview";
  skeleton?: boolean;
  id?: string;
  language: string;
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

const Preview = ({
  remove,
  editable,
  title,
  content,
  setTitle,
  setContent,
  initialTab = "edit",
  skeleton,
  id,
  language,
}: PreviewProps) => {
  const { colorMode } = useColorMode();

  return (
    // <Box mt={7} transition="0.5s ease-out" backgroundColor="inherit">
    //   <Prism language="tsx" colorScheme="dark">{content}</Prism>
    // </Box>
    <Box mt={3} transition="0.5s ease-out" backgroundColor="inherit">
      <SyntaxHighlighter
        showLineNumbers
        customStyle={{}}
        language={language}
        style={colorMode === "light" ? light : dark}
      >
        {content}
      </SyntaxHighlighter>
    </Box>
  );
};

export default memo(Preview);
