import Router from "next/router";

import { AppDispatch } from "@/store";
import { loginSuccess, logout } from "../reducers/authReducer";
import { loginApi } from "@/store/apis/auth";

import { SignInURL, DashboardURL } from "@/utils/routes";

export const login =
	(email: string, password: string) => async (dispatch: AppDispatch) => {
		try {
			const data = await loginApi(email, password);

			const user = data.data.user;
			const token = data.data.token;

			// Save user and token to localStorage
			if (typeof window !== "undefined" && window.localStorage) {
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("token", token);
			}

			dispatch(loginSuccess({ user, token }));

			// Redirect to the dashboard page
			Router.push(DashboardURL);
		} catch (error) {
			console.error("Login failed", error);
			// Handle login failure (e.g., dispatch an error action, show a notification, etc.)
		}
	};

export const logoutUser = () => (dispatch: AppDispatch) => {
	// Remove user and token from localStorage
	if (typeof window !== "undefined" && window.localStorage) {
		localStorage.clear();
	}
	// localStorage?.removeItem("authState");
	dispatch(logout());

	// Redirect to the login page
	Router.push(SignInURL);
};
