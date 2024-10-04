import React, { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Badge,
	Box,
	Popover,
	List,
	ListItem,
	Typography,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Button,
} from "@mui/material";
import {
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
	const [chatAnchorEl, setChatAnchorEl] = useState<HTMLButtonElement | null>(
		null
	);

	const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

	// Notification handlers
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

	// Chat handlers
	const handleChatClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setChatAnchorEl(event.currentTarget);
	};
	const handleChatClose = () => {
		setChatAnchorEl(null);
	};
	const openChat = Boolean(chatAnchorEl);
	const chatId = openChat ? "chat-popover" : undefined;

	// Logout confirmation dialog handlers
	const handleLogoutClick = () => {
		setOpenLogoutDialog(true);
	};

	const handleLogoutConfirm = () => {
		setOpenLogoutDialog(false);
		dispatch(logoutUser());
		console.log("Logout clicked");
	};

	const handleLogoutCancel = () => {
		setOpenLogoutDialog(false);
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
				<Box sx={{ flexGrow: 1 }} />
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
									<Typography>
										You have a new notification!
									</Typography>
								</ListItem>
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
								<ListItem
									disablePadding
									sx={{ color: "var(--iconColor)" }}
								>
									<Typography>
										You have a new message!
									</Typography>
								</ListItem>
							</List>
						</Box>
					</Popover>

					{/* Logout button with confirmation */}
					<IconButton
						color="inherit"
						onClick={handleLogoutClick}
						sx={{ mr: 2 }}
					>
						<LogoutIcon sx={{ color: "var(--iconColor)" }} />
					</IconButton>

					{/* Confirmation Dialog for Logout */}
					<Dialog
						open={openLogoutDialog}
						onClose={handleLogoutCancel}
						aria-labelledby="logout-dialog-title"
						sx={{
							"& .MuiPaper-root": {
								backgroundColor: "var(--secondaryColor)",
								border: "solid 1px var(--borderColor)",
							},
						}}
					>
						<DialogTitle
							id="logout-dialog-title"
							sx={{ color: "var(--mainTextColor)" }}
						>
							Confirmar Sair
						</DialogTitle>
						<DialogContent>
							<Typography sx={{ color: "var(--iconColor)" }}>
								Tem certeza de que deseja sair?
							</Typography>
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleLogoutCancel}
								sx={{ color: "var(--mainTextColor)", px: 2 }}
							>
								Cancelar
							</Button>
							<Button
								onClick={handleLogoutConfirm}
								sx={{ color: "var(--mainTextColor)", px: 2 }}
								autoFocus
							>
								Sair
							</Button>
						</DialogActions>
					</Dialog>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default TopNav;
