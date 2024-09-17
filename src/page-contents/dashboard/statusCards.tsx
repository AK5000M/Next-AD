// components/StatsCards.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { Person, CheckCircle, Block, Devices } from "@mui/icons-material";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";

interface StatsCardsProps {
	totalUsers: string;
	allowedUsers: string;
	blockedUsers: string;
	totalDevices: string;
	pendingUsers: string;
}

const cardStyles = {
	backgroundColor: "var(--secondaryColor)",
	border: "solid 1px var(--borderColor)",
	display: "flex",
	alignItems: "center",
	padding: "16px",
	marginBottom: "16px",
};

const iconStyles = {
	fontSize: "2.5rem",
	marginRight: "16px",
};

const colorStyles = {
	totalUsers: "var(--secondaryTextColor)",
	allowedUsers: "var(--greenColor)",
	pendingUsers: "var(--pendingColor)",
	blockedUsers: "var(--redColor)",
	totalDevices: "var(--yellowColor)",
};

export const StatsCards: React.FC<StatsCardsProps> = ({
	totalUsers,
	allowedUsers,
	blockedUsers,
	totalDevices,
	pendingUsers,
}) => {
	return (
		<Box
			sx={{
				flex: 1,
			}}
		>
			<Box sx={{ flex: "1 1 calc(50% - 16px)" }}>
				<Box sx={cardStyles}>
					<Person
						sx={{
							...iconStyles,
							color: colorStyles.totalUsers,
						}}
					/>
					<Box>
						<Typography
							variant="h6"
							sx={{ color: "var(--mainTextColor)" }}
						>
							Total de usuários
						</Typography>
						<Typography
							variant="h4"
							sx={{ color: "var(--secondaryTextColor)" }}
						>
							{totalUsers}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "300px" }}>
				<Box sx={cardStyles}>
					<CheckCircle
						sx={{
							...iconStyles,
							color: colorStyles.allowedUsers,
						}}
					/>
					<Box>
						<Typography
							variant="h6"
							sx={{ color: "var(--mainTextColor)" }}
						>
							Usuários Permitidos
						</Typography>
						<Typography
							variant="h4"
							sx={{ color: "var(--greenColor)" }}
						>
							{allowedUsers}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "300px" }}>
				<Box sx={cardStyles}>
					<PendingOutlinedIcon
						sx={{
							...iconStyles,
							color: colorStyles.pendingUsers,
						}}
					/>
					<Box>
						<Typography
							variant="h6"
							sx={{ color: "var(--mainTextColor)" }}
						>
							Usuários Pendentes
						</Typography>
						<Typography
							variant="h4"
							sx={{ color: "var(--pendingColor)" }}
						>
							{pendingUsers}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "300px" }}>
				<Box sx={cardStyles}>
					<Block
						sx={{
							...iconStyles,
							color: colorStyles.blockedUsers,
						}}
					/>
					<Box>
						<Typography
							variant="h6"
							sx={{ color: "var(--mainTextColor)" }}
						>
							Usuários bloqueados
						</Typography>
						<Typography
							variant="h4"
							sx={{ color: "var(--redColor)" }}
						>
							{blockedUsers}
						</Typography>
					</Box>
				</Box>
			</Box>
			<Box sx={{ flex: "1 1 calc(50% - 16px)", minWidth: "300px" }}>
				<Box sx={cardStyles}>
					<Devices
						sx={{
							...iconStyles,
							color: colorStyles.totalDevices,
						}}
					/>
					<Box>
						<Typography
							variant="h6"
							sx={{ color: "var(--mainTextColor)" }}
						>
							Total de dispositivos
						</Typography>
						<Typography
							variant="h4"
							sx={{ color: "var(--yellowColor)" }}
						>
							{totalDevices}
						</Typography>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
