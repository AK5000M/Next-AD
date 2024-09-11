import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./reducers/authReducer";

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook to use the AppDispatch type in your components
export const useAppDispatch = () => useDispatch<AppDispatch>();
