export interface UserModelType extends Document {
	_id?: string;
	id: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
	phone?: string;
	avatar_url?: string;
	role?: "user" | "admin";
	token?: string;
	subscribe?: string;
	devices?: number;
	active?: boolean;
	status: boolean;
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
