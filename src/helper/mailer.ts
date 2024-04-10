import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel';
interface SendEmailParams {
  email: string;
  emailType: string;
  userId: string;
}
export const sendEmail = async ({ email, emailType, userId }:SendEmailParams) => {
  try {
    const hashedToken=await bcryptjs.hash(userId.toString(),10);
    if(emailType==='VERIFY'){

     
      const user=await User.findByIdAndUpdate(userId,{
        $set:{ verifyToken:hashedToken,
        verifyTokenExpiry:Date.now()+36000000}
      })
    }else if(emailType==='RESET'){
     
      const user=await User.findByIdAndUpdate(userId,{
       $set: { forgotPasswordToken:hashedToken,
        forgotPasswordTokenExpiry:Date.now()+36000000}
      })
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "bf93e242431391", // these thing must be hidden
        pass: "afd053cf8746df"
      }
    });

    const mailOptions = {
      from: 'thisisrkg@gmail.com',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
      </p>`
  }

    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error) { 
    console.log('Error in nodemailer: ' + error);
  }
};
