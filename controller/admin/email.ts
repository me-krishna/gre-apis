import { Request, Response } from "express";
import { smtp } from "../../utils/email";

export const sendEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    let emailerSent = await generateEmail(email, "Krishna", "krish@1234");
    if (emailerSent) {
      res.status(200).send('Email Sent')
    } else {
      res.status(500).send('Email Not Sent')
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
export const generateEmail = async (email: string, firstName: string, pass: string) => {
  let login_url: string = 'https://drrajus.com/login';
  try {
    const res = await smtp.sendMail({
      from: 'mocktests@drrajus.com',
      to: email,
      subject: 'Welcome to Dr Raju\'s Educational Institution ! Your Account Has Been Successfully Created',
      html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<meta charset="UTF-8">
<meta content="width=device-width, initial-scale=1" name="viewport">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="telephone=no" name="format-detection">
<title>Welcome Email</title><!--[if (mso 16)]>
  <style type="text/css">
  a {text-decoration: none;}
  </style>
  <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
  <o:AllowPNG></o:AllowPNG>
  <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
<style type="text/css">
.rollover:hover .rollover-first {
max-height:0px!important;
display:none!important;
}
.rollover:hover .rollover-second {
max-height:none!important;
display:block!important;
}
.rollover span {
font-size:0px;
}
u + .body img ~ div div {
display:none;
}
#outlook a {
padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
color:inherit;
mso-style-priority:99;
}
a.es-button {
mso-style-priority:100!important;
text-decoration:none!important;
}
a[x-apple-data-detectors] {
color:inherit!important;
text-decoration:none!important;
font-size:inherit!important;
font-family:inherit!important;
font-weight:inherit!important;
line-height:inherit!important;
}
.es-desk-hidden {
display:none;
float:left;
overflow:hidden;
width:0;
max-height:0;
line-height:0;
mso-hide:all;
}
.es-button-border:hover > a.es-button {
color:#ffffff!important;
}
@media only screen and (max-width:600px) {
  .img-1053 {
  width:100%!important;
  }
  .img-8739 {
  width:211px!important;
  }
  .es-text-7750,
.es-text-7750 p,
.es-text-7750 a,
.es-text-7750 h1,
.es-text-7750 h2,
.es-text-7750 h3,
.es-text-7750 h4,
.es-text-7750 h5,
.es-text-7750 h6,
.es-text-7750 ul,
.es-text-7750 ol,
.es-text-7750 li,
.es-text-7750 span,
.es-text-7750 sup,
.es-text-7750 sub,
.es-text-7750 u,
.es-text-7750 b,
.es-text-7750 strong,
.es-text-7750 em,
.es-text-7750 i {
  font-size:16px!important;
  }
  .es-text-7750 .es-text-mobile-size-16,
.es-text-7750 .es-text-mobile-size-16 * {
  font-size:16px!important;
  line-height:150%!important;
  }
}
@media only screen and (max-width:600px) {.img-1053 { width:70%!important } .img-8739 { width:211px!important } .es-text-7750, .es-text-7750 p, .es-text-7750 a, .es-text-7750 h1, .es-text-7750 h2, .es-text-7750 h3, .es-text-7750 h4, .es-text-7750 h5, .es-text-7750 h6, .es-text-7750 ul, .es-text-7750 ol, .es-text-7750 li, .es-text-7750 span, .es-text-7750 sup, .es-text-7750 sub, .es-text-7750 u, .es-text-7750 b, .es-text-7750 strong, .es-text-7750 em, .es-text-7750 i { font-size:16px!important } .es-text-7750 .es-text-mobile-size-16, .es-text-7750 .es-text-mobile-size-16 * { font-size:16px!important; line-height:150%!important } }
@media only screen and (max-width:600px) {.es-m-p5 { padding:5px!important } .es-m-p0r { padding-right:0px!important } .es-m-p14r { padding-right:14px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:20px!important; line-height:120%!important } a.es-button, button.es-button, .es-button-border { display:block!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } .h-auto { height:auto!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }
</style>
</head>
<body class="body" style="width:100%;height:100%;padding:0;Margin:0">
<div dir="ltr" class="es-wrapper-color" lang="en" style="background-color:#F7F7F7"><!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
      <v:fill type="tile" color="#f7f7f7"></v:fill>
    </v:background>
  <![endif]-->
 <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F7F7F7">
   <tr>
    <td valign="top" style="padding:0;Margin:0">
     <table cellpadding="0" cellspacing="0" class="es-header" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
       <tr>
        <td align="center" style="padding:0;Margin:0">
         <table class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
           <tr>
            <td class="es-m-p5" align="left" style="padding:20px;Margin:0;border-radius:10px 10px 0px 0px;background-color:#e1edfb" bgcolor="#e1edfb">
             <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
               <tr>
                <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                 <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:1px" role="presentation">
                   <tr>
                    <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="https://drrajus.com/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#3D7781;font-size:14px"><img src="https://mern-drrajus-images-exams-new.s3.ap-south-1.amazonaws.com/logo.png" alt="Logo" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="300px" title="Logo" class="img-1053"></a></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table></td>
       </tr>
     </table>
     <table class="es-content" cellspacing="0" cellpadding="0" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
       <tr>
        <td align="center" style="padding:0;Margin:0">
         <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;border-right:1px solid #4c8aa7;border-left:1px solid #4c8aa7;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" role="none">
           <tr>
            <td align="left" bgcolor="#064ea4" style="padding:0;Margin:0;padding-top:30px;padding-right:20px;padding-left:20px;background-color:#064ea4">
             <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
               <tr>
                <td align="left" style="padding:0;Margin:0;width:558px">
                 <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                   <tr>
                    <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:30px;padding-bottom:20px"><h1 style="Margin:0;font-family:georgia, times, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:30px;font-style:normal;font-weight:normal;line-height:36px;color:#fff">Welcome To DrRaju's</h1></td>
                   </tr>
                   <tr>
                    <td align="center" style="padding:0;Margin:0;padding-right:15px;font-size:0px"><img class="img-8739" src="https://mern-drrajus-images-exams-new.s3.ap-south-1.amazonaws.com/pngwingcom.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="220"></td>
                   </tr>
                 </table></td>
               </tr>
               <tr>
                <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:558px">
                 <table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                   <tr>
                    <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-top:30px;padding-bottom:5px"><h2 style="Margin:0;font-family:georgia, times, 'times new roman', serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:29px;color:#fff">Hey <span style="background:transparent;color:#fcd">${firstName}</span></h2></td>
                   </tr>
                   <tr>
                    <td align="center" style="Margin:0;padding-bottom:20px;padding-top:10px;padding-right:40px;padding-left:40px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#fff;font-size:14px" class=" es-m-txt-l" align="center">Welcome to Dr. Raju’s! We are thrilled to have you join our community of aspiring achievers. Your dedication to success is about to pay off, and we're here to guide you every step of the way.</p></td>
                   </tr>
                   <tr>
                    <td align="center" class="es-m-txt-c" style="padding:0;Margin:0;padding-bottom:5px;padding-top:5px;font-size:0">
                     <table border="0" width="35%" height="100%" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;display:inline-table;width:35% !important" role="presentation">
                       <tr>
                        <td style="padding:0;Margin:0;border-bottom:1px solid #fb8500;background:none;height:1px;width:100%;margin:0px"></td>
                       </tr>
                     </table></td>
                   </tr>
                   <tr>
                    <td align="center" class="es-m-txt-c es-text-7750" bgcolor="#fcac02" style="padding:10px;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:32px !important;letter-spacing:0;color:#fff;font-size:16px" align="left" class="es-text-mobile-size-16"><span style="background:transparent">Email : ${email}</span></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:32px !important;letter-spacing:0;color:#fff;font-size:16px" align="left" class="es-text-mobile-size-16"><span style="background:transparent">​Password : ${pass}</span></p></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
           <tr>
            <td align="left" bgcolor="#064ea4" style="Margin:0;padding-top:10px;padding-right:40px;padding-left:40px;padding-bottom:40px;background-color:#064ea4">
             <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
               <tr>
                <td align="center" valign="top" style="padding:0;Margin:0;width:518px">
                 <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                   <tr>
                    <td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#2CB543;background:#f99d77;border-width:0px;display:inline-block;border-radius:30px;width:auto"><a href="${login_url}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:15px 30px 15px 30px;display:inline-block;background:#f99d77;border-radius:30px;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid #f99d77">Login Now</a></span></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table></td>
       </tr>
     </table>
     <table cellpadding="0" cellspacing="0" class="es-footer" align="center" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
       <tr>
        <td align="center" style="padding:0;Margin:0">
         <table class="es-footer-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" role="none">
           <tr>
            <td class="es-m-p5" align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:25px;padding-bottom:25px;border-radius:0px 0px 10px 10px;background-color:#e1edfb" bgcolor="#e1edfb">
             <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
               <tr>
                <td align="left" style="padding:0;Margin:0;width:560px">
                 <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                   <tr>
                    <td align="center" style="padding:0;Margin:0;font-size:0">
                     <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr>
                        <td align="center" valign="top" class="es-m-p14r" style="padding:0;Margin:0;padding-right:28px"><a target="_blank" href="https://www.facebook.com/DrrajusMsinUS" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:14px"><img title="Facebook" src="https://ehaopzd.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png" alt="Fb" height="46" width="46" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                        <td align="center" valign="top" class="es-m-p14r" style="padding:0;Margin:0;padding-right:28px"><a target="_blank" href="https://www.instagram.com/drrajus_institute/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:14px"><img title="Instagram" src="https://ehaopzd.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png" alt="Inst" height="46" width="46" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                        <td align="center" valign="top" class="es-m-p14r" style="padding:0;Margin:0;padding-right:28px"><a target="_blank" href="https://www.youtube.com/@DrRajusConsultancy" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:14px"><img title="Youtube" src="https://ehaopzd.stripocdn.email/content/assets/img/social-icons/circle-colored/youtube-circle-colored.png" alt="Yt" height="46" width="46" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                        <td align="center" valign="top" style="padding:0;Margin:0"><a target="_blank" href="https://www.linkedin.com/company/dr-raju-s-institute/" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:14px"><img title="Linkedin" src="https://ehaopzd.stripocdn.email/content/assets/img/social-icons/circle-colored/linkedin-circle-colored.png" alt="In" height="46" width="46" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table></td>
       </tr>
     </table></td>
   </tr>
 </table>
</div>
</body>
</html>
`
    })
    console.log("check 2", res);
    return true;
  } catch (error) {
    console.log("check 4");
    return false;
  }
}