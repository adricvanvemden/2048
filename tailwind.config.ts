import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#faf8ef',
          secondary: '#bbada0',
          tertiary: '#cac1b5',
        },
        text: {
          primary: '#776e65',
          secondary: '#f9f6f2',
        },
        tile: {
          '2': '#eee4da',
          '4': '#ede0c8',
          '8': '#f2b179',
          '16': '#f59563',
          '32': '#f67c5f',
          '64': '#f65e3b',
          '128': '#edcf72',
          '256': '#edcc61',
          '512': '#edc850',
          '1024': '#edc53f',
          '2048': '#edc22e',
          '4096': '#edc22e',
          '8192': '#edc22e',
        },
      },
    },
  },
  plugins: [],
};
export default config;
