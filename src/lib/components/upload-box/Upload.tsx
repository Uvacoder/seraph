/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useColorMode,
  useToast,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import type React from "react";
import { useMemo, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsArrowLeft } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";

import Preview from "../preview/Preview";
import SaveButton from "../samples/SaveButton";
import {
  allowedFileExtensions,
  allowedFileNames,
  allowedFileTypes,
} from "lib/helpers";
import type { Document } from "lib/types";

const baseStyleLight = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "rgba(255,255,255,0.04)",
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

export default function UploadBox({
  snippetName,
  setSnippetName,
}: {
  snippetName: string;
  setSnippetName: (snippetName: string) => void;
}) {
  const [radioValue, setRadioValue] = useState("PUBLIC");
  const [docs, setDocs] = useState<Document[] | null>([]);
  const [submitting, setSubmitting] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!snippetName) {
        toast({
          title: "Error",
          description: "You must name the snippet",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-end",
        });
        setSubmitting(false);
      } else {
        setSubmitting(true);
        await fetch("/api/snippets/create", {
          method: "POST",
          body: JSON.stringify({
            files: docs,
            title: snippetName,
            visibility: radioValue,
          }),
        })
          .then((res) => {
            if (res.status === 200) {
              toast({
                title: "Success",
                description: "Snippet created",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-end",
              });
              setSubmitting(false);
              setDocs([]);
              // eslint-disable-next-line no-param-reassign
              setSnippetName("");
            } else {
              toast({
                title: "Error",
                description: "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-end",
              });
              setSubmitting(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setSubmitting(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
    <Box>
      <div className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </div>

      {docs?.length !== 0 && (
        <form onSubmit={(e) => handleSubmit(e)}>
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
            <SaveButton
              radioValue={radioValue}
              setRadioValue={setRadioValue}
              submitting={submitting}
            />
          </Box>
        </form>
      )}
    </Box>
  );
}
