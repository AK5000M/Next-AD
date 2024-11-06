import React, { useEffect, useState } from "react";
import {
	Box,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Grid,
} from "@mui/material";
import {
	Dashboard as DashboardIcon,
	People as PeopleIcon,
} from "@mui/icons-material";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import DevicesOutlinedIcon from "@mui/icons-material/DevicesOutlined";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserModelType } from "@/types";

import {
	DashboardURL,
	UserManagementURL,
	DeviceManagementURL,
	ReSellerManagementURL,
} from "@/utils/routes";

const drawerWidth = 240;

const SideNav: React.FC = () => {
	const router = useRouter();

	// Access user information from Redux store
	const user: UserModelType | any = useSelector(
		(state: RootState) => state.auth.user
	);

	// State to check if the user data is loaded
	const [isUserLoaded, setIsUserLoaded] = useState(false);

	useEffect(() => {
		// Set user loaded to true when the user data is fetched
		if (user) {
			setIsUserLoaded(true);
		}
	}, [user]);

	// Define menu items conditionally based on user role
	const menuItems = [
		user?.role === "admin" && {
			text: "Dashboard",
			icon: <DashboardIcon />,
			path: DashboardURL,
		},
		{
			text: "Gerenciamento Usuários",
			icon: <PeopleIcon />,
			path: UserManagementURL,
		},
		// Only accessible to "admin" users
		user?.role === "admin" && {
			text: "Gerenciamento Dispositivos",
			icon: <DevicesOutlinedIcon />,
			path: DeviceManagementURL,
		},
		user?.role === "admin" && {
			text: "Gerenciamento Revendedores",
			icon: <Diversity3OutlinedIcon />,
			path: ReSellerManagementURL,
		},
	].filter(Boolean); // Removes any undefined values (if user is not admin)

	if (!isUserLoaded) {
		// Return an empty component or loading spinner while user data is being loaded
		return <></>;
	}

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
					{menuItems.map(
						(item) =>
							item && (
								<ListItem
									// button
									key={item.text}
									onClick={() => router.push(item.path)}
									sx={{
										cursor: "pointer",
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
							)
					)}
				</List>
			</Box>
		</Drawer>
	);
};

export default SideNav;
