import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
	Box,
	Button,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
} from "@mui/material";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import TableComponent from "@/sections/DataTable";
import { fetchDevices, deleteDevice } from "@/store/actions/devicesActions";
import { UserModelType, DeviceModelType } from "@/types/index";

const DeviceList: React.FC = () => {
	const router = useRouter();
	const [devices, setDevices] = useState<DeviceModelType[]>([]);
	const [loading, setLoading] = useState(true);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(
		null
	);

	const columns = [
		{ field: "_id", label: "ID" },
		{ field: "deviceId", label: "ID dispositivo" },
		{ field: "manufacturer", label: "Fabricante" },
		{ field: "models", label: "Modelo" },
		{ field: "version", label: "Versão" },
		{ field: "connectStatus", label: "Rede(G)" },
		{ field: "deviceInfo", label: "Informações Dispositivo" },
	];

	useEffect(() => {
		fetchDeviceList();
	}, []);

	const fetchDeviceList = async () => {
		try {
			setLoading(true);
			const response = await fetchDevices();
			setDevices(response);
		} catch (error) {
			toast.error("Failed to fetch devices", {
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

	const onManageDevice = (deviceId: string) => {
		router.push(`/device-management/edit/${deviceId}`);
	};

	const handleOpenDialog = (deviceId: string) => {
		setSelectedDeviceId(deviceId);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedDeviceId(null);
	};

	const handleConfirmDelete = async () => {
		if (selectedDeviceId) {
			await onDeleteDevice(selectedDeviceId);
			setOpenDialog(false);
			setSelectedDeviceId(null);
		}
	};

	const onDeleteDevice = async (deviceId: string) => {
		try {
			await deleteDevice(deviceId);

			fetchDeviceList();
			toast.success("Dispositivo excluído com sucesso.", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryGreenColor)",
					color: "white",
				},
			});
		} catch (error) {
			toast.error("Falha ao excluir o dispositivo.", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
		}
	};

	return (
		<Box sx={{ mt: 4 }}>
			<Typography
				variant="subtitle1"
				sx={{
					color: "var(--iconColor)",
					fontSize: "14px",
				}}
			>
				Total dispositivos: {devices.length}
			</Typography>
			<TableComponent
				columns={columns}
				data={devices}
				loading={loading}
				renderActions={(row) => (
					<Box sx={{ display: "flex", gap: "20px" }}>
						<Tooltip title="Editar Dispositivo">
							<IconButton
								onClick={() => onManageDevice(row._id)}
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
								onClick={() => handleOpenDialog(row.deviceId)}
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
						{"Tem certeza de que deseja excluir este dispositivo?"}
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

export default DeviceList;
