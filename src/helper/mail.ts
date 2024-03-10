import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMailHelper = async (payload: {
  emailId: string;
  message: string;
}) => {
  try {
    const value = await resend.emails.send({
      from: "Porfolio <onboarding@resend.dev>",
      to: process.env.TO_MAIL as string,
      subject: "Message from contact form in portfolio!",
      reply_to: payload.emailId,
      text: payload.message,
    });
    if (value.error) {
      return { success: false, error: value.error };
    }
    return { success: true, message: "Email sent successfully" };
  } catch (e) {
    console.log(e);
    return { success: false, message: "Email failed to deliver" };
  }
};
