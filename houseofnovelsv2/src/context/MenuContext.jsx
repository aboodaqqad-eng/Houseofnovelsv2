import { createContext, useContext } from 'react';
import { categories as staticCategories } from '../data/menu.js';

const STATIC_MENU = staticCategories.map((c) => ({
  slug: c.slug,
  name: c.name,
  background: c.background,
  ink: c.ink,
  is_placeholder: !!c.isPlaceholder,
  chapterLabel: c.chapterLabel || null,
  quote: c.quote || null,
  eyebrow: c.eyebrow || null,
  packages: c.packages || null,
  catering: c.catering || null,
  items: c.items.map((item, idx) => ({
    id: `${c.slug}-${idx}`,
    name: item.name,
    nameAr: item.nameAr || null,
    price: item.price,
    description: item.desc,
    is_placeholder: !!item.placeholder,
    sold_out: !!item.soldOut,
    featured: !!item.featured,
  })),
}));

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  return (
    <MenuContext.Provider value={{ categories: STATIC_MENU, loading: false, error: null }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
