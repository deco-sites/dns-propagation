export interface EmailBodyProps {
  inviteId: string;
  teamName: string;
}

export function generateEmailBody({ inviteId, teamName }: EmailBodyProps) {
  const emailHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
<title>Email Template</title>
</head>
<body>
<!-- Main Table -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; margin: 0 auto; text-align: center;">
  <!-- Logo Row -->
  <tr>
    <td style="padding: 24px;">
      <img src="https://drive.google.com/uc?export=view&id=1ppr-nMqmMJ0Tt_w3Djj6mfJFWJub89JP" alt="Logo"/>
    </td>
  </tr>

  <!-- Divider Line -->
  <tr>
    <td>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background: #C9CFCF; height: 1px; width: 100%;"></td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Message Row -->
  <tr>
    <td style="color: #000; font-size: 24px; padding: 16px;">
      You have been invited to join <strong>${teamName}</strong> team
    </td>
  </tr>

  <!-- Button Row -->
  <tr>
    <td style="padding-bottom: 24px;">
      <!-- Use a link instead of a button for better email client support -->
      <a href="https://admin.deco.cx/admin/invites/${inviteId}/accept" target="_blank" style="display: inline-block; width:180px; height: 60px; background: #113032; color: #FFF; font-size: 18px; font-weight: 700; line-height: 60px; text-decoration: none;">Accept invite</a>
    </td>
  </tr>

  <!-- Divider Line -->
  <tr>
    <td>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="background: #C9CFCF; height: 1px; width: 100%;"></td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Icons Row -->
  <tr>
    <td style="padding: 24px;">
      <img src="https://drive.google.com/uc?export=view&id=1gxyHS_urZVMi4qljAT2JkJYRhPX6UFnR" alt="LinkedIn" />
      <img src="https://drive.google.com/uc?export=view&id=1MBGN4P0ogWVWDXdnBhCPun_dG1n4Gw8J" alt="Instagram" />
      <img src="https://drive.google.com/uc?export=view&id=1i7qkQWyFE7GI2Ceg1uHm5A4UhExvLxIS" alt="Github" />
      <img src="https://drive.google.com/uc?export=view&id=1qIPb4Tpk4-LWRx9UvmbyWeO0sJCDsjDL" alt="Discord" />
    </td>
  </tr>
</table>
<!-- End Main Table -->
</body>
</html>
`;

  return emailHTML;
}
