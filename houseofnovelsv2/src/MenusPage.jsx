import { useEffect, useState } from 'react';
import { useMenu } from './context/MenuContext.jsx';
import { useLang, categoryNames } from './context/LangContext.jsx';
import { menuPhotos } from './data/menuPhotos.js';

const CHAPTER_SLUGS = ['desserts', 'coffee', 'bakery', 'signature-cakes'];

export default function MenusPage() {
  const { categories, loading } = useMenu();
  const { t, lang } = useLang();
  const [activeSlug, setActiveSlug] = useState(null);

  const bySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
  const chapters = CHAPTER_SLUGS.map((slug) => bySlug[slug]).filter(Boolean);
  const active = chapters.find((c) => c.slug === activeSlug) || chapters[0];

  useEffect(() => {
    if (chapters.length && !activeSlug) setActiveSlug(chapters[0].slug);
  }, [chapters.length]);

  if (loading) return null;
  if (chapters.length === 0 || !active) return null;

  const featured = active.items.find((it) => it.featured && !it.is_placeholder && !it.sold_out)
    || active.items.find((it) => !it.is_placeholder && !it.sold_out)
    || active.items[0];

  return (
    <div style={{ background: 'var(--off-white)' }}>
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 'clamp(20px, 4vw, 48px)', flexWrap: 'wrap',
        padding: 'clamp(18px, 3vh, 28px) clamp(20px, 5vw, 70px) clamp(14px, 2vh, 20px)',
        borderBottom: '1px solid rgba(24,38,67,0.15)',
      }}>
        {chapters.map((c) => {
          const isActive = c.slug === active.slug;
          return (
            <button
              key={c.slug}
              onClick={() => setActiveSlug(c.slug)}
              className="serif"
              style={{
                background: 'none', border: 'none', cursor: 'pointer', fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', fontWeight: 400, padding: '4px 2px',
                color: isActive ? 'var(--navy-deep)' : 'rgba(24,38,67,0.5)',
                borderBottom: `2px solid ${isActive ? 'var(--orange)' : 'transparent'}`,
              }}
            >
              {categoryNames[c.slug]?.[lang] || c.name}
            </button>
          );
        })}
      </div>

      {lang === 'ar' && (
        <p style={{ fontSize: '0.72rem', color: 'rgba(24,38,67,0.5)', textAlign: 'center', padding: '10px 20px 0' }}>
          {t('arPending')}
        </p>
      )}

      <div style={{
        display: 'grid', gridTemplateColumns: 'minmax(260px, 32%) 1fr', gap: 0,
        minHeight: 520, alignItems: 'stretch',
      }} className="chapter-grid">
        <div style={{
          background: active.background, color: active.ink,
          padding: 'clamp(24px, 4vw, 48px)', display: 'flex', flexDirection: 'column',
        }}>
          <p className="label" style={{ fontSize: '0.68rem', letterSpacing: '0.15em', opacity: 0.85, marginBottom: 8 }}>
            {active.chapterLabel || 'Chapter'}
          </p>
          <h1 className="serif" style={{ fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 2.8rem)', lineHeight: 1.05 }}>
            {categoryNames[active.slug]?.[lang] || active.name}
          </h1>

          <div style={{ flex: '1 1 auto', minHeight: 24 }} />

          {active.quote && (
            <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.5, opacity: 0.92, marginBottom: 20, maxWidth: 320 }}>
              &ldquo;{active.quote}&rdquo;
            </p>
          )}

          {featured && (
            <div>
              {(featured.photoUrl || menuPhotos[featured.name]) ? (
                <img
                  src={featured.photoUrl || menuPhotos[featured.name]}
                  alt={featured.name}
                  style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 2 }}
                />
              ) : (
                <div style={{ width: '100%', aspectRatio: '16 / 10', background: 'rgba(255,255,255,0.15)', borderRadius: 2 }} />
              )}
              <p className="label" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', opacity: 0.8, marginTop: 10 }}>
                Featured &middot; {featured.name}
              </p>
            </div>
          )}
        </div>

        <div style={{ padding: 'clamp(24px, 4vw, 48px)' }}>
          {active.items.map((item, i) => {
            return (
              <div
                key={item.id || item.name}
                style={{
                  display: 'flex', alignItems: 'baseline', gap: 18,
                  padding: 'clamp(14px, 2.2vh, 22px) 0',
                  borderBottom: i < active.items.length - 1 ? '1px solid rgba(24,38,67,0.15)' : 'none',
                }}
              >
                <span className="serif" style={{ fontStyle: 'italic', fontSize: '1rem', color: 'rgba(24,38,67,0.45)', width: 28, flex: '0 0 auto' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: '1 1 auto', minWidth: 0 }}>
                  <h3 className="serif" style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', color: 'var(--navy-deep)' }}>
                    {item.name}
                    {(item.is_placeholder || item.sold_out) && (
                      <span className="label" style={{
                        marginLeft: 10, fontSize: '0.58rem', letterSpacing: '0.06em', color: item.sold_out ? 'rgba(24,38,67,0.4)' : 'var(--orange)',
                      }}>
                        {item.sold_out ? t('soldOut') : t('comingSoon')}
                      </span>
                    )}
                  </h3>
                  <p className="serif" style={{ fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(24,38,67,0.6)', marginTop: 3, lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                  {item.nameAr && (
                    <p className="serif" dir="rtl" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(24,38,67,0.45)', marginTop: 3, textAlign: 'left' }}>
                      {item.nameAr}
                    </p>
                  )}
                </div>
                <span className="serif" style={{ fontSize: '0.95rem', color: 'var(--navy-deep)', flex: '0 0 auto', whiteSpace: 'nowrap' }}>
                  {item.is_placeholder ? '—' : `${item.price} SAR`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .chapter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
