/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  images: {
    remotePatterns: ['https://lh3.googleusercontent.com/*'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
};

// Error: Invalid src prop (https://lh3.googleusercontent.com/a/ACg8ocJ4c-Qb1RBFwIA4eZ5VmKnopLoX-bMZMIiStZ4jo4Tm=s96-c) on `next/image`, hostname "lh3.googleusercontent.com" is not configured under images in your `next.config.js`
// See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host