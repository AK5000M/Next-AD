// UserPanel.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

import {
	Box,
	CircularProgress,
	Typography,
	Grid,
	Button,
	TextField,
	IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import { updateUser, updateUserIP } from "@/store/actions/userActions";

import { UserManagementURL } from "@/utils/routes";

type UserPanelProps = {
	user: any;
	devices: any[];
	loading: boolean;
};

const getStatusStyles = (status: string) => {
	switch (status) {
		case "pending":
			return {
				color: "var(--yellowColor)",
				backgroundColor: "var(--secondaryYellowColor)",
				borderColor: "var(--yellowColor)",
			};
		case "allowed":
			return {
				color: "var(--greenColor)",
				backgroundColor: "var(--secondaryGreenColor)",
				borderColor: "var(--greenColor)",
			};
		case "blocked":
			return {
				color: "var(--redColor)",
				backgroundColor: "var(--secondaryRedColor)",
				borderColor: "var(--redColor)",
			};
		default:
			return {};
	}
};

const UserPanel: React.FC<UserPanelProps> = ({ user, devices, loading }) => {
	const router = useRouter();

	const [ip, setIp] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setIp(user?.ip);
	}, [user]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCloseClick = () => {
		setIsEditing(false);
	};

	// Update User IP
	const handleSaveClick = async (userId: string) => {
		try {
			setIsEditing(false);
			if (ip !== user?.ip) {
				const response = await updateUserIP(userId, ip as string);

				if (response.success) {
					toast.success(
						"O IP do usuário foi atualizado com sucesso.",
						{
							position: "bottom-right",
							className: "custom-toast",
							style: {
								backgroundColor: "var(--secondaryGreenColor)",
								color: "white",
							},
							onClose: () => {
								router.push(UserManagementURL);
							},
						}
					);
				} else {
					toast.error("Falha na atualização do IP do usuário.", {
						position: "bottom-right",
						style: {
							backgroundColor: "var(--secondaryRedColor)",
							color: "white",
						},
					});
				}
			} else {
				setIsEditing(true);
			}
		} catch (error) {
			toast.error("Erro do Servidor Interno", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
		}
	};

	const handleIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;

		// Restrict input to numbers and periods
		value = value.replace(/[^0-9.]/g, "");

		// Prevent more than three dots
		if (value.split(".").length - 1 > 3) return;

		// Automatically apply IP formatting
		const segments = value.split(".").map((segment) => {
			// Restrict each segment to 3 digits
			return segment.substring(0, 3);
		});

		// Join the segments back with dots
		const formattedValue = segments.join(".");

		setIp(formattedValue);
	};

	// Update User Status
	const onUpdateUserStatus = async (userId: string, type: string) => {
		try {
			const response = await updateUser(userId as string, type as string);

			if (response.success) {
				toast.success(
					"O status do usuário foi atualizado com sucesso.",
					{
						position: "bottom-right",
						className: "custom-toast",
						style: {
							backgroundColor: "var(--secondaryGreenColor)",
							color: "white",
						},
						onClose: () => {
							router.push(UserManagementURL);
						},
					}
				);
			} else {
				toast.error("Falha ao atualizar o status do usuário", {
					position: "bottom-right",
					style: {
						backgroundColor: "var(--secondaryRedColor)",
						color: "white",
					},
				});
			}
		} catch (error) {
			toast.error("Erro do Servidor Interno", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
		}
	};

	// Update Extra Device Count
	const UpdateExtraDevice = async (userId: string) => {
		console.log("extra device:", userId);
	};

	return (
		<Box
			sx={{
				mt: 0,
				backgroundColor: "var(--secondaryColor)",
				border: "solid 1px var(--borderColor)",
				p: "40px 20px",
				borderRadius: "5px",
				minHeight: "250px",
			}}
		>
			{loading ? (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "100%",
						minHeight: "250px",
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Grid container spacing={2}>
					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							User ID:{" "}
							<span
								style={{
									fontSize: "16px",
									color: "var(--mainTextColor)",
								}}
							>
								{user?._id}
							</span>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							Nome completo:{" "}
							<span
								style={{
									fontSize: "16px",
									color: "var(--mainTextColor)",
								}}
							>
								{user?.username}
							</span>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							Email:{" "}
							<span
								style={{
									fontSize: "16px",
									color: "var(--mainTextColor)",
								}}
							>
								{user?.email}
							</span>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								gap: "5px",
							}}
						>
							<Typography
								variant="subtitle1"
								sx={{
									color: "var(--iconColor)",
									fontSize: "14px",
								}}
							>
								Login IP:{" "}
							</Typography>
							{isEditing ? (
								<TextField
									value={ip}
									onChange={handleIpChange}
									variant="outlined"
									size="small"
									sx={{
										width: "150px",
										fontSize: "14px",
										color: "var(--mainTextColor)",
									}}
									InputProps={{
										sx: {
											color: "var(--mainTextColor)",
										},
									}}
								/>
							) : (
								<span
									style={{
										fontSize: "16px",
										color: "var(--mainTextColor)",
									}}
								>
									{ip}
								</span>
							)}
							{isEditing ? (
								<Box sx={{ display: "flex", gap: "1px" }}>
									<IconButton
										size="small"
										onClick={() =>
											handleSaveClick(user?._id)
										}
									>
										<SaveIcon
											sx={{
												fontSize: "22px",
												color: " var(--greenColor)",
											}}
										/>
									</IconButton>
									<IconButton
										size="small"
										onClick={handleCloseClick}
									>
										<CloseIcon
											sx={{
												fontSize: "22px",
												color: " var(--redColor)",
											}}
										/>
									</IconButton>
								</Box>
							) : (
								<IconButton
									size="small"
									onClick={handleEditClick}
								>
									<EditIcon
										sx={{
											fontSize: "22px",
											color: " var(--greenColor)",
										}}
									/>
								</IconButton>
							)}
						</Box>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							Função:{" "}
							<span
								style={{
									fontSize: "16px",
									color: "var(--mainTextColor)",
								}}
							>
								{user?.role}
							</span>
						</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							Dispositivos:{" "}
							<span
								style={{
									fontSize: "16px",
									color: "var(--mainTextColor)",
								}}
							>
								{user?.devices}
							</span>
						</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							Extra Device:{" "}
							<span
								style={{
									fontSize: "16px",
									color: "var(--mainTextColor)",
								}}
							>
								{user?.extraDevice}
							</span>
						</Typography>
					</Grid>

					<Grid item xs={12} sm={4}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							Devices:
						</Typography>
						{devices.map((device, index) => (
							<Grid
								key={index}
								sx={{
									display: "flex",
									justifyContent: "flex-start",
									color: "var(--iconColor)",
									gap: "25px",
								}}
							>
								<Typography variant="body2" sx={{ pl: 2 }}>
									{index + 1}.
								</Typography>
								<Typography variant="body2" sx={{ pl: 2 }}>
									{device?.deviceInfo}
								</Typography>
								<Typography variant="body2" sx={{ pl: 2 }}>
									{device?.manufacturer}
								</Typography>
								<Typography variant="body2" sx={{ pl: 2 }}>
									{device?.models}
								</Typography>
								<Typography variant="body2" sx={{ pl: 2 }}>
									Android: {device?.version}
								</Typography>
								<Typography variant="body2" sx={{ pl: 2 }}>
									{device?.connectStatus}G
								</Typography>
								<Typography variant="body2" sx={{ pl: 2 }}>
									{device?.userType}
								</Typography>
							</Grid>
						))}
					</Grid>

					<Grid item xs={12}>
						<Typography
							variant="subtitle1"
							sx={{
								color: "var(--iconColor)",
								fontSize: "14px",
							}}
						>
							Estado:{" "}
							<span
								style={{
									...getStatusStyles(user?.status),
									padding: "4px 12px",
									borderRadius: "50px",
									border: "1px solid",
									fontSize: "16px",
									fontWeight: 100,
									marginLeft: "10px",
								}}
							>
								{user?.status == "allowed"
									? "Permitido"
									: user?.status == "blocked"
									? "Bloqueado"
									: "Pendente"}
							</span>
						</Typography>
					</Grid>

					<Grid
						item
						xs={12}
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							mt: 2,
						}}
					>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "var(--primaryColor)",
								border: "solid 1px var(--borderColor)",
								color: "white",
								mr: 2,
								"&:hover": {
									backgroundColor: "rgb(8 16 40 / 58%)",
								},
							}}
							onClick={() => router.push(UserManagementURL)}
						>
							Voltar à página
						</Button>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "rgb(42 156 253)",
								border: "solid 1px rgb(42 156 253)",
								color: "white",
								mr: 2,
								"&:hover": {
									backgroundColor: "rgb(42 156 253/60%)",
								},
							}}
							onClick={() => UpdateExtraDevice(user?._id)}
						>
							Dispositivos extras
						</Button>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "var(--greenColor)",
								color: "white",
								mr: 2,
								"&:hover": {
									backgroundColor: "rgb(17, 173, 100)",
								},
								"&.Mui-disabled": {
									color: "rgb(251 251 251 / 61%)",
									boxShadow: "none",
									backgroundColor: "rgb(135 131 131 / 12%)",
								},
							}}
							onClick={() =>
								onUpdateUserStatus(user?._id, "allowed")
							}
							disabled={user.status == "allowed" ? true : false}
						>
							Permitir este usuário
						</Button>

						<Button
							variant="contained"
							sx={{
								backgroundColor: "var(--redColor)",
								color: "white",
								"&:hover": {
									backgroundColor: "rgb(220, 78, 88)",
								},
								"&.Mui-disabled": {
									color: "rgb(251 251 251 / 61%)",
									boxShadow: "none",
									backgroundColor: "rgb(135 131 131 / 12%)",
								},
							}}
							disabled={user.status == "blocked" ? true : false}
							onClick={() =>
								onUpdateUserStatus(user?._id, "blocked")
							}
						>
							Bloqueie esse usuário
						</Button>
					</Grid>
				</Grid>
			)}
			<ToastContainer />
		</Box>
	);
};

export default UserPanel;
