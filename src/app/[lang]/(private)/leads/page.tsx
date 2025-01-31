"use client";
import { Paper } from "@mui/material";
import { PaginationModel, DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";

const LeadsPage: React.FC = () => {
  const cols: GridColDef[] = [
    { field: "id", headerName: "ID", width: 0, hide: true }, // Hide the id column
    { field: "name", headerName: "Name", width: 150 },
    { field: "submitted", headerName: "Submitted", width: 150 },
    { field: "status", headerName: "Status", width: 200 },
    { field: "country", headerName: "Country", width: 150 },
  ];
  const rows = [
    {
      id: 1,
      name: "John Doe",
      submitted: "2021-10-01",
      status: "Pending",
      country: "India",
    },
    {
      id: 2,
      name: "Jorge",
      submitted: "2021-10-02",
      status: "Reached Out",
      country: "Canada",
    },
    {
      id: 3,
      name: "Jane",
      submitted: "2021-10-03",
      status: "Pending",
      country: "Mexico",
    },
    {
      id: 4,
      name: "Jill",
      submitted: "2021-10-04",
      status: "Reached Out",
      country: "China",
    },
  ];
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={cols}
        columnVisibilityModel={{ id: false }}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default LeadsPage;
