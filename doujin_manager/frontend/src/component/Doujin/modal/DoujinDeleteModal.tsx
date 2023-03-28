import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
  id_list: number[];
  refresh?: () => void;
};

const URL = `${window.location.origin}/api/doujin/doujinshi/`;

export const DoujinDeleteModal = (props: Props) => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  const deleteDoujin = async () => {
    try {
      const idsQuery = "ids=" + props.id_list.join("&ids=");
      const response = await fetch(`${URL}?${idsQuery}`, {
        method: "DELETE",
        redirect: "follow",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const result = await response.json();
      console.log(result);
      
      if (props.refresh) {
        props.refresh()
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    props.onClose();
  };

  const handleDelete = () => {
    deleteDoujin();
    setShow(false);
    props.onClose();
  };

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to <strong>delete</strong> the Doujin(s) ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};
