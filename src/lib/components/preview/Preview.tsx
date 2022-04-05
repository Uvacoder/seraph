/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import {
  Box,
  Button,
  Input,
  useColorMode,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import light from "react-syntax-highlighter/dist/esm/styles/prism/material-light";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/nord";

import type { Document } from "lib/types";

import styles from "./preview.module.css";

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

// const DownloadButton = ({ rawLink }: { rawLink?: string }) => {
//   return (
//     <a href={`${rawLink}?download=true`}>
//       <Button size="xs" aria-label="Download">
//         Download
//       </Button>
//     </a>
//   );
// };

const Preview = ({ doc, remove }: PreviewProps) => {
  const { colorMode } = useColorMode();
  const [content, setContent] = useState(doc.content);
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
      {router.pathname.includes("/create-snippet") ? (
        <Box mt={3} transition="0.5s ease-out" backgroundColor="inherit">
          <Tabs px={0} defaultIndex={1}>
            <TabList>
              <Tab
                _focus={{
                  boxShadow: "none",
                }}
              >
                Raw
              </Tab>
              <Tab
                _focus={{
                  boxShadow: "none",
                }}
              >
                Preview
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <textarea
                  className={styles.textarea}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                    // eslint-disable-next-line no-param-reassign
                    doc.content = e.target.value;
                  }}
                />
              </TabPanel>
              <TabPanel>
                <SyntaxHighlighter
                  showLineNumbers
                  language={doc.extension}
                  style={colorMode === "light" ? light : dark}
                >
                  {content}
                </SyntaxHighlighter>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      ) : (
        <Box mt={3} transition="0.5s ease-out" backgroundColor="inherit">
          <SyntaxHighlighter
            showLineNumbers
            language={doc.extension}
            style={colorMode === "light" ? light : dark}
          >
            {doc.content}
          </SyntaxHighlighter>
        </Box>
      )}
    </Box>
  );
};

export default memo(Preview);
