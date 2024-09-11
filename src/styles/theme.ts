import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fff",
		},
		secondary: {
			main: "#1c2536",
		},
		background: {
			default: "rgb(8, 16, 40)",
		},
	},
	typography: {
		h3: {
			fontSize: "2.5rem",
			fontWeight: 700,
		},
		body1: {
			fontSize: "1rem",
		},
	},
});

export default theme;
