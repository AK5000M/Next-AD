import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SecondaryLayout from "@/layout/secondaryLayout";
import ReSellerPanel from "@/components/resellerPanel";

import { getUserInformation } from "@/store/actions/userActions";

const ReSellerEditContent: React.FC = () => {
	const router = useRouter();

	const [loading, setLoading] = useState(false);
	const [devices, setDevices] = useState([]);
	const [userInfo, setUserInfo] = useState({});
	const [manageUsers, setManageUsers] = useState([]);

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
				setManageUsers(response?.data.manageUsers);
				setLoading(false);
			} else {
				toast.error("Falha ao obter o usuário", {
					position: "bottom-right",
					style: {
						backgroundColor: "var(--secondaryRedColor)",
						color: "white",
					},
				});
				setLoading(false);
			}
		} catch (error) {
			toast.error("Erro do Servidor Interno", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
			setLoading(false);
		}
	};
	console.log({ manageUsers });
	return (
		<SecondaryLayout>
			<Container maxWidth="xl">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						Editar Revendedores
					</Typography>
				</Box>
				<Grid>
					<ReSellerPanel
						user={userInfo}
						loading={loading}
						manageUsers={manageUsers}
					/>
				</Grid>
				<ToastContainer />
			</Container>
		</SecondaryLayout>
	);
};

export default ReSellerEditContent;
