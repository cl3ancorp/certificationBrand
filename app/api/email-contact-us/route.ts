import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_XgksHx8j_KZA36h8zwm2GQsqubi5NeZ5U');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData } = body;

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <h3>Contact Details</h3>
      <ul>
        <li><strong>Full Name:</strong> ${formData.name}</li>
        <li><strong>Email Address:</strong> ${formData.email}</li>
        <li><strong>Subject:</strong> ${formData.subject}</li>
      </ul>
      <h3>Message</h3>
      <p>${formData.message}</p>
    `;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'cl3ancorp@gmail.com',
      subject: `Contact Form: ${formData.subject}`,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
