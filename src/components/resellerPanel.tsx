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
import TableComponent from "@/sections/DataTable";

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

	const columns = [
		{ field: "_id", label: "ID" },
		{ field: "username", label: "Username" },
		{ field: "email", label: "Email" },
		{ field: "devices", label: "Devices" },
		{ field: "license_at", label: "License At" },
		{ field: "license_duration", label: "License Duration" },
		{ field: "extraDevice", label: "Extra Device" },
		{ field: "status", label: "Status" },
	];

	return (
		<Box>
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
				<Box
					sx={{
						display: "flex",
						gap: "20px",
					}}
				>
					<TableComponent
						columns={columns}
						data={manageUsers}
						loading={loading}
					/>

					<Box
						sx={{
							flex: "50%",
							px: 2,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								pb: 2,
								borderBottom: "solid 1px var(--borderColor)",
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
								display: "flex",
								flexDirection: "column",
								justifyContent: "flex-end",
								mt: 2,
							}}
						>
							<Box
								sx={{
									mt: 4,
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
										gap: "20px",
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

							<Box
								sx={{
									mt: 5,
									display: "flex",
									flexDirection: "column",
									gap: 2,
								}}
							>
								<Button
									variant="contained"
									sx={{
										backgroundColor: "var(--greenColor)",
										color: "white",
										px: 3,
										"&:hover": {
											backgroundColor:
												"rgb(17, 173, 100)",
										},
										"&.Mui-disabled": {
											color: "rgb(251 251 251 / 61%)",
											boxShadow: "none",
											backgroundColor:
												"rgb(135 131 131 / 12%)",
										},
									}}
									onClick={() =>
										onUpdateReSellerPassword(user?._id)
									}
								>
									Salvar
								</Button>

								<Button
									variant="contained"
									sx={{
										backgroundColor: "var(--primaryColor)",
										border: "solid 1px var(--borderColor)",
										color: "white",
										px: 3,
										"&:hover": {
											backgroundColor:
												"rgb(8 16 40 / 58%)",
										},
									}}
									onClick={() =>
										router.push(ReSellerManagementURL)
									}
								>
									Retornar
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
			<ToastContainer />
		</Box>
	);
};

export default ReSellerPanel;
