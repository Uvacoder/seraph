/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Box,
  Input,
  Select,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useColorMode,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import Preview from "../preview/Preview";
import {
  languagesList,
  allowedFileExtensions,
  allowedFileNames,
  allowedFileTypes,
} from "lib/helpers";
import type { Document } from "lib/types/Document";

const baseStyleLight = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#edf2f7",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const baseStyleDark = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "rgba(255,255,255,0.04)",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

export default function UploadBox() {
  const [title, setTitle] = useState<string>("");
  const [docs, setDocs] = useState<Document[] | null>([]);
  const [type, setType] = useState<string | undefined>(undefined);

  const toast = useToast();

  const handleRemove = (file: Document): void => {
    const newDocs = docs?.filter((doc) => doc.fileName !== file.fileName);
    setDocs(newDocs as Document[]);
  };

  const { colorMode } = useColorMode();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const { result } = reader;
        console.log(file.name);
        // console.log(reader.readAsText(file));
        setTitle(file.name);
        setDocs((prevState) => [
          {
            fileName: file.name,
            extension: file.name.split(".")[1],
            content: reader.result as string,
          },
          ...(prevState as Document[]),
        ]);
        setType(file.name);
      };
      reader.readAsText(file);
    });
  }, []);

  const validator = (file: File) => {
    // TODO: make this configurable
    const maxFileSize = 1000000;

    if (file.size > maxFileSize) {
      return {
        code: "file-too-big",
        message: `File is too big. Maximum file size is ${maxFileSize.toFixed(
          2
        )} MB.`,
      };
    }
    // We initially try to use the browser provided mime type, and then fall back to file names and finally extensions
    if (
      allowedFileTypes.includes(file.type) ||
      allowedFileNames.includes(file.name) ||
      allowedFileExtensions.includes(file.name?.split(".").pop() || "")
    ) {
      return null;
    }
    return {
      code: "not-plain-text",
      message: `Only plain text files are allowed.`,
    };
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop, validator });

  const style: object = useMemo(
    () => ({
      ...(colorMode === "light" ? baseStyleLight : baseStyleDark),
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject, colorMode]
  );

  return (
    <>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </div>

      {docs?.length !== 0 && (
        <Box mt={7}>
          <Text fontSize="xs" mb={2}>
            <sup>*</sup>Syntax highlighting is not supported for all file types.
          </Text>
          {docs?.map((doc, index) => (
            <Box key={Math.floor(Math.random() * 103975803405 + index)}>
              <Preview doc={doc} remove={handleRemove} />
            </Box>
          ))}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignContent="center"
            mt={10}
          >
            {docs?.length !== 0 && (
              <Menu>
                <MenuButton
                  as={Button}
                  borderRadius={5}
                  w={{ base: "100%", sm: "40%" }}
                >
                  Save
                </MenuButton>
                <MenuList>
                  <MenuItem>Private</MenuItem>
                  <MenuItem>Public</MenuItem>
                </MenuList>
              </Menu>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}
