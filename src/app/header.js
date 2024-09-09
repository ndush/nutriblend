
import '../app/styles/globals.css'; 
import Link from 'next/link';
export default function Header() {
  return (
    <header>
        <div className="header-container">
       <Link href="/" className="logo">Nutriblend</Link>
      {/* <h1>Welcome to Nutriblend</h1> */}
      </div>
    </header>
  
  );
}
