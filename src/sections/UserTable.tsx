import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
} from "@mui/material";

type Column = {
	field: string;
	label: string;
};

type TableComponentProps = {
	columns: Column[];
	data: any[];
	loading: boolean;
	renderActions?: (row: any, index: number) => React.ReactNode;
};

const getStatusStyles = (status: string) => {
	switch (status) {
		case "pending":
			return {
				color: "var(--yellowColor)",
				backgroundColor: "var(--secondaryYellowColor)",
				borderColor: "var(--yellowColor)",
			};
		case "allowed":
			return {
				color: "var(--greenColor)",
				backgroundColor: "var(--secondaryGreenColor)",
				borderColor: "var(--greenColor)",
			};
		case "blocked":
			return {
				color: "var(--redColor)",
				backgroundColor: "var(--secondaryRedColor)",
				borderColor: "var(--redColor)",
			};
		default:
			return {};
	}
};

const TableComponent: React.FC<TableComponentProps> = ({
	columns,
	data,
	loading,
	renderActions,
}) => {
	return (
		<TableContainer
			component={Paper}
			sx={{
				backgroundColor: "var(--secondaryColor)",
				border: "solid 1px var(--borderColor)",
				minHeight: "350px",
				maxHeight: "650px",
			}}
		>
			<Table sx={{ color: "var(--mainTextColor)" }}>
				<TableHead
					sx={{
						backgroundColor: "var(--primaryColor)",
					}}
				>
					<TableRow>
						<TableCell
							sx={{
								color: "var(--mainTextColor)",
								borderColor: "var(--borderColor)",
								textAlign: "center",
							}}
						>
							#
						</TableCell>
						{columns.map((column, index) => (
							<TableCell
								key={index}
								sx={{
									color: "var(--mainTextColor)",
									borderColor: "var(--borderColor)",
									textAlign: "center",
								}}
							>
								{column.label}
							</TableCell>
						))}
						{renderActions && (
							<TableCell
								sx={{
									color: "var(--mainTextColor)",
									borderColor: "var(--borderColor)",
									textAlign: "center",
								}}
							>
								Ações
							</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{loading ? (
						<TableRow>
							<TableCell
								colSpan={
									columns.length + (renderActions ? 1 : 0)
								}
								sx={{
									color: "var(--mainTextColor)",
									border: "none",
									textAlign: "center",
								}}
							>
								<CircularProgress />
							</TableCell>
						</TableRow>
					) : (
						data.map((row, rowIndex) => (
							<TableRow key={rowIndex}>
								<TableCell
									sx={{
										color: "var(--mainTextColor)",
										border: "none",
									}}
								>
									{rowIndex + 1}
								</TableCell>
								{columns.map((column, colIndex) => (
									<TableCell
										key={colIndex}
										sx={{
											color: "var(--mainTextColor)",
											border: "none",
											textAlign: "center",
										}}
									>
										{column.field === "status" ? (
											<div
												style={{
													borderRadius: "50px",
													padding: "5px 10px",
													...getStatusStyles(
														row[column.field]
													),
												}}
											>
												{row[column.field] == "allowed"
													? "Permitido"
													: row[column.field] ==
													  "blocked"
													? "Bloqueado"
													: "Pendente"}
											</div>
										) : (
											row[column.field]
										)}
									</TableCell>
								))}
								{renderActions && (
									<TableCell
										sx={{
											color: "var(--mainTextColor)",
											border: "none",
										}}
									>
										{renderActions(row, rowIndex)}
									</TableCell>
								)}
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TableComponent;
