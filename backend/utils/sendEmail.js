import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (options) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Reezo <onboarding@resend.dev>",
      to: options.email,
      subject: options.subject,
      html: options.message,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Email Error:", error);
    throw error;
  }
};

export default sendEmail;