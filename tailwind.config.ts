import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#0052ff',
          secondary: '#648100',
          accent: '#e98700',
          neutral: '#382409',
          'base-100': '#fffef1',
          info: '#009ede',
          success: '#00bc8c',
          warning: '#fca500',
          error: '#ff2261',
        },
      },
    ],
  },
};
export default config;
