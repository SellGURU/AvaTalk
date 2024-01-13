/** @type  {import('tailwindcss').Config} */

export  default  {

	content: ["./index.html",  "./src/**/*.{js,ts,jsx,tsx}"],

	theme:  {

		extend:  {

			colors:  {

				"primary-color":  "#6D28D9",

				"secondary-color":  "#253343",

				"placeholder-color":  "#92A7C1",

				"input-color":  "#F5F7FA",

			},
      fontFamily: {
        'poppins' :['Poppins']
      }
		},

	},

	plugins: [],

};
