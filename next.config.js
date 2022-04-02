/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  pwa: {
    disable:
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "preview",
    // delete two lines above to enable PWA in production deployment
    // add your own icons to public/manifest.json
    // to re-generate manifest.json, you can visit https://tomitm.github.io/appmanifest/
    dest: "public",
    register: true,
  },
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
});


// This is done so I can transpile modules from "react-syntax-highlighter"
// https://stackoverflow.com/questions/65936222/next-js-syntaxerror-unexpected-token-export

const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]); // pass the modules you would like to see transpiled

module.exports = withTM({});