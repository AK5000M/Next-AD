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
} from "@mui/material";
import { updateReSellerInfo } from "@/store/actions/userActions";
import { ReSellerManagementURL } from "@/utils/routes";
import { formatDate } from "@/utils/common";

type UserPanelProps = {
	user: any;
	loading: boolean;
	manageUsers: any;
};

const ReSellerPanel: React.FC<UserPanelProps> = ({
	user,
	loading,
	manageUsers,
}) => {
	const router = useRouter();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordError, setPasswordError] = useState("");

	// Update User Status
	const onUpdateReSellerPassword = async (userId: string) => {
		// Check if passwords match
		if (newPassword !== confirmPassword) {
			setPasswordError("As senhas não correspondem.");
			return;
		}

		try {
			const data = {
				userId,
				password: newPassword,
			};

			const response = await updateReSellerInfo(data);
			if (response.success) {
				toast.success("Revendedor atualizado com sucesso.", {
					position: "bottom-right",
					className: "custom-toast",
					style: {
						backgroundColor: "var(--secondaryGreenColor)",
						color: "white",
					},
					onClose: () => {
						router.push(ReSellerManagementURL);
					},
				});
			} else {
				toast.error("Falha na atualização do revendedor.", {
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
				<Grid
					container
					spacing={3}
					sx={{
						px: "40px",
						flexDirection: { lg: "row", md: "column" },
					}}
				>
					<Grid item xs={12} sm={8}>
						<Box>
							{manageUsers &&
								manageUsers.map(
									(manageUser: any, index: any) => (
										<Box
											key={index}
											sx={{
												display: "flex",
												flexWrap: "wrap",
												gap: "5px",
												mb: 2,
											}}
										>
											<Typography
												variant="subtitle1"
												sx={{
													color: "var(--iconColor)",
													fontSize: "14px",
												}}
											>
												{index + 1}:
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													color: "var(--mainTextColor)",
													fontSize: "14px",
												}}
											>
												{manageUser?._id}
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													color: "var(--mainTextColor)",
													fontSize: "14px",
												}}
											>
												{manageUser?.username}
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													fontSize: "16px",
													color: "var(--mainTextColor)",
												}}
											>
												{manageUser?.email}
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													fontSize: "16px",
													color: "var(--mainTextColor)",
												}}
											>
												{manageUser?.devices}
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													fontSize: "16px",
													color: "var(--mainTextColor)",
												}}
											>
												{manageUser?.license_at}
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													fontSize: "16px",
													color: "var(--mainTextColor)",
												}}
											>
												{manageUser?.license_duration}
												days
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													fontSize: "16px",
													color: "var(--mainTextColor)",
												}}
											>
												{manageUser?.extraDevice}
											</Typography>
											<Typography
												variant="subtitle1"
												sx={{
													px: "15px",
													borderRadius: "20px",
													fontSize: "16px",
													color: "var(--mainTextColor)",
													backgroundColor:
														manageUser?.status ===
														"allowed"
															? "var(--greenLightColor)"
															: manageUser?.status ===
															  "blocked"
															? "var(--redLightColor)"
															: manageUser?.status ===
															  "pending"
															? "var(--pendingColor)"
															: "var(--mainTextColor)",
												}}
											>
												{manageUser?.status}
											</Typography>
										</Box>
									)
								)}
						</Box>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: "30px",
							}}
						>
							<Typography
								variant="subtitle1"
								sx={{
									color: "var(--iconColor)",
									fontSize: "14px",
								}}
							>
								ID usuário:{" "}
								<span
									style={{
										fontSize: "16px",
										color: "var(--mainTextColor)",
									}}
								>
									{user?._id}
								</span>
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{
									color: "var(--iconColor)",
									fontSize: "14px",
								}}
							>
								Nome usuário:{" "}
								<span
									style={{
										fontSize: "16px",
										color: "var(--mainTextColor)",
									}}
								>
									{user?.username}
								</span>
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{
									color: "var(--iconColor)",
									fontSize: "14px",
								}}
							>
								E-mail:{" "}
								<span
									style={{
										fontSize: "16px",
										color: "var(--mainTextColor)",
									}}
								>
									{user?.email}
								</span>
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{
									color: "var(--iconColor)",
									fontSize: "14px",
								}}
							>
								Papel:{" "}
								<span
									style={{
										fontSize: "16px",
										color: "var(--mainTextColor)",
									}}
								>
									{user?.role}
								</span>
							</Typography>
							<Typography
								variant="subtitle1"
								sx={{
									color: "var(--iconColor)",
									fontSize: "14px",
								}}
							>
								Registrado:{" "}
								<span
									style={{
										fontSize: "16px",
										color: "var(--mainTextColor)",
									}}
								>
									{formatDate(user?.created_at)}
								</span>
							</Typography>
						</Box>
						<Box
							sx={{
								mt: 5,
								display: "flex",
								flexDirection: "column",
								gap: "15px",
								width: "100%",
							}}
						>
							<Typography
								variant="subtitle1"
								sx={{
									color: "var(--iconColor)",
									fontSize: "20px",
								}}
							>
								Redefinir senha
							</Typography>

							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									gap: "40px",
								}}
							>
								<TextField
									label="Nova Senha"
									type="text"
									variant="outlined"
									fullWidth
									value={newPassword}
									onChange={(e) => {
										setNewPassword(e.target.value);
										setPasswordError("");
									}}
									InputLabelProps={{
										style: {
											color: "var(--secondaryTextColor)",
										},
									}}
									InputProps={{
										sx: {
											color: "var(--mainTextColor)",
										},
									}}
								/>
								<TextField
									label="Confirme sua senha"
									type="text"
									variant="outlined"
									fullWidth
									value={confirmPassword}
									onChange={(e) => {
										setConfirmPassword(e.target.value);
										setPasswordError("");
									}}
									InputLabelProps={{
										style: {
											color: "var(--secondaryTextColor)",
										},
									}}
									InputProps={{
										sx: {
											color: "var(--mainTextColor)",
										},
									}}
								/>
							</Box>

							{passwordError && (
								<Typography color="error" variant="body2">
									{passwordError}
								</Typography>
							)}
						</Box>
					</Grid>

					<Grid
						item
						xs={12}
						sx={{
							display: "flex",
							flexDirection: { lg: "row", md: "column" },
							justifyContent: "flex-end",
							mt: 15,
							gap: { lg: "0px", md: "10px" },
						}}
					>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "var(--primaryColor)",
								border: "solid 1px var(--borderColor)",
								color: "white",
								px: 3,
								mr: 2,
								"&:hover": {
									backgroundColor: "rgb(8 16 40 / 58%)",
								},
							}}
							onClick={() => router.push(ReSellerManagementURL)}
						>
							Retornar
						</Button>
						<Button
							variant="contained"
							sx={{
								backgroundColor: "var(--greenColor)",
								color: "white",
								px: 3,
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
							onClick={() => onUpdateReSellerPassword(user?._id)}
						>
							Salvar
						</Button>
					</Grid>
				</Grid>
			)}
			<ToastContainer />
		</Box>
	);
};

export default ReSellerPanel;
