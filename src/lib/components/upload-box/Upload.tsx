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
} from "@chakra-ui/react";
import { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsArrowDownShort } from "react-icons/bs";

import Preview from "../preview/Preview";
import { languagesList } from "lib/helpers";

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
  const [content, setContent] = useState<string | ArrayBuffer | null>("");
  const { colorMode } = useColorMode();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const { result } = reader;
        // console.log(result);
        setContent(result);
        // console.log(reader.readAsText(file));
      };
      reader.readAsText(file);
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

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

      {content && (
        <Box mt={7}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent="center"
          >
            <Input w="30%" variant="filled" placeholder="File name" />

            <Select variant="filled" placeholder="Choose Language" w="50%">
              {/* <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option> */}
              {languagesList.map((language) => (
                <option value={language.name} key={language.id}>
                  {language.name}
                </option>
              ))}
            </Select>
          </Box>
          <Preview content={content} />
          <Box
            display="flex"
            justifyContent="flex-end"
            alignContent="center"
            mt={4}
          >
            <Menu>
              <MenuButton
                as={Button}
                borderRadius={5}
                rightIcon={<BsArrowDownShort />}
              >
                Save
              </MenuButton>
              <MenuList>
                <MenuItem>Private</MenuItem>
                <MenuItem>Public</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      )}
    </>
  );
}
