import { Link } from 'react-router-dom';
import { useMenu } from './context/MenuContext.jsx';
import { menuPhotos } from './data/menuPhotos.js';
import heroPhoto from './assets/photos/storefront.jpg';

const CHAPTER_SLUGS = ['desserts', 'coffee', 'bakery', 'signature-cakes'];

export default function Home() {
  const { categories, loading } = useMenu();

  if (loading) return null;

  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  const chapters = CHAPTER_SLUGS.map((slug) => bySlug[slug]).filter(Boolean);
  const bestSellers = chapters
    .map((c) => c.items.find((it) => it.featured) || c.items.find((it) => !it.is_placeholder))
    .filter(Boolean);

  return (
    <div style={{ background: 'var(--off-white)' }}>
      <section style={{
        background: 'var(--olive)', color: 'var(--off-white)',
        padding: 'clamp(40px, 8vh, 80px) clamp(20px, 6vw, 90px)',
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 'clamp(32px, 6vw, 90px)', flexWrap: 'wrap',
      }}>
        <div style={{ maxWidth: 640 }}>
          <p className="label" style={{ fontSize: '0.75rem', letterSpacing: '0.15em', opacity: 0.85, marginBottom: 16 }}>
            Maison de Pâtisserie _ Riyadh, Est. 2018
          </p>
          <h1 className="serif" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.6rem)', lineHeight: 1.1 }}>
            The House of <em style={{ fontStyle: 'italic' }}>extraordinary</em> Taste
          </h1>
        </div>
        <img
          src={heroPhoto}
          alt="House of Novéls pastries"
          style={{
            width: 'min(440px, 100%)', aspectRatio: '4 / 5', objectFit: 'cover',
            borderRadius: 2, flex: '0 0 auto',
          }}
        />
      </section>

      <section style={{ padding: 'clamp(36px, 6vh, 64px) clamp(20px, 6vw, 90px)', textAlign: 'center' }}>
        <p className="serif" style={{
          fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', color: 'var(--navy-deep)',
          maxWidth: 780, margin: '0 auto', lineHeight: 1.5,
        }}>
          Welcome to House of Novéls. Step inside a world of thoughtful craftsmanship, timeless elegance, and
          unforgettable flavors.
        </p>
      </section>

      <section style={{ padding: '0 clamp(20px, 6vw, 90px) clamp(40px, 7vh, 72px)' }}>
        <h2 className="serif" style={{ textAlign: 'center', fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', color: 'var(--navy-deep)', marginBottom: 'clamp(20px, 3.5vh, 32px)' }}>
          Best Sellers
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 200px))',
          gap: 'clamp(16px, 2.5vw, 28px)', justifyContent: 'center',
        }}>
          {bestSellers.map((item) => (
            <div key={item.id}>
              {menuPhotos[item.name] ? (
                <img
                  src={menuPhotos[item.name]}
                  alt={item.name}
                  style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover', borderRadius: 2 }}
                />
              ) : (
                <div style={{ width: '100%', aspectRatio: '1 / 1', background: 'var(--peach)', borderRadius: 2 }} />
              )}
              <p className="label" style={{ fontSize: '0.75rem', color: 'var(--navy-deep)', marginTop: 12, textAlign: 'center' }}>
                {item.name}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'rgba(24,38,67,0.65)', textAlign: 'center', marginTop: 4 }}>
                {item.price} SAR
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'clamp(28px, 4.5vh, 44px)' }}>
          <Link
            to="/menu"
            className="label"
            style={{
              display: 'inline-block', background: 'var(--peach)', color: 'var(--navy-deep)',
              padding: '15px 32px', fontSize: '0.75rem', letterSpacing: '0.1em', textDecoration: 'none',
            }}
          >
            Explore the Full Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
