/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'Purple-600': 'hsl(238, 40%, 52%)',
                'Pink-400': 'hsl(358, 79%, 66%)',
                'Purple-200': 'hsl(239, 57%, 85%)',
                'Pink-200': 'hsl(357, 100%, 86%)',
                'Grey-800': 'hsl(212, 24%, 26%)',
                'Grey-500': 'hsl(211, 10%, 45%)',
                'Grey-100': 'hsl(223, 19%, 93%)',
                'Grey-50': 'hsl(228, 33%, 97%)',
                'White': 'hsl(0, 100%, 100%)',

            },
            fontFamily: {
                'Rubik': ['Rubik', 'sans-serif'],
            },
            fontWeight: {
                'normal': '400',
                'semibold': '500',
                'bold': '700',
            },
            screens: {
                mobile: '375px',
                desktop: '1440px',
            },
            // letterSpacing: {
            //     extra: '0.2em',
            // },
            flexShrink: {
                1: '1',
                2: '2',
                3: '3',
            }
            // backgroundImage: {
            //     'sidebar-desktop': "url('/src/assets/images/bg-sidebar-desktop.svg')",
            //     'sidebar-mobile': "url('/src/assets/images/bg-sidebar-mobile.svg')",
            // }
        },
    },
    plugins: [],
};