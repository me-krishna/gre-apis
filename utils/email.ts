import { createTransport } from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

export const smtp = createTransport({
  // host: 'drrajus.com',
  // port: 465,
  // secure: true,
  // requireTLS: true,
  // debug: true,
  // auth: {
  //   user: process.env.SMTP_USER,
  //   pass: process.env.SMTP_PASS
  // }

  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  requireTLS: true,
  debug: true,
  auth: {
    // user: 'bhargavlalkrishnareddypulluru@gmail.com',
    // pass: 'klos lgcu bazg ahgz'
    user: 'mocktests@drrajus.com',
    pass: 'Omsairam@444'
  }

});