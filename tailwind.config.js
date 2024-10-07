/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./apps/angular-task/src/**/*.{html,js,ts}'],
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'retro', 'dracula', 'pastel'],
    },
};
