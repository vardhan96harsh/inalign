import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or "Outlook", "Yahoo", etc.
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
export const sendMail = async (data: {
  name: string;
  email: string;
  company: string;
  message: string;
}) => {
  const htmlContent = `
    <div style="font-family: Arial; padding: 20px;">
      <h2>New Demo Request from ${data.name}</h2>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Company:</strong> ${data.company}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
    </div>
  `;

  try {
    console.log("Sending email to:", process.env.TO_EMAIL);
    console.log("Email data:", data);
    await transporter.sendMail({
      from: `"Inalign Website" <${process.env.MAIL_USER}>`,
      to: process.env.TO_EMAIL,
      subject: `Demo Request from ${data.name}`,
      html: htmlContent,
    });
  } catch (error) {
    console.error("❌ Mail send failed:", error);
    throw error;
  }
};
