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
  const [contents, setContents] = useState<string[] | null>([]);
  const [type, setType] = useState<string>("");

  const toast = useToast();

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log(e.target.value);
    setType(e.target.value);
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
        // console.log(typeof result);
        // console.log(reader.readAsText(file));
        setContents((prevState) => [
          result as string,
          ...(prevState as string[]),
        ]);
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

      {contents && (
        <Box mt={7}>
          <Text fontSize="xs" mb={2}>
            <sup>*</sup>Choose the language for better syntax highlighting
          </Text>
          {contents.map((content, index) => (
            <Box key={Math.floor(Math.random() * 103975803405 + index)}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignContent="center"
                mt={12}
              >
                <Input w="30%" variant="filled" placeholder="File name" />

                <Select
                  variant="filled"
                  placeholder="Choose Language"
                  w="40%"
                  onChange={(e) => handleType(e)}
                >
                  {languagesList.map((language) => (
                    <option value={language.name} key={language.id}>
                      {language.name}
                    </option>
                  ))}
                </Select>
              </Box>
              <Preview content={content} language={type} />
            </Box>
          ))}
          <Box
            display="flex"
            justifyContent="flex-end"
            alignContent="center"
            mt={10}
          >
            {contents.length > 0 && (
              <Menu>
                <MenuButton
                  as={Button}
                  borderRadius={5}
                  w={{ base: "100%", sm: "50%" }}
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
