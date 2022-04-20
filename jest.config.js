// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
  rootDir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/test-utils.tsx",
    "<rootDir>/cypress",
    // I ignored react-syntax-highlighter because it uses ESM modules which
    // Jest doesn't support out of the box
    "/node_modules/(?!(react-syntax-highlighter)/)",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/__tests__/test-utils.tsx",
    "<rootDir>/cypress",
  ],
  moduleNameMapper: {
    // Handle module aliases
    "^lib/(.*)$": "<rootDir>/src/lib/$1",

    // "^pages/(.*)$": "<rootDir>/pages/$1",
  },
  transform: {}
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
