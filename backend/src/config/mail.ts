import nodemailer from 'nodemailer';
import { config } from './env';

let mailTransporter: nodemailer.Transporter | null = null;

if (config.smtp.user && config.smtp.user !== 'mock-user') {
  mailTransporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass,
    },
  });
}

export const getMailTransporter = () => mailTransporter;
