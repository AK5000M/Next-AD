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
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

import {
	updateUser,
	updateUserIP,
	updateUserLicense,
} from "@/store/actions/userActions";

import { DeviceManagementURL, UserManagementURL } from "@/utils/routes";
import { formatDate } from "@/utils/common";

type UserPanelProps = {
	device: any;
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

const DevicePanel: React.FC<UserPanelProps> = ({ device }) => {
	const router = useRouter();

	const [ip, setIp] = useState("");
	const [isEditing, setIsEditing] = useState(false);

	const [selectedLicense, setSelectedLicense] = useState("");

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCloseClick = () => {
		setIsEditing(false);
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
			<Grid
				container
				spacing={3}
				sx={{
					flexDirection: { lg: "row", md: "column" },
				}}
			>
				<Grid item xs={12} sm={4}>
					<Typography
						variant="subtitle1"
						sx={{
							color: "var(--iconColor)",
							fontSize: "14px",
						}}
					>
						_id:{" "}
						<span
							style={{
								fontSize: "16px",
								color: "var(--mainTextColor)",
							}}
						>
							{device?._id}
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
						ID dispositivo:{" "}
						<span
							style={{
								fontSize: "16px",
								color: "var(--mainTextColor)",
							}}
						>
							{device?.deviceId}
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
						Modelo:{" "}
						<span
							style={{
								fontSize: "16px",
								color: "var(--mainTextColor)",
							}}
						>
							{device?.models}
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
						Fabricante:{" "}
						<span
							style={{
								fontSize: "16px",
								color: "var(--mainTextColor)",
							}}
						>
							{device?.manufacturer}
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
						Informações Dispositivo:{" "}
						<span
							style={{
								fontSize: "16px",
								color: "var(--mainTextColor)",
							}}
						>
							{device?.deviceInfo}
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
						UserId:{" "}
						<span
							style={{
								fontSize: "16px",
								color: "var(--mainTextColor)",
							}}
						>
							{device?.userId}
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
						{" Rede(G)"}:
						<span
							style={{
								fontSize: "16px",
								color: "var(--mainTextColor)",
							}}
						>
							{device?.connectStatus} G
						</span>
					</Typography>
				</Grid>

				<Grid
					item
					xs={12}
					sx={{
						display: "flex",
						flexDirection: {
							lg: "row",
							md: "column",
						},
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
							mr: 2,
							"&:hover": {
								backgroundColor: "rgb(8 16 40 / 58%)",
							},
						}}
						onClick={() => router.push(DeviceManagementURL)}
					>
						Voltar à página
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default DevicePanel;
