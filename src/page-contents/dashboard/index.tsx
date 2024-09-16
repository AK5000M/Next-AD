import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import SecondaryLayout from "@/layout//secondaryLayout";
import { fetchUsers } from "@/store/actions/userActions";
import { fetchDevices } from "@/store/actions/devicesActions";
import { UserModelType } from "@/types/index";

const DashboardContent: React.FC = () => {
	const [users, setUsers] = useState<UserModelType[]>([]);
	console.log({ users });

	useEffect(() => {
		fetchUserList();
		fetchTotalDevices();
	}, []);

	const fetchUserList = async () => {
		try {
			const response = await fetchUsers();
			if (response.success) {
				setUsers(response.data);
			} else {
				toast.error("Failed to fetch users", {
					position: "bottom-right",
					style: {
						backgroundColor: "var(--secondaryRedColor)",
						color: "white",
					},
				});
			}
		} catch (error) {
			toast.error("Failed to fetch users", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
		}
	};

	const fetchTotalDevices = async () => {
		try {
			const response = await fetchDevices();
			console.log({ response });
		} catch (error) {
			toast.error("Failed to fetch devices", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
		}
	};

	return (
		<SecondaryLayout>
			<Container maxWidth="xl">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						This is Dashboard
					</Typography>
				</Box>
			</Container>
		</SecondaryLayout>
	);
};

export default DashboardContent;
