import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = async (
	email: string,
	password: string,
	role: string
) => {
	const response = await axios.post(`${API_BASE_URL}/auth/login`, {
		email,
		password,
		role,
	});

	return response.data;
};
