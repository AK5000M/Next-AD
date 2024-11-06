import {
	fetchUsersList,
	fetchReSellersList,
	getUserInfo,
	updateUserStatus,
	updateIP,
	updateLicense,
	updateExtraDeviceAmount,
	setResetPasswordStatus,
	deleteOneUser,
	NewReSellerAdd,
	setResetReSellerInformation,
} from "@/store/apis/user";
import { UserModelType } from "@/types";

export const fetchUsers = async () => {
	try {
		const data = await fetchUsersList();
		return data;
	} catch (error) {
		console.error("User fetch failed", error);
	}
};

export const fetchReSellers = async () => {
	try {
		const data = await fetchReSellersList();
		return data;
	} catch (error) {
		console.error("ReSellers fetch failed", error);
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

export const newReSellerAdd = async (user: any) => {
	try {
		const data = await NewReSellerAdd(user);
		return data;
	} catch (error) {
		console.error("Add New ReSeller failed", error);
	}
};

export const updateReSellerInfo = async (data: any) => {
	try {
		const res = await setResetReSellerInformation(data);
		return res;
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
