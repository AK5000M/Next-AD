import React from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import SecondaryLayout from "@/layout//secondaryLayout";

const DashboardContent: React.FC = () => {
	return (
		<SecondaryLayout>
			<Container maxWidth="xl">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						This is Dashboard
					</Typography>
				</Box>
			</Container>
		</SecondaryLayout>
	);
};

export default DashboardContent;
