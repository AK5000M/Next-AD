import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { css } from "@emotion/react";
import Layout from "@/layout/layout";
// import Header from "@/layout/header"; // Adjust the import path according to your project structure

const Home = () => {
	const theme = useTheme();

	return (
		<Layout>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
				}}
			>
				<Container maxWidth={false} disableGutters>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography variant="h3" color={"white"}>
							Welcome to GhostSpy
						</Typography>
						<Typography variant="h6" color={"white"}>
							Your New Connection Journey!
						</Typography>
					</Box>
				</Container>
			</Box>
		</Layout>
	);
};

export default Home;
