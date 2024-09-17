import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDevicesList = async () => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.get(
			`${API_BASE_URL}/admin/device/get-all-devices`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log("fetchUserList error:", error);
	}
};

// Get User Information for Edit
export const getDeviceInfo = async (deviceId: string) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.get(
			`${API_BASE_URL}/device/getInfo/${deviceId}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log({ response });

		return response.data;
	} catch (error) {
		console.log("fetchUserList error:", error);
	}
};
