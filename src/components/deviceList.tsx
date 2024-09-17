// UserList.tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TableComponent from "@/sections/DataTable";
import { fetchDevices } from "@/store/actions/devicesActions";
import { UserModelType, DeviceModelType } from "@/types/index";

const DeviceList: React.FC = () => {
	const router = useRouter();
	const [devices, setDevices] = useState<DeviceModelType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchDeviceList();
	}, []);

	const fetchDeviceList = async () => {
		try {
			setLoading(true);
			const response = await fetchDevices();
			setDevices(response);
		} catch (error) {
			console.error("Error fetching devices:", error);
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

	const columns = [
		{ field: "_id", label: "ID" },
		{ field: "deviceId", label: "ID dispositivo" },
		{ field: "manufacturer", label: "Fabricante" },
		{ field: "models", label: "Modelo" },
		{ field: "version", label: "Versão" },
		{ field: "connectStatus", label: "Rede(G)" },
		{ field: "deviceInfo", label: "Informações Dispositivo" },
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
				Total dispositivos: {devices.length}
			</Typography>
			<TableComponent
				columns={columns}
				data={devices}
				loading={loading}
				renderActions={(row) => (
					<Button
						variant="outlined"
						onClick={() => onManageDevice(row._id)}
						startIcon={<EditIcon />}
						sx={{
							fontSize: "12px",
						}}
					>
						Gerenciar
					</Button>
				)}
			/>
			<ToastContainer />
		</Box>
	);
};

export default DeviceList;
