import { Router } from "express";
import Login from "../controller/auth/login";

const AuthRouter = Router();

AuthRouter.post("/login", Login);
AuthRouter.post("/student/login", Login);
AuthRouter.post("/admin/login", Login);

export default AuthRouter