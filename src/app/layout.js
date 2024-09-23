import '../app/styles/globals.css';
import Header from './header'; 
import Footer from './footer'; 

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
        <Header />  
        {children}
        <Footer /> 
      </body>
    </html>
  );
}
