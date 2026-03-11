const EmailConfirmation = (firstname)=> {
const frontendUrl = process.env.FRONTEND_URL
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @media screen and (max-width: 600px) { .content { width: 100% !important; } }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table class="content" width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; border: 1px solid #e0e0e0;">
          <!-- Header with Success Color (Green) -->
          <tr>
            <td align="center" style="padding: 30px 0 10px 0; border-top: 4px solid #28a745;">
               <div style="font-size: 40px; margin-bottom: 10px;">✅</div>
               <h2 style="margin: 0; font-size: 24px; color: #333333;">Password Reset Successful</h2>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 20px 40px; text-align: center; color: #333333;">
              <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">Hi ${firstname ? firstname : 'User'},</p>
              <p style="font-size: 16px; line-height: 24px; margin: 0 0 30px 0;">
                Your password for <b>NURAD-PLAG</b has been successfully updated. You can now log in with your new credentials.
              </p>
              
              <!-- Action Button to Login -->
              <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin-bottom: 30px;">
                <tr>
                  <td align="center" bgcolor="#6b5ce7" style="border-radius: 5px;">
                    <a href="${frontendUrl}/login" target="_blank" style="font-size: 18px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 35px; display: inline-block;">Go to Login</a>
                  </td>
                </tr>
              </table>

              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
              
              <p style="font-size: 14px; color: #d9534f; margin: 0;">
                <strong>Didn't do this?</strong> If you did not change your password, please contact our support team immediately or secure your account.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px; background-color: #f9f9f9; text-align: center; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
              <p style="font-size: 12px; color: #999999; margin: 0;">
                &copy; ${new Date().getFullYear()} NURAD-PLAG Team
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



export default EmailConfirmation