import { Application, Router } from "express";
import cors from 'cors';
import express from 'express';
import adminRouter from "./routes/admin";
import greTest from "./routes/exam";
const router = Router();

const Server: Application = express();

Server.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE,PATCH' }));

Server.use("/api/v1/admin", adminRouter);
Server.use("/api/v1/gretest", greTest);

export default Server;