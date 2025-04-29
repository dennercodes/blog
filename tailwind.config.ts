import type { Config } from 'tailwindcss'
import { theme } from './src/styles/theme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: theme.colors.background,
        card: theme.colors.card,
        header: theme.colors.header,
        border: theme.colors.border,
        text: theme.colors.text,
        link: theme.colors.link,
        button: theme.colors.button,
        support: theme.colors.support,
        accent: theme.colors.accent,
      },
    },
  },
  plugins: [],
}

export default config 