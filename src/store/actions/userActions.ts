import {
	fetchUsersList,
	getUserInfo,
	updateUserStatus,
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
