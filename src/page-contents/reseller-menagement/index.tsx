import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import SecondaryLayout from "@/layout/secondaryLayout";
import ResellerList from "@/components/resellerList";

const ReSellerManagementContent: React.FC = () => {
	return (
		<SecondaryLayout>
			<Container maxWidth="xl">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						Gerenciamento Revendedores
					</Typography>
				</Box>
				<Grid sx={{ position: "relative" }}>
					{" "}
					<ResellerList />
				</Grid>
			</Container>
		</SecondaryLayout>
	);
};

export default ReSellerManagementContent;
