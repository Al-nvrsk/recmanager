import { json, urlencoded } from "body-parser";
import { createExpressMiddleware} from "@trpc/server/adapters/express"
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter, createContext } from "./api";
import cookieSession from "cookie-session";
import passport from "passport";
import './OAuth';
import { routerOAuth } from "./OAuth";

export const createServer = (): ReturnType<typeof express> => {
  const app = express();
  
  app
  .use(cors({ origin: process.env.HOST_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true, 
  }))
  .use(
    cookieSession({ name: 'session', keys: ["session"], maxAge: 24 * 60 * 60 * 100 })
  ) 
  
  .use(passport.initialize())
  .use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext
    })
  )
  .use(passport.session())
  
    .disable("x-powered-by")
    
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
   
   
    .get("/apitest",(req, res) => {
      return res.json('👋 Howdy from the server');
    })
    .use("/api/auth", routerOAuth)
    

  return app;
};
