module.exports = {
  extends: ["react-app", "turbo", "prettier"],
  settings: {
    react: {
      version: "detect",
      rootDir: ["app/*/", "packages/*/"]
    },
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};
