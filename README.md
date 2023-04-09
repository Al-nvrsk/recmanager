# Recmanager

This application is an implementation of the recommendations application. It is a hub for various reviews, where you can add, rate, comment on them.

- [Task Specification](docs/taskSpecification.md)
- [Script instruction](docs/scriptInstruction.md)

## What's inside?

This Turborepo includes the following packages and apps:

### Apps and Packages

- `server`: an [Express](https://expressjs.com/) server

- `client`: a [Vite](https://vitejs.dev/) single page app

- `logger`: isomorphic logger (a small wrapper around console.log)
- `ui`: a dummy React UI library
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json;s used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).
