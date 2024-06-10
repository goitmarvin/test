import nodemailer from "nodemailer";
import "dotenv/config";

const { EMAIL_FROM, EMAIL_PASSWORD } = process.env;

const nodemailerConfig = {
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_FROM,
    pass: EMAIL_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_FROM };
  await transport.sendMail(email);
};

export { sendEmail };
