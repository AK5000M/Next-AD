import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
	Box,
	IconButton,
	Tooltip,
	TextField,
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
import {
	fetchReSellers,
	deleteUser,
	newReSellerAdd,
} from "@/store/actions/userActions";

import { UserModelType } from "@/types/index";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ResellerList: React.FC = () => {
	const router = useRouter();
	const [users, setUsers] = useState<UserModelType[]>([]);
	const [filteredUsers, setFilteredUsers] = useState<UserModelType[]>([]); // State for filtered users
	const [loading, setLoading] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);
	const [openAddNew, setOpenAddNew] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	// Access user information from Redux store
	const manager: UserModelType | any = useSelector(
		(state: RootState) => state.auth.user
	);

	useEffect(() => {
		fetchReSellerList();
	}, []);

	// Fetch users and update both the user and filtered user states
	const fetchReSellerList = async () => {
		try {
			setLoading(true);
			const response = await fetchReSellers();
			if (response.success) {
				setUsers(response.data);
				setFilteredUsers(response.data);
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
			const filtered =
				users &&
				users.filter(
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
		router.push(`/reseller-menagement/edit/${userId}`);
	};

	const handleOpenDialog = (userId: string) => {
		setSelectedUserId(userId);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setOpenAddNew(false);
		setSelectedUserId(null);
	};

	const handleConfirmDelete = async () => {
		if (selectedUserId) {
			await onDeleteUser(selectedUserId);
			setOpenDialog(false);
			setSelectedUserId(null);
		}
	};

	// Add New ReSeller
	const openAddNewReSellerDialog = () => {
		setOpenAddNew(true);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const validateForm = () => {
		const newErrors: { [key: string]: string } = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!formData.username) newErrors.username = "Username is required";
		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}
		if (!formData.password) newErrors.password = "Password is required";
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = "Passwords do not match";

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const addNewReSeller = async () => {
		if (!validateForm()) return;
		try {
			setLoading(true);
			const sellerData = {
				...formData,
				manager_Id: manager?._id,
				manager: manager?.username,
			};
			console.log({ sellerData });
			const response = await newReSellerAdd(sellerData);
			if (response.success) {
				setUsers(response.data);
				setFilteredUsers(response.data);
				setOpenAddNew(false);
				toast.success("Novo revendedor adicionado com sucesso.", {
					position: "bottom-right",
					className: "custom-toast",
					style: {
						backgroundColor: "var(--secondaryGreenColor)",
						color: "white",
					},
				});
				fetchReSellerList();
			} else {
				toast.error("O novo revendedor falhou.", {
					position: "bottom-right",
					style: {
						backgroundColor: "var(--secondaryRedColor)",
						color: "white",
					},
				});
			}
		} catch (error) {
			toast.error("O novo revendedor falhou.", {
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

	const onDeleteUser = async (userId: string) => {
		try {
			await deleteUser(userId);

			fetchReSellerList();
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
		{ field: "role", label: "Função" },
		{ field: "manager_Role", label: "Manager" },
		{ field: "created_at", label: "Data registro" },
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
				{/* Add Search ReSellers panel by Email or Username */}
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

				<Button
					variant="contained"
					sx={{
						backgroundColor: "var(--blueColor)",
						border: "solid 1px var(--blueColor)",
						color: "white",
						"&:hover": {
							backgroundColor: "var(--blueColor)",
						},
					}}
					onClick={() => openAddNewReSellerDialog()}
				>
					{" "}
					Adicionar vendedor
				</Button>
			</Box>

			<TableComponent
				columns={columns}
				data={filteredUsers}
				loading={loading}
				renderActions={(row) => (
					<Box
						sx={{
							display: "flex",
							gap: "20px",
							justifyContent: "center",
						}}
					>
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

			{/* Add New ReSeller */}
			<Dialog
				open={openAddNew}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				sx={{
					"& .MuiPaper-root": {
						backgroundColor: "var(--secondaryColor)",
						border: "solid 1px var(--borderColor)",
					},
				}}
				onClose={handleCloseDialog}
			>
				<DialogTitle
					id="alert-dialog-title"
					sx={{ mt: 2, color: "var(--mainTextColor)" }}
				>
					Adicionar novo vendedor
				</DialogTitle>
				<DialogContent>
					<DialogContentText
						id="alert-dialog-description"
						sx={{ color: "var(--iconColor)" }}
					>
						Insira as informações do revendedor.
					</DialogContentText>
					<Box
						sx={{
							mt: 2,
							width: "400px",
							display: "flex",
							flexDirection: "column",
							gap: "20px",
						}}
					>
						<TextField
							label="Nome Usuário"
							name="username"
							value={formData.username}
							onChange={handleChange}
							fullWidth
							margin="dense"
							error={!!errors.username}
							helperText={errors.username}
							InputLabelProps={{
								style: { color: "var(--secondaryTextColor)" },
							}}
							InputProps={{
								sx: {
									color: "var(--mainTextColor)",
								},
							}}
						/>
						<TextField
							label="E-mail"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							fullWidth
							margin="dense"
							error={!!errors.email}
							helperText={errors.email}
							InputLabelProps={{
								style: { color: "var(--secondaryTextColor)" },
							}}
							InputProps={{
								sx: {
									color: "var(--mainTextColor)",
								},
							}}
						/>
						<TextField
							label="Senha"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							fullWidth
							margin="dense"
							error={!!errors.password}
							helperText={errors.password}
							InputLabelProps={{
								style: { color: "var(--secondaryTextColor)" },
							}}
							InputProps={{
								sx: {
									color: "var(--mainTextColor)",
								},
							}}
						/>
						<TextField
							label="Confirme sua senha"
							name="confirmPassword"
							type="password"
							value={formData.confirmPassword}
							onChange={handleChange}
							fullWidth
							margin="dense"
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword}
							InputLabelProps={{
								style: { color: "var(--secondaryTextColor)" },
							}}
							InputProps={{
								sx: {
									color: "var(--mainTextColor)",
								},
							}}
						/>
					</Box>
				</DialogContent>
				<DialogActions sx={{ mb: 2 }}>
					<Button
						onClick={handleCloseDialog}
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
					>
						Cancelar
					</Button>
					<Button
						onClick={addNewReSeller}
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
					>
						Salvar
					</Button>
				</DialogActions>
			</Dialog>

			<ToastContainer />
		</Box>
	);
};

export default ResellerList;
