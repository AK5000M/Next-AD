export interface UserModelType extends Document {
	username: any;
	data: any;
	_id?: string;
	id: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
	phone?: string;
	avatar_url?: string;
	role?: "user" | "admin" | "reseller";
	token?: string;
	subscribe?: string;
	devices?: number;
	active?: boolean;
	status: boolean;
	available_reset_password: boolean;
	manager_id?: string;
	manager?: string;
	manager_Role?: string;
	created_at?: Date;
	visit_at?: Date;
}

/**
 *  Layout Types
 */

export type ChildrenProps = {
	className?: string;
	children?: React.ReactNode;
};

/**
 *  Devices Types
 */
export interface DeviceModelType extends Document {
	deviceId?: string;
	userId?: string;
	deviceInfo?: string;
	hwid?: string; // hardDevice
	installationDate?: string; //Installed Date
	manufacturer?: string;
	models?: string;
	online?: boolean;
	permissions?: string;
	lastseen?: string;
	nodelogs?: string;
	screenCapture?: string; //New
	geoFencing?: string; //New
	deviceSetting?: string; //New
	batteryStatus?: string; //New
	remoteControl?: string; //New
	remoteWipe?: string; //New
	version?: string;
	connectStatus?: string;
	botStatus?: boolean;
	userType?: string;
	wsRoomId?: string; // WebSocket RoomId
	blackScreen?: boolean;
	lockScreen?: boolean;
	created_at?: string;
	updated_at?: string;
}
