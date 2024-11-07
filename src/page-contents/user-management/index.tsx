import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import SecondaryLayout from "@/layout/secondaryLayout";
import UserList from "@/components/userList";

const UserManagementContent: React.FC = () => {
	return (
		<SecondaryLayout>
			<Container className="page-container">
				<Box sx={{ mt: 1 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{ textAlign: "start", color: "white" }}
					>
						Gerenciamento de usuários
					</Typography>
				</Box>
				<Grid sx={{ position: "relative" }}>
					{" "}
					<UserList />
				</Grid>
			</Container>
		</SecondaryLayout>
	);
};

export default UserManagementContent;
