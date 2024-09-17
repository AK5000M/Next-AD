import { fetchDevicesList, getDeviceInfo } from "@/store/apis/device";

export const fetchDevices = async () => {
	try {
		const data = await fetchDevicesList();
		return data;
	} catch (error) {
		console.error("User fetch failed", error);
	}
};

export const getDeviceInformation = async (deviceId: string) => {
	try {
		const data = await getDeviceInfo(deviceId);
		return data;
	} catch (error) {
		console.error("User fetch failed", error);
	}
};
