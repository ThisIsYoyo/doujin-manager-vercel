import { Button, ButtonGroup, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { CircleType } from "./Circle.type";
import { CircleAddModal } from "./modal/CircleAddModal";
import { CircleDeleteModal } from "./modal/CircleDeleteModal";

const URL = `${window.location.origin}/api/doujin/circle/list/`;
const EDIT_URL = `${window.location.origin}/api/doujin/circle/`;

const columns: GridColDef[] = [
  { field: "name", headerName: "Name", width: 150, editable: true },
];

export const Circle = () => {
  const [data, setData] = useState<CircleType[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<number[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        redirect: "follow",
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEdit = async (id: number, name: string | null) => {
    if (!name) {
      fetchData();
      return;
    }

    try {
      const response = await fetch(`${EDIT_URL}${id}/`, {
        method: "PATCH",
        body: JSON.stringify({
          name: name,
        }),
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        redirect: "follow",
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Circle List</h1>
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
            rows={data}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            onCellEditStop={(params, e: any) =>
              handleEdit(params.id as number, e.target.value)
            }
            onRowSelectionModelChange={(o) => setSelectedRow(o as number[])}
          />
        </div>
      </Suspense>
      {showAddModal && (
        <CircleAddModal
          close={() => setShowAddModal(false)}
          refresh={() => fetchData()}
        />
      )}
      {showDeleteModal && (
        <CircleDeleteModal
          id_list={selectedRow}
          onClose={() => setShowDeleteModal(false)}
          refresh={() => fetchData()}
        />
      )}
    </div>
  );
};
