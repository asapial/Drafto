import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import { emailTemplate } from "../util/emailTemplate";
// If your Prisma file is located elsewhere, you can change the path



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: `${process.env.senderEmail}`,
    pass: `${process.env.gmail_app_password}`,
  },
});



export const auth = betterAuth({
  user: {
    additionalFields: {
      role: {
        type: ['user', 'admin'],
        required: false,
        defaultValue: 'user',
        input: false,
        //  client: true
      },
      phone: {
        type: "string",
        required: false,
        //  client: true
      }
    }
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true
  },
  trustedOrigins: [`${process.env.ORIGIN_URL}`],

  emailVerification: {
    sendOnSignUp: true,


    sendVerificationEmail: async ({ user, url, token }, request) => {


      console.log(user);
      const verificationLink = `https://yourdomain.com/verify-email?token=${token}`;

      const info = await transporter.sendMail({
        from: `Abu Syeed Abdullah <${process.env.senderEmail}>`,
        to: user.email,
        subject: "Email Verification",
        text: `Hello ${user.name}, please verify your email using this link: ${verificationLink}`,
        html: emailTemplate.emailVerificationTemplate(user, verificationLink),
      });

    },
  },
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
