/* eslint-disable no-param-reassign */
import AllSnippets from "lib/pages/all-snippets";
import { prisma } from "lib/prisma/prisma";
import type { Document } from "lib/types/Document";

export type SnippetProps = {
  authorId: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  visibility: string;
  files: Document[];
};

export default function Index({ snippets }: { snippets: SnippetProps[] }) {
  return <AllSnippets snippets={snippets} />;
}

export async function getServerSideProps() {
  const snippets = await prisma.snippet.findMany();
  //   snippets.forEach((snippet) => {
  //     snippet.createdAt =
  //       snippet.createdAt.toLocaleDateString() as unknown as Date;
  //     snippet.updatedAt =
  //       snippet.updatedAt.toLocaleDateString() as unknown as Date;
  //     return snippet;
  //   });

  // simplernerd.com/next-js-error-serializing-date-returned-from-getserversideprops/
  // getServerSideProps will scream at you because it can't serialize the date object from prisma
  // You can also do the above
  snippets.forEach((snippet) => {
    snippet.createdAt = JSON.parse(JSON.stringify(snippet.createdAt));
    snippet.updatedAt = JSON.parse(JSON.stringify(snippet.updatedAt));
    return snippet;
  });
  return {
    props: {
      snippets,
    },
  };
}
