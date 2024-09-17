// pages/DashboardContent.tsx
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Container, Box, Typography } from "@mui/material";
import SecondaryLayout from "@/layout/secondaryLayout";
import { fetchUsers } from "@/store/actions/userActions";
import { fetchDevices } from "@/store/actions/devicesActions";
import { StatsCards } from "./statusCards";
import { GraphCards } from "./graphCards";
import { UserModelType } from "@/types/index";

const DashboardContent: React.FC = () => {
	const [totalDevices, setTotalDevices] = useState<string>("0");
	const [totalUsers, setTotalUsers] = useState<string>("0");
	const [allowedUsers, setAllowedUsers] = useState<string>("0");
	const [pendingUsers, setPendingUsers] = useState<string>("0");
	const [blockedUsers, setBlockedUsers] = useState<string>("0");

	useEffect(() => {
		fetchUserList();
		fetchTotalDevices();
	}, []);

	const fetchUserList = async () => {
		try {
			const response = await fetchUsers();
			calculateUserStats(response);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchTotalDevices = async () => {
		try {
			const response = await fetchDevices();
			setTotalDevices(response?.length);
		} catch (error) {
			console.log(error);
		}
	};

	const calculateUserStats = (userList: any) => {
		const users = userList.data;

		const total = users.length;
		const allowed = users.filter(
			(user: { status: string }) => user.status === "allowed"
		).length;
		const blocked = users.filter(
			(user: { status: string }) => user.status === "blocked"
		).length;
		const pending = users.filter(
			(user: { status: string }) => user.status === "pending"
		).length;

		setTotalUsers(total.toString());
		setAllowedUsers(allowed.toString());
		setBlockedUsers(blocked.toString());
		setPendingUsers(pending.toString());
	};

	return (
		<SecondaryLayout>
			<Container maxWidth="xl">
				<Box sx={{ mt: 3 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ color: "white" }}
					>
						Painel
					</Typography>
					<Box sx={{ display: "flex", gap: "40px" }}>
						<StatsCards
							totalUsers={totalUsers}
							allowedUsers={allowedUsers}
							pendingUsers={pendingUsers}
							blockedUsers={blockedUsers}
							totalDevices={totalDevices}
						/>

						<GraphCards
							totalUsers={totalUsers}
							allowedUsers={allowedUsers}
							pendingUsers={pendingUsers}
							blockedUsers={blockedUsers}
							totalDevices={totalDevices}
						/>
					</Box>
					{/* Stats Cards */}
				</Box>
			</Container>

			<ToastContainer />
		</SecondaryLayout>
	);
};

export default DashboardContent;
