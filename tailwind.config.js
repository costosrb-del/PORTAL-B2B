/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#14b866",
                "primary-dark": "#0f8c4d",
                "secondary": "#4e9773",
                "background-light": "#f8fcfa",
                "background-dark": "#112119",
                "card-light": "#ffffff",
                "card-dark": "#1a2e26",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "sans": ["Inter", "sans-serif"] // Overriding default sans to use Inter everywhere
            },
            borderRadius: {
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "2rem",
            },
            animation: {
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }
        },
    },
    plugins: [],
}
