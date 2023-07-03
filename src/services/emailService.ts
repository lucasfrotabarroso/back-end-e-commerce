import nodemailer from "nodemailer";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ebebc4cc29712d",
        pass: "a5ed44753cc5dd",
      },
    });
  }
  async sendEmail(to: string, subject: string, text: string, html: string) {
    
    const mailOptions = {
      from: "lucasfrota@gmail.com",
      to,
      subject,
      text,
      html
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Message sent: ", info.messageId);
    } catch (error) {
      console.error("Error sending email: ", error);
    }
  }
}
  


