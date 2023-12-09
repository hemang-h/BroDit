import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "bg": "var(--bg)",
        "fg": "var(--fg)",
        "border": "var(--border)",
        "invalid": "var(--invalid)",
        "disabled": "var(--disabled)",
      }
    },
  },
  plugins: [],
}
export default config