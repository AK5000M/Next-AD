import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
	Box,
	IconButton,
	Typography,
	Tooltip,
	TextField, // Import TextField for search input
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

import { useSelector } from "react-redux";
import { RootState } from "@/store";

const UserList: React.FC = () => {
	const router = useRouter();

	const admin: UserModelType | any = useSelector(
		(state: RootState) => state.auth.user
	);

	const [users, setUsers] = useState<UserModelType[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserModelType[]>([]); // State for filtered users
	const [loading, setLoading] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input

	useEffect(() => {
		fetchUserList();
	}, []);

	// Fetch users and update both the user and filtered user states
	const fetchUserList = async () => {
		try {
			setLoading(true);
			const response = await fetchUsers();
			if (response.success) {
				setUsers(response.data);
				setFilteredUsers(response.data); // Initialize filteredUsers with the full user list
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

	// Update filtered users based on search query
	useEffect(() => {
		if (searchQuery.trim() === "") {
			setFilteredUsers(users);
		} else {
			const filtered = users.filter(
				(user: any) =>
					user.username
						.toLowerCase()
						.includes(searchQuery.toLowerCase()) ||
					user?.email
						.toLowerCase()
						.includes(searchQuery.toLowerCase())
			);
			setFilteredUsers(filtered);
		}
	}, [searchQuery, users]);

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
		{ field: "username", label: "Nome completo" },
		{ field: "email", label: "Email" },
		{ field: "ip", label: "IP" },
		{ field: "role", label: "Função" },
		{ field: "devices", label: "Dispositivos" },
		{ field: "extraDevice", label: "Contagem Dispositivos Extras" },
		{ field: "license_duration", label: "Duração da licença(Dias)" },
		{ field: "manager_Role", label: "Manager" },
		{ field: "manager", label: "Manager Name" },
		{ field: "created_at", label: "Data registro" },
		{ field: "status", label: "Estado" },
	];

	return (
		<Box sx={{ mt: 4 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-end",
					mb: 1,
				}}
			>
				<Typography
					variant="subtitle1"
					sx={{
						color: "var(--iconColor)",
						fontSize: "14px",
					}}
				>
					Total de usuários: {filteredUsers.length}{" "}
				</Typography>

				{/* Add Search User panel by Email or Username */}
				<TextField
					label="Pesquisar por e-mail ou nome"
					variant="outlined"
					fullWidth
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					InputLabelProps={{
						style: { color: "var(--secondaryTextColor)" },
					}}
					InputProps={{
						sx: {
							color: "var(--mainTextColor)",
						},
					}}
					sx={{
						width: "300px",
						backgroundColor: "var(--secondaryColor)",
						borderRadius: "5px",
						border: "solid 1px var(--borderColor)",
						"& .MuiOutlinedInput-root": {
							"& fieldset": {
								borderColor: "var(--borderColor)",
							},
							"&:hover fieldset": {
								borderColor: "var(--borderColor)",
							},
							"&.Mui-focused fieldset": {
								borderColor: "var(--borderColor)",
							},
						},
					}}
				/>
			</Box>

			<TableComponent
				columns={columns}
				data={filteredUsers} // Use filtered users for the table data
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

						{admin && admin.role == "admin" && (
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
											backgroundColor:
												"var(--redLightColor)",
										},
									}}
								>
									<DeleteForeverOutlinedIcon />
								</IconButton>
							</Tooltip>
						)}
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
