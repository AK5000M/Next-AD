import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	CircularProgress,
	TablePagination,
	Box,
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
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedData =
		data &&
		data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Box sx={{ width: "100%" }}>
			<TableContainer
				component={Paper}
				sx={{
					backgroundColor: "var(--secondaryColor)",
					border: "solid 1px var(--borderColor)",
					minHeight: "650px",
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
							paginatedData &&
							paginatedData.map((row, rowIndex) => (
								<TableRow key={rowIndex} className="table-tr">
									<TableCell
										sx={{
											color: "var(--mainTextColor)",
											border: "none",
										}}
									>
										{page * rowsPerPage + rowIndex + 1}
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
													{row[column.field] ===
													"allowed"
														? "Permitido"
														: row[column.field] ===
														  "blocked"
														? "Bloqueado"
														: "Pendente"}
												</div>
											) : column.field === "created_at" ||
											  column.field === "license_at" ? (
												// Format the created_at field as dd/mm/yyyy
												new Date(
													row[column.field]
												).toLocaleDateString("en-GB")
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

			<TablePagination
				sx={{ color: "var(--background-end-rgb)" }}
				component="div"
				count={data && data.length}
				page={page}
				onPageChange={handleChangePage}
				rowsPerPage={rowsPerPage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				rowsPerPageOptions={[10, 20, 50]}
			/>
		</Box>
	);
};

export default TableComponent;
