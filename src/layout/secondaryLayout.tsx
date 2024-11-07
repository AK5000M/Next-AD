// src/layout/SecondaryLayout.tsx
import React, { ReactNode } from "react";
import { Box, CssBaseline, Container, Toolbar } from "@mui/material";
import TopNav from "@/components/topNav";
import SideNav from "@/components/sideNav";

interface SecondaryLayoutProps {
	children: ReactNode;
}

const SecondaryLayout: React.FC<SecondaryLayoutProps> = ({ children }) => {
	return (
		<Box sx={{ display: "flex", height: "100vh" }}>
			<CssBaseline />
			<SideNav />
			<Box
				sx={{
					maxWidth: "calc(100% - 240px)",
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
				}}
			>
				<TopNav />
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						p: 3,
					}}
				>
					<Container className="second-layout-container">
						{children}
					</Container>
				</Box>
			</Box>
		</Box>
	);
};

export default SecondaryLayout;
