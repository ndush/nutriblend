// src/app/layout.js

import '../app/styles/globals.css'; // Import global styles
import Header from './header'; // Adjust path as necessary
import Footer from './footer'; // Adjust path as necessary

export const metadata = {
  title: 'Nutriblend',
  description: 'Welcome to Nutriblend',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <Header />  {/* Header should be imported here if used globally */}
        {children}
        <Footer /> {/* Footer should be imported here if used globally */}
      </body>
    </html>
  );
}
