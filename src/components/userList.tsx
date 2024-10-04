// UserList.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import TableComponent from "@/sections/DataTable";
import { fetchUsers } from "@/store/actions/userActions";
import { UserModelType } from "@/types/index";

const UserList: React.FC = () => {
	const router = useRouter();
	const [users, setUsers] = useState<UserModelType[]>([]);
	const [loading, setLoading] = useState(true);

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

	const columns = [
		{ field: "_id", label: "ID" },
		{ field: "username", label: "Nome completo" },
		{ field: "email", label: "Email" },
		{ field: "ip", label: "IP" },
		{ field: "role", label: "Função" },
		{ field: "devices", label: "Dispositivos" },
		{ field: "license_duration", label: "Duração da licença(Dias)" },
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
									backgroundColor: "var(--blueLightColor)",
								},
							}}
						>
							<DriveFileRenameOutlineOutlinedIcon />
						</IconButton>
					</Tooltip>
				)}
			/>
			<ToastContainer />
		</Box>
	);
};

export default UserList;
