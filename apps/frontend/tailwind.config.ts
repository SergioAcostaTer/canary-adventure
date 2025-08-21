import type { Config } from 'tailwindcss'

export default {
  darkMode: [
    'class',
    '[data-theme="dark"]'
  ],
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config