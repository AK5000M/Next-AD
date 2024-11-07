import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchUsersList = async () => {
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
			`${API_BASE_URL}/admin/user/get-all-users`,
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

export const fetchReSellersList = async () => {
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
			`${API_BASE_URL}/admin/user/get-all-resellers`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log("fetchReSellersList error:", error);
	}
};

// Get User Information for Edit
export const getUserInfo = async (userId: string) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.get(`${API_BASE_URL}/user/get/${userId}`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log("fetchUserList error:", error);
	}
};

// Allow User Status
export const updateUserStatus = async (userId: string, type: string) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.put(
			`${API_BASE_URL}/admin/user/status/`,
			{
				userId,
				type,
			},
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

// Update User IP
export const updateIP = async (userId: string, ip: string) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.put(
			`${API_BASE_URL}/admin/user/ip/`,
			{
				userId,
				ip,
			},
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

// Update User License
export const updateLicense = async (userId: string, license: string) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.put(
			`${API_BASE_URL}/admin/user/license/`,
			{
				userId,
				license,
			},
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

// Update User Extra Device
export const updateExtraDeviceAmount = async (
	userId: string,
	extra: number
) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}
		const response = await axios.put(
			`${API_BASE_URL}/admin/user/extra-device/`,
			{
				userId,
				extra,
			},
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

// Set Reset Password
export const setResetPasswordStatus = async (
	userId: string,
	status: boolean
) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}
		console.log(userId, status);
		const response = await axios.put(
			`${API_BASE_URL}/admin/user/allow-reset-password/`,
			{
				userId,
				status,
			},
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

// Add New ReSeller
export const NewReSellerAdd = async (user: any) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.post(
			`${API_BASE_URL}/admin/user/add-reseller/`,
			{
				username: user?.username,
				email: user?.email,
				password: user?.password,
				manager_Id: user?.manager_Id,
				manager_Role: user?.manager_Role,
				manager: user?.manager,
			},
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

// Update ReSeller Data
export const setResetReSellerInformation = async (data: any) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}

		const response = await axios.put(
			`${API_BASE_URL}/admin/user/update-reseller/`,
			{
				userId: data?.userId,
				password: data?.password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.log("update reseller error:", error);
	}
};

// Delete User
export const deleteOneUser = async (userId: string) => {
	try {
		let token;
		if (typeof window !== "undefined" && window.localStorage) {
			// Check if running on the client side
			token = localStorage.getItem("token");
		}
		if (!token) {
			throw new Error("Token not found in local storage");
		}
		const response = await axios.delete(
			`${API_BASE_URL}/user/delete/${userId}`,
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
