/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors - Slate based
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        // Accent colors - Sky based
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.primary.700'),
            '--tw-prose-headings': theme('colors.primary.900'),
            '--tw-prose-links': theme('colors.accent.600'),
            '--tw-prose-bold': theme('colors.primary.900'),
            '--tw-prose-counters': theme('colors.primary.600'),
            '--tw-prose-bullets': theme('colors.primary.400'),
            '--tw-prose-hr': theme('colors.primary.300'),
            '--tw-prose-quotes': theme('colors.primary.900'),
            '--tw-prose-quote-borders': theme('colors.primary.300'),
            '--tw-prose-captions': theme('colors.primary.500'),
            '--tw-prose-code': theme('colors.primary.900'),
            '--tw-prose-pre-code': theme('colors.primary.100'),
            '--tw-prose-pre-bg': theme('colors.primary.900'),
            '--tw-prose-th-borders': theme('colors.primary.300'),
            '--tw-prose-td-borders': theme('colors.primary.200'),
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.primary.200'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.accent.400'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.primary.400'),
            '--tw-prose-bullets': theme('colors.primary.600'),
            '--tw-prose-hr': theme('colors.primary.700'),
            '--tw-prose-quotes': theme('colors.primary.100'),
            '--tw-prose-quote-borders': theme('colors.primary.700'),
            '--tw-prose-captions': theme('colors.primary.400'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.primary.200'),
            '--tw-prose-pre-bg': theme('colors.primary.900'),
            '--tw-prose-th-borders': theme('colors.primary.600'),
            '--tw-prose-td-borders': theme('colors.primary.700'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}