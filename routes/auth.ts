import { Router } from "express";
import Login from "../controller/auth/login";

const AuthRouter = Router();

AuthRouter.post("/login", Login);

export default AuthRouter