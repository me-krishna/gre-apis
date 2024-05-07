import { Request, Response } from "express";
import { smtp } from "../../utils/email";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email, subject, message } = req.body;
    smtp.sendMail({
      from: 'jayasurya@drrajus.in',
      to: 'krishnapulluru5@gmail.com',
      subject: 'Test Email',
      text: 'Hello World'
    }, (err, info) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(info);
        res.status(200).send('Email Sent');
      }
    }
    )
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
}