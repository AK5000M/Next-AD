import React from "react";
import { AppBar, Toolbar, IconButton, Button, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Image from "next/image"; // Import Image component from Next.js

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
					<Image
						src="/assets/logos/ghostspy-logo-_2_.webp"
						alt="Logo"
						width={180}
						height={50}
						priority
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
