import React, { useState } from "react";
import { Box } from "@mui/material";
import Header from "@/layout/header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<Header />
			<Box component="main" sx={{ flex: 1, py: 3 }}>
				{children}
			</Box>
		</Box>
	);
};

export default Layout;
