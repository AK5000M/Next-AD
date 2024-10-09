// UserList.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
	Box,
	IconButton,
	Typography,
	Tooltip,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
} from "@mui/material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import TableComponent from "@/sections/DataTable";
import { fetchUsers, deleteUser } from "@/store/actions/userActions";
import { UserModelType } from "@/types/index";

const UserList: React.FC = () => {
	const router = useRouter();
	const [users, setUsers] = useState<UserModelType[]>([]);
	const [loading, setLoading] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

	useEffect(() => {
		fetchUserList();
	}, []);

	const fetchUserList = async () => {
		try {
			setLoading(true);
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
			console.error("Error fetching users:", error);
			toast.error("Failed to fetch users", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
		} finally {
			setLoading(false);
		}
	};

	const onEditUser = (userId: string) => {
		router.push(`/user-management/edit/${userId}`);
	};

	const handleOpenDialog = (userId: string) => {
		setSelectedUserId(userId);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedUserId(null);
	};

	const handleConfirmDelete = async () => {
		if (selectedUserId) {
			await onDeleteUser(selectedUserId);
			setOpenDialog(false);
			setSelectedUserId(null);
		}
	};

	const onDeleteUser = async (userId: string) => {
		try {
			await deleteUser(userId);

			fetchUserList();
			toast.success("Usuário excluído com sucesso.", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryGreenColor)",
					color: "white",
				},
			});
		} catch (error) {
			toast.error("Falha ao excluir o Usuário.", {
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
		{ field: "username", label: "Nome completo" },
		{ field: "email", label: "Email" },
		{ field: "ip", label: "IP" },
		{ field: "role", label: "Função" },
		{ field: "devices", label: "Dispositivos" },
		{ field: "license_duration", label: "Duração da licença(Dias)" },
		{ field: "created_at", label: "Data registro" },
		{ field: "status", label: "Estado" },
	];

	return (
		<Box sx={{ mt: 4 }}>
			<Typography
				variant="subtitle1"
				sx={{
					color: "var(--iconColor)",
					fontSize: "14px",
				}}
			>
				Total de usuários: {users.length}
			</Typography>
			<TableComponent
				columns={columns}
				data={users}
				loading={loading}
				renderActions={(row) => (
					<Box sx={{ display: "flex", gap: "20px" }}>
						<Tooltip title="Editar Usuário">
							<IconButton
								onClick={() => onEditUser(row._id)}
								sx={{
									cursor: "pointer",
									backgroundColor: "var(--blueLightColor)",
									borderRadius: "5px",
									fontSize: "24px",
									color: "var(--secondaryTextColor)",
									"&:hover": {
										color: "var(--mainTextColor)",
										backgroundColor:
											"var(--blueLightColor)",
									},
								}}
							>
								<DriveFileRenameOutlineOutlinedIcon />
							</IconButton>
						</Tooltip>

						<Tooltip title="Excluir Dispositivo">
							<IconButton
								onClick={() => handleOpenDialog(row._id)}
								sx={{
									cursor: "pointer",
									backgroundColor: "var(--redLightColor)",
									borderRadius: "5px",
									fontSize: "24px",
									color: "var(--secondaryTextColor)",
									"&:hover": {
										color: "var(--mainTextColor)",
										backgroundColor: "var(--redLightColor)",
									},
								}}
							>
								<DeleteForeverOutlinedIcon />
							</IconButton>
						</Tooltip>
					</Box>
				)}
			/>

			{/* Confirmation Dialog */}
			<Dialog
				open={openDialog}
				onClose={handleCloseDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				sx={{
					"& .MuiPaper-root": {
						backgroundColor: "var(--secondaryColor)",
						border: "solid 1px var(--borderColor)",
					},
				}}
			>
				<DialogTitle
					id="alert-dialog-title"
					sx={{ color: "var(--mainTextColor)" }}
				>
					{"Confirmar Exclusão"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						sx={{ color: "var(--iconColor)" }}
					>
						{"Tem certeza de que deseja excluir este usuário?"}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						{"Cancelar"}
					</Button>
					<Button
						onClick={handleConfirmDelete}
						sx={{ color: "var(--mainTextColor)", px: 2 }}
					>
						{"Confirmar"}
					</Button>
				</DialogActions>
			</Dialog>

			<ToastContainer />
		</Box>
	);
};

export default UserList;
