/* eslint-disable react/jsx-no-bind */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Box, useColorMode, Select } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";

import SaveButton from "../samples/SaveButton";

import styles from "./editor.module.css";

export default function EditorBox({
  snippetName,
  setSnippetName,
}: {
  snippetName: string;
  setSnippetName: (snippetName: string) => void;
}) {
  const { colorMode } = useColorMode();
  const [editorValue, setEditorValue] = useState("// Type your code here");
  const [contents, setContents] = useState<string[]>(["yoo"]);
  function handleEditorChange(value, event) {
    setEditorValue(value);
  }
  return (
    <Box borderRadius={8}>
      <Box>
        <Select
          variant="filled"
          mr="auto"
          mb={4}
          width={{ base: "100%", sm: "40%", md: "30%" }}
        >
          <option>Galavanting</option>
          <option>Mannequin</option>
          <option>Yondalazy</option>
        </Select>
      </Box>
      <Box mt={5}>
        <Editor
          height="90vh"
          language="javascript"
          value={editorValue}
          onChange={handleEditorChange}
          theme={colorMode === "light" ? "light" : "vs-dark"}
          options={{
            automaticLayout: true,
            acceptSuggestionOnCommitCharacter: true,
            minimap: { enabled: true },
            fontSize: 17,
            cursorSmoothCaretAnimation: true,
            lightbulb: { enabled: true },
          }}
          className={styles.editor}
        />
      </Box>
      {/* <SaveButton /> */}
    </Box>
  );
}
