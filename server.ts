import { Application } from "express";
import cors from 'cors';
import express from 'express';
import adminRouter from "./routes/admin";
import { join } from 'path';
import AuthRouter from "./routes/auth";
import students from "./routes/students";

const Server: Application = express();

Server.use(express.json());
Server.use(express.urlencoded({ extended: true }));

Server.use(cors({ origin: '*', methods: 'GET,POST,PUT,DELETE,PATCH' }));

Server.use("/mock-test", express.static(join(__dirname, 'public/uploads')));

Server.use("/api/v1/admin", adminRouter);
Server.use("/api/v1/student", students);
Server.use("/api/v1/auth", AuthRouter);

export default Server;