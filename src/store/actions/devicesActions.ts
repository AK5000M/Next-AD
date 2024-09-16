import { fetchDevicesList } from "@/store/apis/device";

export const fetchDevices = async () => {
	try {
		const data = await fetchDevicesList();
		return data;
	} catch (error) {
		console.error("User fetch failed", error);
	}
};
