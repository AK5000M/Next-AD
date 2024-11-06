import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = async (email: string, password: string) => {
	const response = await axios.post(`${API_BASE_URL}/auth/admin/login`, {
		email,
		password,
	});

	return response.data;
};
