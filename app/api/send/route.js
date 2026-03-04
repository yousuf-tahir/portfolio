import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #1A1A1D; color: #D9D9D9; padding: 40px; border-radius: 12px; border: 1px solid #3B1C32;">
          <h2 style="color: #ffffff; margin-bottom: 8px;">New Portfolio Message</h2>
          <p style="color: #9A9A9A; margin-bottom: 32px; font-size: 14px;">Someone reached out via your portfolio contact form.</p>
          
          <div style="margin-bottom: 20px;">
            <p style="color: #6A1E55; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">From</p>
            <p style="color: #ffffff; font-size: 16px; font-weight: 600; margin: 0;">${name}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <p style="color: #6A1E55; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">Reply To</p>
            <p style="color: #EDE9E3; font-size: 15px; margin: 0;">${email}</p>
          </div>

          <div style="margin-bottom: 32px;">
            <p style="color: #6A1E55; font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">Message</p>
            <p style="color: #D9D9D9; font-size: 15px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <a href="mailto:${email}" style="display: inline-block; background: #6A1E55; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">Reply to ${name}</a>
          
          <p style="color: #9A9A9A; font-size: 12px; margin-top: 32px; padding-top: 20px; border-top: 1px solid #3B1C32;">Sent from your portfolio at yousuf-tahir.vercel.app</p>
        </div>
      `,
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }
}