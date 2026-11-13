import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/config";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!message || !email) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Resend is not configured yet. Please add RESEND_API_KEY to your .env.local file.",
        },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const sender = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    const { data, error } = await resend.emails.send({
      from: sender,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `Portfolio Transmission from ${name || "Visitor"}`,
      text: `Name: ${name || "Anonymous"}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

