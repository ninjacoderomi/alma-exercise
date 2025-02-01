"use client";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import { useLeadsStore } from "./store";
import AccountCircle from "@mui/icons-material/Search";
import UpdateIcon from "@mui/icons-material/Update";
import { useTranslations } from "@/providers/translations-provider.client";
import axios from "axios";

const LeadsPage: React.FC = () => {
  const { t } = useTranslations();
  const { getLeads, setNameFilter, setStatusFilter, syncLeads } =
    useLeadsStore();
  const handleStatusUpdate = (
    id: number,
    status: "pending" | "reached_out"
  ) => {
    axios.post(`/api/leads/`, { id, status }).then(() => {
      // Update the store
      syncLeads();
    });
  };
  const cols: GridColDef[] = [
    { field: "id", headerName: "ID", width: 0 }, // Hide the id column
    { field: "name", headerName: "Name", width: 150 },
    { field: "submitted", headerName: "Submitted", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex items-center justify-between">
            {params.value === "pending" ? t("Pending") : t("Reached out")}
            <IconButton
              aria-label="delete"
              title={`Update ${
                params.value === "pending"
                  ? t("to Reached out")
                  : t("back to Pending")
              }`}
              color={params.value === "pending" ? "primary" : "error"}
              onClick={() => {
                handleStatusUpdate(
                  params.row.id,
                  params.value === "pending" ? "reached_out" : "pending"
                );
              }}
            >
              <UpdateIcon />
            </IconButton>
          </div>
        );
      },
    },
    { field: "country", headerName: "Country", width: 150 },
  ];

  const rows = getLeads();
  const paginationModel = { page: 0, pageSize: 5 };
  return (
    <div>
      <h1 className="text-2xl font-bold pb-5">Leads</h1>
      <div className="flex mb-2">
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            className="mr-2"
            onChange={(e) => setNameFilter(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
        <FormControl variant="outlined" className="p-2">
          <Select
            native
            onChange={(e) => setStatusFilter(e.target.value as string)}
            inputProps={{
              name: "status",
              id: "status-native-simple",
            }}
            size="small"
          >
            <option value="">Status</option>
            <option value="pending">Pending</option>
            <option value="reached_out">Reached out</option>
          </Select>
        </FormControl>
      </div>
      <Paper sx={{ height: 400, width: "70vw" }}>
        <DataGrid
          rows={rows}
          columns={cols}
          columnVisibilityModel={{ id: false }}
          initialState={{
            pagination: { paginationModel },
            sorting: { sortModel: [{ field: "id", sort: "desc" }] },
          }}
          pageSizeOptions={[5, 10]}
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default LeadsPage;
