# ReviewsHub

This application is an implementation of the recommendations application. It is a hub for various reviews, where you can add, rate, comment on them.

Link to [DEMO](https://reviewshub.pro)

- [Task Specification](docs/taskSpecification.md)
- [Script instruction](docs/scriptInstruction.md)

## What's inside?

This Turborepo includes the following packages and apps:

----
### Apps and Packages

- `server`: an [Express](https://expressjs.com/) server

- `client`: a [Vite](https://vitejs.dev/) single page app

- `common-files`: validation and types files, which used on client and server side simultaneously
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json;s used throughout the monorepo

----

### Project architecture

The project was written in accordance with the Feature sliced design methodology

Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

### Working with data

Interaction with data is carried out using the  state manager [zustand](https://github.com/pmndrs/zustand). The use of distributed storage reduces the coupling of modules

Connection between the client and server is build on [trpc](https://trpc.io/), providing a typesafe client-server interaction.
Form validation is done via [zod](https://zod.dev/), allowing a common schems to be used on the client and server.

MySQL is used as a database, interaction is carried out through ORM [Prisma](https://www.prisma.io/).

As external image storage server aws S3

The work of the assembled application is carried out in docker containers, orchestration is carried out through docker-compose.

----
