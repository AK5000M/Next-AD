import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ChildrenProps } from "@/types";
import { UserModelType } from "@/types";

import {
	SignInURL,
	DashboardURL,
	UserManagementURL,
	UserEditURL,
	ReSellerManagementURL,
	ReSellerEditURL,
} from "@/utils/routes";

const restrictedPages = [
	DashboardURL,
	UserManagementURL,
	UserEditURL,
	ReSellerManagementURL,
	ReSellerEditURL,
];

const restrictedPagesForReSellers = [UserManagementURL, UserEditURL];

export const AuthenticationProvider: React.FC<ChildrenProps> = ({
	children,
}) => {
	const router = useRouter();
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

	// Access user information from Redux store
	const user: UserModelType | any = useSelector(
		(state: RootState) => state.auth.user
	);

	const currentRoute = router.pathname;

	useEffect(() => {
		if (typeof window !== "undefined") {
			let token = null;
			if (window.localStorage) {
				token = localStorage.getItem("token");
			}
			const isRestricted = restrictedPages.includes(currentRoute);

			if (isRestricted) {
				if (!isAuthenticated || token == null) {
					router.push(SignInURL);
				}
			} else {
				if (
					isAuthenticated &&
					(currentRoute === SignInURL || currentRoute === "/")
				) {
					router.push(DashboardURL);
				}
			}
		}
	}, [isAuthenticated, currentRoute, router]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			let token = null;
			if (window.localStorage) {
				token = localStorage.getItem("token");
			}
			if (user && user.role == "reseller") {
				const isRestricted =
					restrictedPagesForReSellers.includes(currentRoute);

				if (!isRestricted && isAuthenticated) {
					router.push(UserManagementURL);
				}
			}
		}
	}, [isAuthenticated, currentRoute, user]);

	return (
		<React.Fragment>
			<div className="authentication">{children}</div>
		</React.Fragment>
	);
};
