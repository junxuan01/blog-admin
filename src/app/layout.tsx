import AppProvider from '@providers/AppProvider';
import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lylo Concierge for Enterprises – Bulk & Corporate Bookings Made Easy',
  description:
    'Simplify corporate transport with Lylo Concierge. Manage bookings, payments, and policies for your employees in one powerful platform.',
  keywords: [
    'corporate transport',
    'business rides',
    'enterprise car booking',
    'staff shuttle',
    'Singapore',
  ],
  alternates: {
    canonical: 'https://enterprise.lylo.sg',
  },
  openGraph: {
    title:
      'Lylo Concierge for Enterprises – Bulk & Corporate Bookings Made Easy',
    description:
      'Simplify corporate transport with Lylo Concierge. Manage bookings, payments, and policies for your employees in one powerful platform.',
    url: 'https://enterprise.lylo.sg',
    siteName: 'Lylo Concierge for Enterprises',
    locale: 'en_SG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${roboto.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
