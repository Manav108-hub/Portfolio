import { NextRequest , NextResponse } from 'next/server';
import { Resend } from 'resend';

// Update this with your GitHub username
const GITHUB_USERNAME = process.env.GITHUB_NAME;

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
        // Cache the response for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const repos = await response.json();
    
    return NextResponse.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const fromEmail = `contact@${process.env.NEXT_PUBLIC_DOMAIN}`;
    
    // Send email to yourself (notification)
    const notificationEmail = await resend.emails.send({
      from: fromEmail, // This will be your verified domain
      to: ['manavadwani86@gmail.com'], // Your email to receive notifications
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
            <h3 style="color: #007bff; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #e7f3ff; border-left: 4px solid #007bff;">
            <p style="margin: 0; color: #666;">
              <strong>Quick Actions:</strong>
              <a href="mailto:${email}?subject=Re: Your inquiry" style="color: #007bff; text-decoration: none; margin-left: 10px;">Reply to ${name}</a>
            </p>
          </div>
        </div>
      `,
    });

    // Send acknowledgment email to the sender
    const acknowledgmentEmail = await resend.emails.send({
      from: fromEmail, // ✅ Fixed: Use the same verified domain
      to: [email],
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank You for Contacting Me!
          </h2>
          
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible, usually within 24-48 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Your Message Summary</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #ffffff; padding: 15px; border: 1px solid #dee2e6; border-radius: 4px; margin-top: 10px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <p>In the meantime, feel free to:</p>
          <ul>
            <li>Check out my <a href="https://github.com/manav108-hub" style="color: #007bff;">GitHub</a> for my latest projects</li>
            <li>Connect with me on <a href="https://www.linkedin.com/in/manav-adwani-1146a221b/" style="color: #007bff;">LinkedIn</a></li>
          </ul>
          
          <p>Best regards,<br>Manav Adwani</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #666; font-size: 12px;">
            <p>This is an automated response. Please do not reply directly to this email. If you need immediate assistance, you can reach me at manavadwani86@gmail.com</p>
          </div>
        </div>
      `,
    });

    console.log('Notification email sent:', notificationEmail);
    console.log('Acknowledgment email sent:', acknowledgmentEmail);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}