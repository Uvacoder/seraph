/* eslint-disable no-param-reassign */
import AllSnippets from "lib/pages/all-snippets";
import { prisma } from "lib/prisma/prisma";

export type SnippetProps = {
  authorId: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
  visibility: string;
};

export default function Index({ snippets }: { snippets: SnippetProps[] }) {
  return <AllSnippets snippets={snippets} />;
}

export async function getServerSideProps() {
  const snippets = await prisma.snippet.findMany();
  snippets.forEach((snippet) => {
    snippet.createdAt =
      snippet.createdAt.toLocaleDateString() as unknown as Date;
    snippet.updatedAt =
      snippet.updatedAt.toLocaleDateString() as unknown as Date;
    return snippet;
  });
  return {
    props: {
      snippets,
    },
  };
}
