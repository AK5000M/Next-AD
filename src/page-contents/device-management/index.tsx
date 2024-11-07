import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import SecondaryLayout from "@/layout/secondaryLayout";
import DeviceList from "@/components/deviceList";

const DeviceManagementContent: React.FC = () => {
	return (
		<SecondaryLayout>
			<Container className="page-container">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						Gerenciamento Dispositivos
					</Typography>
				</Box>
				<Grid sx={{ position: "relative" }}>
					{" "}
					<DeviceList />
				</Grid>
			</Container>
		</SecondaryLayout>
	);
};

export default DeviceManagementContent;
