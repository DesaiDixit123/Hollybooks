/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                navColor: {
                    400: "#4F5B67",
                },
            },
        },
    },
    plugins: [],
};