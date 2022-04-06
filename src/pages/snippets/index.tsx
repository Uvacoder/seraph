/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import type { GetServerSideProps } from "next";
import type { GetSessionParams } from "next-auth/react";
import { getSession } from "next-auth/react";

import AllSnippets from "lib/pages/all-snippets";
import { prisma } from "lib/prisma/prisma";
import type { SnippetProps } from "lib/types";

export default function Index({ snippets }: { snippets: SnippetProps[] }) {
  return <AllSnippets snippets={snippets} />;
}

// Using getStaticProps here wouldn't be a good idea because:
// This page can't be statically rendered because it depends on a user who is authenticated.
// Pages like this that get their data dynamically based on an
// authenticated user are a great use case for server-side rendering (SSR) via getServerSideProps.
export const getServerSideProps: GetServerSideProps = async (
  context: GetSessionParams
) => {
  const session = await getSession(context);
  const snippets = await prisma.snippet.findMany({
    where: {
      author: {
        email: session?.user?.email,
        id: session?.user?.id,
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
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
};
