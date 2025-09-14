/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'Orange': 'hsl(26, 100%, 55%)',

            },
            fontFamily: {
                'Kumbh+Sans': ['Kumbh Sans', 'sans-serif'],
            },
            fontWeight: {
                'normal': '400',
                'bold': '700',
            },
            screens: {
                mobile: '720px',
                desktop: '1440px',
            },
            letterSpacing: {
                extra: '0.2em',
            },
            // backgroundImage: {
            //     'sidebar-desktop': "url('/src/assets/images/bg-sidebar-desktop.svg')",
            //     'sidebar-mobile': "url('/src/assets/images/bg-sidebar-mobile.svg')",
            // }
        },
    },
    plugins: [],
};