import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend('re_XgksHx8j_KZA36h8zwm2GQsqubi5NeZ5U');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formData } = body;

    const emailHtml = `
      <h2>New Certification Application</h2>
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${formData.name}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone}</li>
      </ul>
      <h3>Source Information</h3>
      <ul>
        <li><strong>Entity Name:</strong> ${formData.entityName}</li>
        <li><strong>Description:</strong> ${formData.description}</li>
        <li><strong>Website:</strong> ${formData.website || 'N/A'}</li>
        <li><strong>Location:</strong> ${formData.location || 'N/A'}</li>
      </ul>
      <h3>Additional Information</h3>
      <p>${formData.additionalInfo || 'None provided'}</p>
    `;

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'cl3ancorp@gmail.com',
      subject: 'New Clean Certification Application',
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
