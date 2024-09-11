// src/components/TopNav.tsx
import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Avatar,
	Badge,
	Box,
	Popover,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText as MuiListItemText,
	Divider,
	Grid,
} from "@mui/material";
import {
	Menu as MenuIcon,
	Notifications as NotificationsIcon,
	Chat as ChatIcon,
	Logout as LogoutIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";

import { useAppDispatch } from "@/store";
import { logoutUser } from "@/store/actions/authActions";

const TopNav: React.FC = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [notificationsAnchorEl, setNotificationsAnchorEl] =
		useState<HTMLButtonElement | null>(null);
	const handleNotificationsClick = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		setNotificationsAnchorEl(event.currentTarget);
	};
	const handleNotificationsClose = () => {
		setNotificationsAnchorEl(null);
	};
	const openNotifications = Boolean(notificationsAnchorEl);
	const notificationsId = openNotifications
		? "notifications-popover"
		: undefined;

	const [chatAnchorEl, setChatAnchorEl] = useState<HTMLButtonElement | null>(
		null
	);
	const handleChatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setChatAnchorEl(event.currentTarget);
	};
	const handleChatClose = () => {
		setChatAnchorEl(null);
	};
	const openChat = Boolean(chatAnchorEl);
	const chatId = openChat ? "chat-popover" : undefined;

	const handleLogout = (event: React.FormEvent) => {
		event.preventDefault();
		dispatch(logoutUser());
		console.log("Logout clicked");
	};

	return (
		<AppBar
			position="static"
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				backgroundColor: "var(--secondaryColor)",
			}}
		>
			<Toolbar>
				<Box sx={{ flexGrow: 1 }} />{" "}
				{/* Spacing to push icons to the right */}
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton
						color="inherit"
						aria-describedby={notificationsId}
						onClick={handleNotificationsClick}
						sx={{ mr: 2 }}
					>
						<Badge badgeContent={1} color="error">
							<NotificationsIcon
								sx={{ color: "var(--iconColor)" }}
							/>
						</Badge>
					</IconButton>
					<Popover
						id={notificationsId}
						open={openNotifications}
						anchorEl={notificationsAnchorEl}
						onClose={handleNotificationsClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<Box
							sx={{
								p: 2,
								minWidth: 240,
								backgroundColor: "var(--secondaryColor)",
								border: "solid 1px var(--borderColor)",
							}}
						>
							<Typography
								variant="subtitle1"
								gutterBottom
								sx={{ color: "var(--mainTextColor)" }}
							>
								Notifications
							</Typography>
							<List>
								<ListItem
									disablePadding
									sx={{ color: "var(--iconColor)" }}
								>
									<MuiListItemText primary="You have a new notification!" />
								</ListItem>
								{/* Add more notifications as needed */}
							</List>
						</Box>
					</Popover>
					<IconButton
						color="inherit"
						aria-describedby={chatId}
						onClick={handleChatClick}
						sx={{ mr: 2 }}
					>
						<Badge badgeContent={1} color="error">
							<ChatIcon sx={{ color: "var(--iconColor)" }} />
						</Badge>
					</IconButton>
					<Popover
						id={chatId}
						open={openChat}
						anchorEl={chatAnchorEl}
						onClose={handleChatClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "right",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
					>
						<Box
							sx={{
								p: 2,
								minWidth: 240,
								backgroundColor: "var(--secondaryColor)",
								border: "solid 1px var(--borderColor)",
							}}
						>
							<Typography
								variant="subtitle1"
								gutterBottom
								sx={{ color: "var(--mainTextColor)" }}
							>
								Chat
							</Typography>
							<List>
								<List>
									<ListItem
										disablePadding
										sx={{ color: "var(--iconColor)" }}
									>
										<MuiListItemText primary="You have a new message!" />
									</ListItem>
									{/* Add more notifications as needed */}
								</List>
								{/* Add more chat messages as needed */}
							</List>
						</Box>
					</Popover>
					<IconButton
						color="inherit"
						onClick={handleLogout}
						sx={{ mr: 2 }}
					>
						<LogoutIcon sx={{ color: "var(--iconColor)" }} />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default TopNav;
