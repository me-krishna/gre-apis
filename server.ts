import { Application, Router } from "express";
import cors from 'cors';
import express from 'express';
import adminRouter from "./routes/admin";
import greTest from "./routes/exam";
import { join } from 'path';
const router = Router();

const Server: Application = express();

Server.use(express.json());
Server.use(express.urlencoded({ extended: true }));

Server.use("/mock-test", express.static(join(__dirname, 'public/uploads')));

Server.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE,PATCH' }));

Server.use("/api/v1/admin", adminRouter);
Server.use("/api/v1/gretest", greTest);

export default Server;