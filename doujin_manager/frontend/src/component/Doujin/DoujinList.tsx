import { Button, ButtonGroup, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { Suspense, useEffect, useState } from "react";
import { DoujinAddModal } from "./modal/DoujinAddModal";
import { Loading } from "../Loading/Loading";
import { DoujinDeleteModal } from "./modal/DoujinDeleteModal";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { DoujinType } from "./Doujin.type";

const URL = `${window.location.origin}/api/doujin/doujinshi/list/`;

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Link to={"doujin/" + params.id}>{params.value}</Link>
    ),
  },
  { field: "author", headerName: "Author", width: 150 },
  { field: "circle", headerName: "Circle", width: 150 },
  { field: "origin_language", headerName: "Origin Language", width: 150 },
  { field: "present_language", headerName: "Present Language", width: 150 },
  { field: "buy_way", headerName: "Buy Way", width: 150 },
  { field: "buy_time", headerName: "Buy Time", width: 150 },
  { field: "price", headerName: "Price", width: 150 },
  { field: "price_currency", headerName: "Price Currency", width: 150 },
  { field: "record_time", headerName: "Record Time", width: 150 },
];

type DataGrid = {
  id: number;
  name: string;
  author: string;
  circle: string;
  author_id?: number;
  circle_id?: number;
  origin_language: string;
  present_language: string;
  buy_way?: string;
  buy_time?: string;
  price?: number;
  price_currency?: string;
  record_time?: string;
};

export const DoujinList = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [data, setData] = useState<DataGrid[]>([]);
  const [selectedRow, setSelectedRow] = useState<number[]>([]);

  const fetchData = async () => {
    try {
      const options = {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        redirect: "follow",
      } as RequestInit;

      const response = await fetch(URL, options);
      const result = await response.json();

      setData(
        result.map((o: DoujinType) => ({
          ...o,
          author: o.author?.name,
          circle: o.circle?.name,
        }))
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Doujin List</h1>
      <div style={{ marginBottom: "15px" }}>
        <ButtonGroup variant="outlined">
          <Tooltip title="Create">
            <Button onClick={() => setShowAddModal(true)}>
              <AddIcon></AddIcon>
            </Button>
          </Tooltip>
          {selectedRow.length !== 0 ? (
            <Tooltip title="Delete">
              <Button onClick={() => setShowDeleteModal(true)}>
                <DeleteIcon></DeleteIcon>
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Select rows to delete doujin">
              <Button onClick={() => setShowDeleteModal(true)} disabled>
                <DeleteIcon></DeleteIcon>
              </Button>
            </Tooltip>
          )}
        </ButtonGroup>
      </div>
      <Suspense fallback={<Loading />}>
        <div style={{ maxHeight: "65vh", width: "100%" }}>
          <DataGrid
            autoHeight
            getRowId={(row) => row.id}
            rows={data}
            columns={columns}
            checkboxSelection
            onRowSelectionModelChange={(o) => setSelectedRow(o as number[])}
          />
        </div>
      </Suspense>
      {showAddModal && (
        <DoujinAddModal
          close={() => setShowAddModal(false)}
          refresh={() => fetchData()}
        ></DoujinAddModal>
      )}
      {showDeleteModal && (
        <DoujinDeleteModal
          id_list={selectedRow}
          onClose={() => setShowDeleteModal(false)}
          refresh={() => fetchData()}
        />
      )}
    </div>
  );
};
