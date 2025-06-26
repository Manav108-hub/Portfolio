// app/contact/page.tsx
import { Metadata } from 'next';
import ContactForm from '../../components/Contact';

export const metadata: Metadata = {
  title: 'Contact - Your Portfolio',
  description: 'Get in touch with me for new opportunities and collaborations',
  openGraph: {
    title: 'Contact - Your Portfolio',
    description: 'Get in touch with me for new opportunities and collaborations',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - Your Portfolio',
    description: 'Get in touch with me for new opportunities and collaborations',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactForm />
    </main>
  );
}