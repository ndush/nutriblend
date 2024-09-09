// src/app/page.js

import Header from './header'; // Adjust path as necessary
import Navigation from './navigation'; // Adjust path as necessary
import Footer from './footer'; // Adjust path as necessary
import '../app/styles/globals.css'; // Ensure this path is correct

export default function HomePage() {
  return (
    <div>
      <Navigation />
      <Header />
      <main style={{ paddingTop: '60px' }}> {/* Add padding to ensure content is below fixed navigation */}
        <img src="/images/a.jpg" alt="Welcome to Nutriblend" style={{ width: '100%', height: 'auto' }} />
        {/* Additional main content can go here */}
      </main>
      <Footer />
    </div>
  );
}
