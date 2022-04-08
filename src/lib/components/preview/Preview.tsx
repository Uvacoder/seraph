/* eslint-disable sonarjs/no-nested-template-literals */
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
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaFileDownload } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import light from "react-syntax-highlighter/dist/esm/styles/prism/material-light";
import dark from "react-syntax-highlighter/dist/esm/styles/prism/nord";

import type { PreviewProps, Document } from "lib/types";

import styles from "./preview.module.css";

const Preview = ({ doc, remove }: PreviewProps) => {
  const { colorMode } = useColorMode();
  const [content, setContent] = useState(doc.content);
  const router = useRouter();

  // Maybe alter this to use the same logic in Upload.tsx?(onDrop)
  const handleSave = (file: Document) => {
    const blob = new Blob([file.content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, file.fileName);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        mt={12}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignContent="center"
          width="100%"
          flexDirection={{ base: "column", sm: "row" }}
        >
          <Input
            w={{ base: "60%", sm: "50%", md: "40%" }}
            mr={4}
            variant="filled"
            placeholder="File name"
            defaultValue={doc.fileName}
            isReadOnly
          />
          {router.pathname.includes("/snippets/[id]") && (
            <Button
              w={{ base: "50%", sm: "40%", md: "20%" }}
              mt={{ base: 3, sm: 0 }}
              borderRadius={7}
              backgroundColor="rgba(255, 255, 255, 0.04)"
              fontWeight="normal"
              leftIcon={<FaFileDownload />}
              onClick={() => handleSave(doc)}
            >
              Download
            </Button>
          )}
        </Box>

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
