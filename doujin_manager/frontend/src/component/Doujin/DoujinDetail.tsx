import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DoujinType } from "./Doujin.type";
import { DoujinDeleteModal } from "./modal/DoujinDeleteModal";
import { DoujinEditModal } from "./modal/DoujinEditModal";
import React from "react";

const URL = `${window.location.origin}/api/doujin/doujinshi/`;

export const DoujinDetail = () => {
  const { doujinId } = useParams();
  const [data, setData] = useState<DoujinType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}${doujinId}/`, {
        method: "GET",
        redirect: "follow",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Stack spacing={2}>
        {!!data && (
          <>
            <h1>
              <span className="me-3">{data.name}</span>
              <Tooltip title="Edit">
                <IconButton onClick={() => setShowEditModal(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => setShowDeleteModal(true)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </h1>
            <div>
              <strong>Author: </strong>
              <span>{data.author?.name}</span>
            </div>
            <div>
              <strong>Circle: </strong>
              <span>{data.circle?.name}</span>
            </div>
            <div>
              <strong>Origin Language: </strong>
              <span>{data.origin_language}</span>
            </div>
            <div>
              <strong>Present Language: </strong>
              <span>{data.origin_language}</span>
            </div>
            <div>
              <strong>Buy Way: </strong>
              <span>{data.buy_way}</span>
            </div>
            <div>
              <strong>Date: </strong>
              <span>{data.buy_time}</span>
            </div>
            <div>
              <strong>Price: </strong>
              <span>{data.price}</span>
            </div>
            <div>
              <strong>Price Currency: </strong>
              <span>{data.price_currency}</span>
            </div>
            {showDeleteModal && (
              <DoujinDeleteModal
                id_list={[data.id]}
                onClose={() => setShowDeleteModal(false)}
              />
            )}
            {showEditModal && (
              <DoujinEditModal
                close={() => setShowEditModal(false)}
                data={data}
              />
            )}
          </>
        )}
      </Stack>
      <Button sx={{ marginTop: "20px" }} href="/">
        <ArrowBackRoundedIcon /> Back
      </Button>
    </div>
  );
};
