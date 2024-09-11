import React from "react";
import { AppBar, Toolbar, IconButton, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import { SignInURL } from "@/utils/routes";

const Header: React.FC = () => {
	const { t } = useTranslation();
	const router = useRouter();

	const onLoginPage = () => {
		router.push(SignInURL);
	};

	const onClickLogo = () => {
		router.push("/");
	};

	return (
		<Grid position="static">
			<Toolbar sx={{ justifyContent: "space-between" }}>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					onClick={onClickLogo}
				>
					<img
						src="/assets/logos/ghostspy-logo-_2_.webp"
						alt="Logo"
						style={{ width: "180px" }}
					/>
				</IconButton>
				<Button
					onClick={onLoginPage}
					sx={{ color: "var(--mainTextColor)" }}
				>
					Login
				</Button>
			</Toolbar>
		</Grid>
	);
};

export default Header;
