import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { useAppDispatch } from "@/store";
import { login } from "@/store/actions/authActions";

import Layout from "@/layout/layout";
import theme from "@/styles/theme";

export const LoginContent: React.FC = () => {
	const { t } = useTranslation();
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const role = "admin";

	const onSubmitLogin = (event: React.FormEvent) => {
		event.preventDefault();

		dispatch(login(email, password, role));
	};

	return (
		<Layout>
			<Container maxWidth="xs">
				<Box sx={{ mt: 8 }}>
					<Typography
						variant="h4"
						gutterBottom
						sx={{
							textAlign: "center",
							color: "var(--mainTextColor)",
						}}
					>
						Login do administrador
					</Typography>
					<Box
						sx={{
							backgroundColor: "var(--secondaryColor)",
							p: 3,
							border: "solid 1px var(--borderColor)",
							borderRadius: "5px",
						}}
					>
						<form onSubmit={onSubmitLogin}>
							<TextField
								variant="outlined"
								label="Email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								fullWidth
								margin="normal"
								required
								InputLabelProps={{
									sx: {
										color: "var(--iconColor)",
									},
								}}
								InputProps={{
									sx: {
										color: "var(--mainTextColor)",
									},
								}}
							/>
							<TextField
								variant="outlined"
								label="Password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								fullWidth
								margin="normal"
								required
								InputLabelProps={{
									sx: {
										color: "var(--iconColor)",
									},
								}}
								InputProps={{
									sx: {
										color: "var(--mainTextColor)",
									},
								}}
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								sx={{
									mt: 3,
									mb: 2,
									color: "white",
									backgroundColor: "var(--redColor)",
									"&:hover": {
										backgroundColor: "var(--redColor)",
									},
								}}
							>
								Login
							</Button>
						</form>
					</Box>
				</Box>
			</Container>
		</Layout>
	);
};
