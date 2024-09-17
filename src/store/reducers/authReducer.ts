// src/reducers/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	isAuthenticated: boolean;
	user: {
		id: string;
		name: string;
	} | null;
	token: string | null;
}

// Function to load initial state from localStorage
const loadInitialState = (): AuthState => {
	try {
		let serializedState = null;
		if (typeof window !== "undefined" && window.localStorage) {
			serializedState = localStorage.getItem("authState");
		}
		if (serializedState === null) {
			return {
				isAuthenticated: false,
				user: null,
				token: null,
			};
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.error("Error loading state from localStorage:", err);
		return {
			isAuthenticated: false,
			user: null,
			token: null,
		};
	}
};

// Function to save state to localStorage
const saveState = (state: AuthState) => {
	try {
		const serializedState = JSON.stringify(state);
		if (typeof window !== "undefined" && window.localStorage) {
			localStorage.setItem("authState", serializedState);
		}
	} catch (err) {
		console.error("Error saving state to localStorage:", err);
	}
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginSuccess(
			state,
			action: PayloadAction<{ user: AuthState["user"]; token: string }>
		) {
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;

			// Save state to localStorage upon successful login
			saveState(state);
		},
		logout(state) {
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;

			// Remove state from localStorage upon logout
			if (typeof window !== "undefined" && window.localStorage) {
				localStorage.removeItem("authState");
			}
		},
	},
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
