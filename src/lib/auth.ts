import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
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
  user:{
    additionalFields:{
      role:{
        type:['user','admin'],
        required:false,
        defaultValue:'user',
        input:false,
        //  client: true
      },
      phone:{
        type:"string",
        required:false,
        //  client: true
      }
    }
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification:true
  },
  trustedOrigins: [`${process.env.ORIGIN_URL}`],

  emailVerification: {
    sendOnSignUp: true,
    

    sendVerificationEmail: async ({ user, url, token }, request) => {
      //   void sendEmail({
      //     to: user.email,
      //     subject: "Verify your email address",
      //     text: `Click the link to verify your email: ${url}`,
      //   });


      console.log(user);
      const verificationLink = `https://yourdomain.com/verify-email?token=${token}`;

      const info = await transporter.sendMail({
        from: `Abu Syeed Abdullah <${process.env.senderEmail}>`,
        to: user.email,
        subject: "Email Verification",
        text: `Hello ${user.name}, please verify your email using this link: ${verificationLink}`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0; background-color:#f4f6f8;">
    <tr>
      <td align="center">

        <table width="100%" cellpadding="0" cellspacing="0"
          style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden;
          box-shadow:0 10px 30px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#1e3a8a); padding:32px; text-align:center;">
              <h1 style="margin:0; color:#ffffff; font-size:24px; font-weight:600;">
                Email Verification
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px;">
              <p style="margin:0 0 16px; font-size:16px; color:#111827;">
                Hello <strong>${user.name}</strong>,
              </p>

              <p style="margin:0 0 24px; font-size:15px; line-height:1.6; color:#374151;">
                Thank you for registering. Please confirm your email address to activate your account.
                This helps us ensure the security of your account.
              </p>

              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0;">
                <tr>
                  <td align="center">
                    <a href="${verificationLink}"
                       style="display:inline-block; padding:14px 36px;
                       background-color:#2563eb; color:#ffffff; text-decoration:none;
                       font-size:15px; font-weight:600; border-radius:8px;">
                      Verify Email
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 10px; font-size:14px; color:#6b7280;">
                If the button does not work, copy and paste the link below into your browser:
              </p>

              <p style="margin:0; font-size:13px; color:#2563eb; word-break:break-all;">
                ${verificationLink}
              </p>

              <p style="margin:28px 0 0; font-size:14px; color:#6b7280;">
                If you did not create this account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:20px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#9ca3af;">
                © 2026 Abu Syeed Abdullah. All rights reserved.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `,
      });

    },
  },
});
