// src/components/SideNav.tsx
import React from "react";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Grid,
} from "@mui/material";
import {
	Dashboard as DashboardIcon,
	People as PeopleIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";

import { DashboardURL, UserManagementURL } from "@/utils/routes";

const drawerWidth = 240;

const SideNav: React.FC = () => {
	const router = useRouter();

	const menuItems = [
		{ text: "Dashboard", icon: <DashboardIcon />, path: DashboardURL },
		{
			text: "Gerenciamento de usuários",
			icon: <PeopleIcon />,
			path: UserManagementURL,
		},
		// Add more menu items as needed
	];

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
					backgroundColor: "var(--secondaryColor)",
					borderRight: "solid 1px var(--borderColor)",
				},
			}}
			variant="permanent"
		>
			<Grid
				item
				sx={{
					display: {
						xs: "none",
						md: "flex",
						justifyContent: "center",
					},
					p: 2,
				}}
			>
				<img
					src="/assets/logos/ghostspy-logo-_2_.webp"
					alt="Logo"
					style={{ width: "160px" }}
				/>
			</Grid>
			<Box sx={{ overflow: "auto" }}>
				<List>
					{menuItems.map((item) => (
						<ListItem
							button
							key={item.text}
							onClick={() => router.push(item.path)}
							sx={{
								color: "var(--iconColor)",
							}}
						>
							<ListItemIcon
								sx={{
									color: "var(--iconColor)",
								}}
							>
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
};

export default SideNav;
