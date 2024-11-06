import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SecondaryLayout from "@/layout/secondaryLayout";

import { getDeviceInformation } from "@/store/actions/devicesActions";

import { DeviceModelType } from "@/types/index";
import DevicePanel from "@/components/devicePanel";

const DeviceManageContent: React.FC = () => {
	const router = useRouter();

	const [device, setDevice] = useState<any>([]);

	useEffect(() => {
		const device_Id = router?.query?.id;
		if (device_Id) {
			init(device_Id);
		}
	}, [router]);

	const init = async (device_Id: string | string[]) => {
		try {
			const response = await getDeviceInformation(device_Id as string);

			setDevice(response[0]);
		} catch (error) {
			toast.error("Failed to get device", {
				position: "bottom-right",
				style: {
					backgroundColor: "var(--secondaryRedColor)",
					color: "white",
				},
			});
		}
	};

	return (
		<SecondaryLayout>
			<Container maxWidth="xl">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						Detalhes do dispositivo
					</Typography>
				</Box>
				<Grid>
					{device?.deviceId}
					<DevicePanel device={device} />
					{/* Deivce Detail */}
					{/* <UserPanel
						user={userInfo}
						devices={devices}
						loading={loading}
					/> */}
				</Grid>
				<ToastContainer />
			</Container>
		</SecondaryLayout>
	);
};

export default DeviceManageContent;
