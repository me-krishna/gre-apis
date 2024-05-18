import { sign } from "jsonwebtoken";
import { Request, Response } from "express";
import { loginValidatin } from "../../validation/auth/loginValidation";
import { loginModel } from "../../model/auth/login";
import createResponse from "../../utils/api-resp";
import dotenv from 'dotenv';

dotenv.config();

export default async function Login(req: Request, res: Response) {
  console.log("login")
  const { error, value } = loginValidatin(req.body);
  if (error) {
    createResponse(res, {
      status: 400,
      message: error.message,
      data: null,
      metadata: {},
    });
  }
  try {
    const loginData = await loginModel(value) as any[];
    if (loginData.length === 0) {
      createResponse(res, {
        status: 404,
        message: "The account you're trying to access was not found or is currently inactive. Please contact our Support Team for further assistance.",
        data: null,
        metadata: {},
      });
    } else {
      const token = sign({
        userId: loginData[0].id,
        email: loginData[0].email,
        course: loginData[0].course,
      },
        process.env.JWT_SECRET!
        , {
          expiresIn: value.type === "admin" ? '8h' : '3h'
        });
      createResponse(res, {
        status: 200,
        message: "Login successful",
        data: {
          token: token,
          user: {
            ...loginData[0]
          }
        },
        metadata: {},
      });
    }
  } catch (error) {
    createResponse(res, {
      status: 500,
      message: error instanceof Error ? error.message : "Internal Server Error",
      data: null,
      metadata: {},
    });
  }
}
