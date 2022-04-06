// These are global types that are used across the entire application
export type Merge<P, T> = Omit<P, keyof T> & T;

export type Document = {
  fileName: string;
  extension: string;
  content: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

export type SnippetProps = {
  author: User;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  visibility: string;
  files: Document[];
};

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
