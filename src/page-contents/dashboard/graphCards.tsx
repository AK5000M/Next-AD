// components/StatsCards.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

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

	const size = {
		width: 600,
		height: 250,
	};

	const data = {
		data: [
			{
				label: "Total de usuários",
				value: totalUsersNumber,
			},
			{
				label: "Usuários Permitidos",
				value: allowedUsersNumber,
			},
			{
				label: "Usuários Pendentes",
				value: pendingUsersNumber,
			},
			{
				label: "Usuários bloqueados",
				value: blockedUsersNumber,
			},
		],
	};

	return (
		<Box
			sx={{
				flex: 1,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "var(--secondaryColor)",
				border: "solid 1px var(--borderColor)",
				borderRadius: "5px",
			}}
		>
			{/* User graph */}

			<PieChart
				series={[
					{
						arcLabel: (item) => `${item.value}`,
						arcLabelMinAngle: 35,
						arcLabelRadius: "50%",
						...data,
					},
				]}
				sx={{
					[`& .${pieArcLabelClasses.root}`]: {
						fontWeight: "bold",
					},
				}}
				{...size}
			/>
		</Box>
	);
};
