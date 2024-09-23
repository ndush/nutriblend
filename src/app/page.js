import Header from './header'; 
import Navigation from './navigation'; 
import Footer from './footer'; 
import '../app/styles/globals.css'; 

export default function HomePage() {
  return (
    <div>
      <Navigation />
      <Header />
      <main style={{ paddingTop: '60px' }}> 
        
        <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 20px' }}>
          
          <div style={{ flex: '1', paddingRight: '20px', textAlign: 'left' }}>
            <h1 style={{ color: '#98FA00',fontSize: '24px' }}>Welcome to NutriBlend</h1>
            <h2 style={{ color: '#98FA00',fontSize: '24px' }}>Effortlessly Create Balanced & Nutritious Meals</h2>
            <p style={{ fontSize: '20px', lineHeight: '1.6' ,color: 'white' }}>
              NutriBlend takes the stress out of meal planning, making healthy eating easy and delicious. Ideal for busy professionals, fitness enthusiasts, and anyone seeking hassle-free nutrition.
            </p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '20px' ,color: 'white' }}>
              <strong >NutriBlend</strong> – where balance meets flavor!
            </p>
          </div>

          <div style={{ flex: '1', paddingLeft: '20px' }}>
            <img src="/images/a.jpg" alt="Welcome to Nutriblend" style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
}
