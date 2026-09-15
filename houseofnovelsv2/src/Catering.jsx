import { useMenu } from './context/MenuContext.jsx';
import signaturePhoto from './assets/menu-photos/dark-chocolate.jpg';
import recentPhoto1 from './assets/menu-photos/pistachio-raspberry.jpg';
import recentPhoto2 from './assets/photos/bread-shelf.jpg';
import recentPhoto3 from './assets/photos/pastry-display.jpg';
import recentPhoto4 from './assets/menu-photos/lemon-meringue.jpg';

const recentEvents = [recentPhoto1, recentPhoto2, recentPhoto3, recentPhoto4];

export default function Catering() {
  const { categories, loading } = useMenu();
  const catering = categories.find((c) => c.slug === 'catering');

  if (loading) return null;

  const packages = catering?.packages || [];
  const featured = packages.find((p) => p.featured) || packages[0];

  return (
    <div style={{ background: 'var(--off-white)' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'minmax(260px, 32%) 1fr', gap: 'clamp(24px, 4vw, 48px)',
        padding: 'clamp(24px, 5vh, 48px) clamp(20px, 5vw, 70px)',
      }} className="catering-grid">
        <div style={{ background: 'var(--navy-deep)', color: 'var(--off-white)', padding: 'clamp(24px, 4vw, 40px)' }}>
          <p className="label" style={{ fontSize: '0.62rem', letterSpacing: '0.15em', opacity: 0.85, marginBottom: 10 }}>
            {catering?.eyebrow || 'WEDDINGS . CORPORATE . PRIVATE'}
          </p>
          <h1 className="serif" style={{ fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 2.6rem)', lineHeight: 1.1 }}>
            Events &amp; Catering
          </h1>
          {catering?.quote && (
            <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.9rem', opacity: 0.9, lineHeight: 1.5, margin: '20px 0', maxWidth: 300 }}>
              &ldquo;{catering.quote}&rdquo;
            </p>
          )}
          {featured && (
            <div>
              <img
                src={signaturePhoto}
                alt={featured.name}
                style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 2 }}
              />
              <p className="label" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', opacity: 0.8, marginTop: 10 }}>
                Featured &middot; {featured.name} Package
              </p>
            </div>
          )}
        </div>

        <div>
          {packages.map((pkg, i) => (
            <div
              key={pkg.name}
              style={{
                display: 'flex', alignItems: 'baseline', gap: 18, padding: 'clamp(16px, 2.4vh, 26px) 0',
                borderBottom: i < packages.length - 1 ? '1px solid rgba(24,38,67,0.15)' : 'none',
              }}
            >
              <span className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', color: 'rgba(24,38,67,0.45)', width: 28, flex: '0 0 auto' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                <h3 className="serif" style={{ fontSize: 'clamp(1.1rem, 1.9vw, 1.4rem)', color: 'var(--navy-deep)' }}>
                  {pkg.name}
                </h3>
                <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(24,38,67,0.6)', marginTop: 3 }}>
                  {pkg.desc}
                </p>
              </div>
              <span className="serif" style={{ fontSize: '0.95rem', color: 'var(--navy-deep)', flex: '0 0 auto', whiteSpace: 'nowrap' }}>
                {pkg.priceLabel}
              </span>
            </div>
          ))}

          <div style={{ marginTop: 'clamp(28px, 4vh, 44px)' }}>
            <p className="label" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', color: 'rgba(24,38,67,0.5)', marginBottom: 14 }}>
              From Recent Events
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14 }}>
              {recentEvents.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt=""
                  style={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', borderRadius: 2 }}
                />
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'clamp(28px, 4vh, 44px)' }}>
            <p className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: 'var(--navy-deep)' }}>
              Planning something?
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(24,38,67,0.75)', marginTop: 6 }}>
              Tell us the date, the headcount, and the occasion — we&rsquo;ll take it from there.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B966549780998&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noreferrer"
              className="label"
              style={{
                display: 'inline-block', marginTop: 16, background: 'var(--olive)', color: 'var(--off-white)',
                padding: '13px 26px', fontSize: '0.72rem', letterSpacing: '0.08em', textDecoration: 'none',
              }}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .catering-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
