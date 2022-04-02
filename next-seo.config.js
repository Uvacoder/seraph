/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "seraph",
  titleTemplate: "%s | Code snippets sharing platform",
  defaultTitle: "seraph",
  description: "Code snippets sharing platform",
  canonical: "https://seraph.vercel.app",
  openGraph: {
    url: "https://seraph.vercel.app",
    title: "seraph",
    description: "Seraph - A code snippets sharing platform",
    images: [
      {
        url: "https://og-image.sznm.dev/**Seraph**🔥.png?theme=dark&md=1&fontSize=100px&",
        alt: "seraph.vercel.app og-image",
      },
    ],
    site_name: "seraph",
  },
  twitter: {
    handle: "@hunchodotdev",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
