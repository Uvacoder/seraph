/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "seraph",
  titleTemplate: "%s | Code snippets sharing platform",
  defaultTitle: "seraph",
  description: "Code snippets sharing platform",
  canonical: "https://seraph-app.vercel.app",
  openGraph: {
    url: "https://seraph-app.vercel.app",
    title: "seraph",
    description: "Seraph - A code snippets sharing platform",
    images: [
      {
        url: "/images/og-image.png",
        alt: "seraph-app.vercel.app og-image",
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
