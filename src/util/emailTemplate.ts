export const emailTemplate=`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Email Verification</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Main Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #2563eb, #1e40af); padding:30px; text-align:center;">
              <h1 style="margin:0; font-size:24px; color:#ffffff; font-weight:600;">
                Verify Your Email
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:40px 30px;">
              <p style="margin:0 0 16px; font-size:16px; color:#111827;">
                Hello <strong>{{USER_NAME}}</strong>,
              </p>

              <p style="margin:0 0 20px; font-size:15px; line-height:1.6; color:#374151;">
                Thank you for creating an account with us. To complete your registration and secure your account, please verify your email address by clicking the button below.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
                <tr>
                  <td align="center">
                    <a href="{{VERIFICATION_LINK}}"
                       style="background-color:#2563eb; color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:8px; font-size:15px; font-weight:600; display:inline-block;">
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px; font-size:14px; color:#6b7280;">
                If the button above does not work, copy and paste the following link into your browser:
              </p>

              <p style="margin:0; font-size:13px; color:#2563eb; word-break:break-all;">
                {{VERIFICATION_LINK}}
              </p>

              <p style="margin:30px 0 0; font-size:14px; color:#6b7280;">
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
`