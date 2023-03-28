import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from "@mui/material";
  import React from "react";
  import { useState } from "react";
  
  type Props = {
    onClose: () => void;
    id_list: number[];
    refresh: () => void;
  };
  
  const URL = `${window.location.origin}/api/doujin/author/`;
  
  export const AuthorDeleteModal = (props: Props) => {
    const [show, setShow] = useState(true);
  
    const deleteAuthor = async () => {
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
        
        props.refresh()
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const handleClose = () => {
      setShow(false);
      props.onClose();
    };
  
    const handleDelete = () => {
      deleteAuthor();
      setShow(false);
      props.onClose();
    };
  
    return (
      <Dialog open={show} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to <strong>delete</strong> the Author(s) ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    );
  };
  