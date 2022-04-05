/* eslint-disable no-param-reassign */
import { getSession } from "next-auth/react";

import AllSnippets from "lib/pages/all-snippets";
import { prisma } from "lib/prisma/prisma";
import type { SnippetProps } from "lib/types";

export default function Index({ snippets }: { snippets: SnippetProps[] }) {
  return <AllSnippets snippets={snippets} />;
}

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function getServerSideProps({ req }: { req: any }) {
//   const session = await getSession({ req });
//   const snippets = await prisma.snippet.findMany({
//     where: {
//       author: {
//         email: session?.user?.email,
//       },
//     },
//     orderBy: [
//       {
//         createdAt: "desc",
//       },
//     ],
//   });
//   //   snippets.forEach((snippet) => {
//   //     snippet.createdAt =
//   //       snippet.createdAt.toLocaleDateString() as unknown as Date;
//   //     snippet.updatedAt =
//   //       snippet.updatedAt.toLocaleDateString() as unknown as Date;
//   //     return snippet;
//   //   });

//   // simplernerd.com/next-js-error-serializing-date-returned-from-getserversideprops/
//   // getServerSideProps will scream at you because it can't serialize the date object from prisma
//   // You can also do the above
//   snippets.forEach((snippet) => {
//     snippet.createdAt = JSON.parse(JSON.stringify(snippet.createdAt));
//     snippet.updatedAt = JSON.parse(JSON.stringify(snippet.updatedAt));
//     return snippet;
//   });
//   return {
//     props: {
//       snippets,
//     },
//   };
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticProps({ req }: { req: any }) {
  const session = await getSession({ req });
  const snippets = await prisma.snippet.findMany({
    where: {
      author: {
        email: session?.user?.email,
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
    revalidate: 3,
  };
}
