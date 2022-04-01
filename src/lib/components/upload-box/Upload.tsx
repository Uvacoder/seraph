/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuDivider,
  MenuItem,
  useColorMode,
  useToast,
  useDisclosure,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";
import { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { HiDotsVertical } from "react-icons/hi";

import Preview from "../preview/Preview";
import {
  allowedFileExtensions,
  allowedFileNames,
  allowedFileTypes,
} from "lib/helpers";
import type { Document } from "lib/types/Document";

type SubmitProps = {
  files: Document[];
  visibility: string;
  title: string;
};

type UploadProps = {
  snippetName: string;
};

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

export default function UploadBox({ snippetName }: UploadProps) {
  const [radioValue, setRadioValue] = useState("PUBLIC");
  const [docs, setDocs] = useState<Document[] | null>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmitProps>();

  const onSubmit: SubmitHandler<SubmitProps> = ({ files, title, visibility }) =>
    console.log({
      files: docs,
      title: snippetName,
      visibility: radioValue,
    });

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
        setDocs((prevState) => [
          {
            fileName: file.name,
            extension: file.name.split(".").pop() as string,
            content: reader.result as string,
          },
          ...(prevState as Document[]),
        ]);
      };
      reader.readAsText(file);
    });
  }, []);

  const validator = (file: File) => {
    // TODO: make this configurable
    const maxFileSize = 2000000;

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
    // return toast({
    //   title: "File type not allowed",
    //   description: `Only plain text files are allowed.`,
    //   status: "error",
    //   duration: 3500,
    //   isClosable: true,
    // })
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mt={7}>
            <Text fontSize="xs" mb={2}>
              <sup>*</sup>Syntax highlighting is not supported for some file
              types.
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
                <>
                  <Button
                    p={2}
                    borderRadius={5}
                    w={{ base: "100%", sm: "40%" }}
                    type="submit"
                    bg={colorMode === "light" ? "blue.500" : "blue.600"}
                    color="white"
                    _hover={{
                      bg: colorMode === "light" ? "blue.600" : "blue.700",
                    }}
                    _active={{
                      bg: colorMode === "light" ? "blue.700" : "blue.800",
                    }}
                    aria-label="Save snippet"
                  >
                    Save
                  </Button>
                  {/* <Button
                    
                  >
                    
                  </Button> */}
                  <Menu>
                    <MenuButton
                      as={Button}
                      borderRadius={5}
                      ml={2}
                      bg={colorMode === "light" ? "blue.500" : "blue.600"}
                      color="white"
                      _hover={{
                        bg: colorMode === "light" ? "blue.600" : "blue.700",
                      }}
                      _active={{
                        bg: colorMode === "light" ? "blue.700" : "blue.800",
                      }}
                      aria-label="Save snippet"
                    >
                      <HiDotsVertical />
                    </MenuButton>
                    <MenuList>
                      <RadioGroup
                        defaultValue="PUBLIC"
                        onChange={setRadioValue}
                        value={radioValue}
                      >
                        <MenuItem>
                          <Radio value="PUBLIC">PUBLIC</Radio>
                        </MenuItem>
                        <MenuItem>
                          <Radio value="PRIVATE">PRIVATE</Radio>
                        </MenuItem>
                      </RadioGroup>
                    </MenuList>
                  </Menu>
                </>
              )}
            </Box>
          </Box>
        </form>
      )}
    </>
  );
}
