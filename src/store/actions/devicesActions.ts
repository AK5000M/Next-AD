import {
	fetchDevicesList,
	getDeviceInfo,
	deleteOneDevice,
} from "@/store/apis/device";

export const fetchDevices = async () => {
	try {
		const data = await fetchDevicesList();
		return data;
	} catch (error) {
		console.error("Device fetch failed", error);
	}
};

export const getDeviceInformation = async (deviceId: string) => {
	try {
		const data = await getDeviceInfo(deviceId);
		return data;
	} catch (error) {
		console.error("Device Information fetch failed", error);
	}
};

export const deleteDevice = async (deviceId: string) => {
	try {
		const data = await deleteOneDevice(deviceId);
		return data;
	} catch (error) {
		console.error("Device delete failed", error);
	}
};
