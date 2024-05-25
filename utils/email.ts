import { createTransport } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

export const smtp = createTransport({
  host: 'drrajus.com',
  port: 465,
  secure: true,
  requireTLS: true,
  debug: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }

});