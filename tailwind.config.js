/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		colors: {
			...colors,
			50: '#F0F3FD',
			100: '#E4E9FB',
			200: '#CFD7F6',
			300: '#B1BBF0',
			400: '#9FA5EA',
			500: '#7778DD',
			600: '#645DCE',
			700: '#564DB5',
			800: '#464093',
			900: '#3D3A75',
			950: '#242244'
		},
		extend: {}
	},
	plugins: []
};
