import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SecondaryLayout from "@/layout/secondaryLayout";
import UserPanel from "@/components/userPanel";

import { getUserInformation } from "@/store/actions/userActions";

const UserEditContent: React.FC = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [devices, setDevices] = useState([]);
	const [userInfo, setUserInfo] = useState({});

	useEffect(() => {
		const userId = router?.query?.id;
		if (userId) {
			init(userId);
		}
	}, [router]);

	const init = async (userId: string | string[]) => {
		try {
			setLoading(true);
			const response = await getUserInformation(userId as string);

			if (response?.success) {
				setUserInfo(response?.data.userInfo);
				setDevices(response?.data.devices);
				setLoading(false);
			} else {
				toast.error("Failed to get user", {
					position: "bottom-right",
					style: {
						backgroundColor: "var(--secondaryRedColor)",
						color: "white",
					},
				});
				setLoading(false);
			}
		} catch (error) {
			toast.error("Failed to get user", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
			setLoading(false);
		}
	};

	console.log(devices, userInfo);

	return (
		<SecondaryLayout>
			<Container maxWidth="xl">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						Editar Usuário
					</Typography>
				</Box>
				<Grid>
					<UserPanel
						user={userInfo}
						devices={devices}
						loading={loading}
					/>
				</Grid>
				<ToastContainer />
			</Container>
		</SecondaryLayout>
	);
};

export default UserEditContent;
