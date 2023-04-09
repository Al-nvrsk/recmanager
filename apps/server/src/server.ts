import { json, urlencoded } from "body-parser";
import { createExpressMiddleware} from "@trpc/server/adapters/express"
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter, createContext } from "./api";

export const createServer = (): ReturnType<typeof express> => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors({ origin: process.env.HOST_URL }))
    .use(
      "/trpc",
      createExpressMiddleware({
        router: appRouter,
        createContext
      })
    )
    .get("/api", (req, res) => {
      return res.json('👋 Howdy from the server');
    })

  return app;
};
