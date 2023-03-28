import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
  } from "@mui/material";
  import React, { useState } from "react";
  
  const URL = `${window.location.origin}/api/doujin/circle/`;
  
  type Props = {
    close: () => void;
    refresh: () => void;
  };
  
  export const CircleEditModal = (props: Props) => {
    const [show, setShow] = useState(true);
    const [circle, setCircle] = useState<string>('');
  
    const handleCreateReset = async () => {
      try {
        const response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({
            name: circle,
          }),
          redirect: "follow",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        const result = response.json();
        console.log(result);
        setCircle('');
        props.refresh();
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const handleCreate = async () => {
      try {
        const response = await fetch(URL, {
          method: "POST",
          body: JSON.stringify({
            name: circle,
          }),
          redirect: "follow",
          headers: new Headers({
            Accept: "application/json",
            "Content-Type": "application/json",
          }),
        });
        const result = response.json();
        console.log(result);
        props.refresh();
        setShow(false);
        props.close()
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const handleClose = () => {
      setShow(false);
      props.close();
    };
  
    return (
      <Dialog open={show} onClose={handleClose}>
        <DialogTitle>Create Circle</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={circle}
            onChange={(e) => setCircle(e.target.value)}
            required
            sx={{marginTop: '5px'}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateReset}>Save & Create Another</Button>
          <Button onClick={handleCreate}>Save</Button>
        </DialogActions>
      </Dialog>
    );
  };
  