/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "seraph",
  titleTemplate: "%s | seraph",
  defaultTitle: "seraph",
  description: "Next.js + chakra-ui + TypeScript template",
  canonical: "https://seraph.sznm.dev",
  openGraph: {
    url: "https://seraph.sznm.dev",
    title: "seraph",
    description: "Next.js + chakra-ui + TypeScript template",
    images: [
      {
        url: "https://og-image.sznm.dev/**seraph**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250",
        alt: "seraph.sznm.dev og-image",
      },
    ],
    site_name: "seraph",
  },
  twitter: {
    handle: "@sozonome",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
