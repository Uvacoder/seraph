/* eslint-disable no-param-reassign */
import { getSession } from "next-auth/react";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });
  const snippets = await prisma.snippet.findMany({
    where: {
      author: {
        email: session?.user?.email,
      },
    },
  });
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
