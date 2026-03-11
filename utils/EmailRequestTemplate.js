const EmailRequestTemplate = (resetLink, firstname) => {
  const frontendUrl = process.env.FRONTEND_URL
  const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add basic reset styles for mobile responsiveness */
    @media screen and (max-width: 600px) {
      .content { width: 100% !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0;">
          <!-- Header/Logo Area -->
          <tr>
            <td align="center" style="padding: 30px 0 10px 0; border-top: 4px solid #6b5ce7;">
               <img src="${frontendUrl}/img/nplag.png" alt="Company Logo" width="120" style="display: block; border: 0;">
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 20px 40px; text-align: left; color: #333333;">
              <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #333333;">Reset Your Password</h2>
              <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">Hi ${firstname ? firstname : 'User'},</p>
              <p style="font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                Tap the button below to reset your account password. If you didn't request this, you can safely ignore this email.
              </p>
              <!-- Bulletproof Button -->
              <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center" bgcolor="#6b5ce7" style="border-radius: 5px;">
                    <a href="${resetLink}" target="_blank" style="font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 35px; display: inline-block;">Reset Password</a>
                  </td>
                </tr>
              </table>
              <p style="font-size: 14px; color: #777777; margin: 0;">
                If the button doesn't work, copy and paste this link into your browser:<br>
                <a href="${resetLink}" style="color: #6b5ce7;">${resetLink}</a>
              </p>
            </td>
          </tr>
          <!-- Footer Area -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="font-size: 12px; color: #999999; margin: 0;">
                The link will expire in <b>15 minutes</b> for security reasons.
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
  return html
}

export default EmailRequestTemplate