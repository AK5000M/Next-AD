import {
	fetchUsersList,
	getUserInfo,
	updateUserStatus,
	updateIP,
	updateLicense,
	updateExtraDeviceAmount,
	setResetPasswordStatus,
	deleteOneUser,
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

export const updateUserExtraDevice = async (userId: string, extra: number) => {
	try {
		const data = await updateExtraDeviceAmount(userId, extra);
		return data;
	} catch (error) {
		console.error("Allow user failed", error);
	}
};

export const setResetPassword = async (userId: string, status: boolean) => {
	try {
		const data = await setResetPasswordStatus(userId, status);
		return data;
	} catch (error) {
		console.error("Allow reset failed", error);
	}
};

export const deleteUser = async (userId: string) => {
	try {
		const data = await deleteOneUser(userId);
		return data;
	} catch (error) {
		console.error("User delete failed", error);
	}
};
