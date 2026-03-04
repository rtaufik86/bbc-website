import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: '#0F1E33', // Original Navy
                    foreground: '#FFFFFF',
                },
                accent: {
                    DEFAULT: '#B08B3E', // Original Gold
                    foreground: '#FFFFFF',
                },
                charcoal: '#333333',
                'bg-paper': '#F9F9F7',
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                popover: {
                    DEFAULT: 'var(--popover)',
                    foreground: 'var(--popover-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                // Keeping existing bbc colors for backward compatibility/safety if used elsewhere
                bbc: {
                    blue: {
                        50: '#F3F6FA',
                        100: '#E5EAF2',
                        200: '#CBD5E1',
                        500: '#2563EB',
                        600: '#1C2E4A',
                        700: '#152538',
                        900: '#0F1E33',
                    },
                    gold: {
                        50: '#FAFAF8',
                        100: '#F3EFE7',
                        200: '#E6DCC9',
                        400: '#D4AF67',
                        500: '#B08B3E',
                        600: '#8F6F2E',
                        700: '#6B5221',
                        800: '#4A3916',
                    }
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
                heading: ['var(--font-poppins)', 'var(--font-playfair)', 'serif'],
                serif: ['var(--font-playfair)', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['var(--font-playfair)', 'serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-animate')
    ]
}
export default config
