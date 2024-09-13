import {
	fetchUsersList,
	getUserInfo,
	updateUserStatus,
	updateIP,
	updateLicense,
} from "@/store/apis/user";

export const fetchUsers = async () => {
	try {
		const data = await fetchUsersList();
		return data;
	} catch (error) {
		console.error("User fetch failed", error);
	}
};

export const getUserInformation = async (id: string) => {
	try {
		const data = await getUserInfo(id);
		return data;
	} catch (error) {
		console.error("User fetch failed", error);
	}
};

export const updateUser = async (userId: string, type: string) => {
	try {
		const data = await updateUserStatus(userId, type);
		return data;
	} catch (error) {
		console.error("Allow user failed", error);
	}
};

export const updateUserIP = async (userId: string, ip: string) => {
	try {
		const data = await updateIP(userId, ip);
		return data;
	} catch (error) {
		console.error("Allow user failed", error);
	}
};

export const updateUserLicense = async (userId: string, license: string) => {
	try {
		const data = await updateLicense(userId, license);
		return data;
	} catch (error) {
		console.error("Allow user failed", error);
	}
};
