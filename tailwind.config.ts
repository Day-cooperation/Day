import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#3CB643',
        },
      },
      animation: {
        'infinite-scroll-1': 'infinite-scroll-1 35s linear infinite',
        'infinite-scroll-2': 'infinite-scroll-2 35s linear infinite',
        'infinite-scroll-3': 'infinite-scroll-1 40s linear infinite',
        'infinite-scroll-4': 'infinite-scroll-2 40s linear infinite',
        'md-infinite-scroll-1': 'md-infinite-scroll-1 35s linear infinite',
        'md-infinite-scroll-2': 'md-infinite-scroll-2 35s linear infinite',
        'md-infinite-scroll-3': 'md-infinite-scroll-1 40s linear infinite',
        'md-infinite-scroll-4': 'md-infinite-scroll-2 40s linear infinite',
      },
      keyframes: {
        'md-infinite-scroll-1': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 2.5rem)) ' },
        },
        'infinite-scroll-1': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 16px)) ' },
        },
        'md-infinite-scroll-2': {
          '0%': { transform: 'translateX(calc(100% + 2.5rem))' },
          '100%': { transform: 'translateX(0)' },
        },
        'infinite-scroll-2': {
          '0%': { transform: 'translateX(calc(100% + 16px))' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      zIndex: {
        '100': '100',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
