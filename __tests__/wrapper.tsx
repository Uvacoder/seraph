/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChakraProvider } from "@chakra-ui/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import Layout from "lib/components/layout";
import customTheme from "lib/styles/customTheme";
import "lib/styles/globals.css";

const mockSession: Session = {
  expires: "2020-05-01T00:00:00.000Z",
  user: {
    id: "1",
    email: "obed@gmail.com",
    name: "Obed",
    image: "google.com",
  },
};

// const CustomAppWrapper = ({ Component, pageProps }: AppProps) => {
//   return (
//     <ChakraProvider theme={customTheme}>
//       {/* <SessionProvider session={mockSession}> */}
//       <Head>
//         <meta
//           name="viewport"
//           content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
//         />
//       </Head>
//       <Layout>{/* <Component {...pageProps} /> */}</Layout>
//       {/* </SessionProvider> */}
//     </ChakraProvider>
//   );
// };

const CustomAppWrapper = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default CustomAppWrapper;
