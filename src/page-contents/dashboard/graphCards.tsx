// components/StatsCards.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";

interface GraphCardsProps {
	totalUsers: string;
	allowedUsers: string;
	blockedUsers: string;
	totalDevices: string;
	pendingUsers: string;
}

const colorStyles = {
	totalUsers: "var(--secondaryTextColor)",
	allowedUsers: "var(--greenColor)",
	pendingUsers: "var(--pendingColor)",
	blockedUsers: "var(--redColor)",
	totalDevices: "var(--yellowColor)",
};

export const GraphCards: React.FC<GraphCardsProps> = ({
	totalUsers,
	allowedUsers,
	blockedUsers,
	totalDevices,
	pendingUsers,
}) => {
	// Convert string values to numbers
	const totalUsersNumber = parseInt(totalUsers, 10);
	const allowedUsersNumber = parseInt(allowedUsers, 10);
	const pendingUsersNumber = parseInt(pendingUsers, 10);
	const blockedUsersNumber = parseInt(blockedUsers, 10);

	const colors = [
		colorStyles.totalUsers,
		colorStyles.allowedUsers,
		colorStyles.pendingUsers,
		colorStyles.blockedUsers,
	];

	return (
		<Box sx={{ flex: 1 }}>
			<Box sx={{ flex: 1 }}>
				{/* User graph */}
				<Stack>
					<BarChart
						className="graph-panel"
						xAxis={[
							{
								scaleType: "band",
								data: [
									"Total de usuários",
									"Usuários permitidos",
									"Usuários pendentes",
									"Usuários bloqueados",
								],
							},
						]}
						series={[
							{
								data: [
									totalUsersNumber,
									allowedUsersNumber,
									pendingUsersNumber,
									blockedUsersNumber,
								],
							},
						]}
						height={400}
					/>
				</Stack>
			</Box>
			<Box sx={{ flex: 1 }}>{/* Device Graphs */}</Box>
		</Box>
	);
};
