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
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useRouter } from "next/router";
import Image from "next/image";

import {
	DashboardURL,
	UserManagementURL,
	DeviceManagementURL,
} from "@/utils/routes";

const drawerWidth = 240;

const SideNav: React.FC = () => {
	const router = useRouter();

	const menuItems = [
		{ text: "Dashboard", icon: <DashboardIcon />, path: DashboardURL },
		{
			text: "Gerenciamento Usuários",
			icon: <PeopleIcon />,
			path: UserManagementURL,
		},
		{
			text: "Gerenciamento Dispositivos",
			icon: <DevicesOutlinedIcon />,
			path: DeviceManagementURL,
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
				<Image
					src="/assets/logos/ghostspy-logo-_2_.webp"
					alt="Logo"
					width={160}
					height={80}
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
									minWidth: "40px",
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
