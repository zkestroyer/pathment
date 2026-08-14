# 04 Design Handoff and Tokens

## Brand Identity & Vibe
- **Vibe:** Premium, modern, trustworthy, high-end Apple-esque multi-vendor e-commerce.
- **Colors:** Deep blues for trust, vibrant accents for call-to-actions, and an immersive dark mode support.
- **Typography:** `Inter` for unparalleled legibility across responsive breakpoints.

## Tailwind CSS Tokens
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        accent: '#f97316',
        dark: {
          bg: '#0f172a',
          card: '#1e293b',
          text: '#f1f5f9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'premium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out'
      }
    }
  }
}
```

## Micro-Animations & Interactions
- **Buttons:** `hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out`
- **Cards:** `hover:shadow-premium hover:-translate-y-1 transition-all duration-300`
- **Loading:** Use shimmering skeletons for all API fetches. No blank screens.

## Screen Breakpoints
- `sm`: 640px (Mobiles)
- `md`: 768px (Tablets)
- `lg`: 1024px (Laptops)
- `xl`: 1280px (Desktops)

*Note: The frontend implementation MUST strictly utilize these tokens. Do not use generic tailwind classes when a token applies.*
