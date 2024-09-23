import Link from 'next/link';
import '../app/styles/globals.css'; 

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <Link href="/" className="logo">
          Nutriblend
        </Link>
      </div>
    </header>
  );
}
