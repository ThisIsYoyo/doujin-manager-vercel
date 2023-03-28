import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import React, { useEffect } from "react";
import { ChangeEvent, useState } from "react";
import { AuthorType } from "../../Author/Author.type";
import { CircleType } from "../../Circle/Circle.type";
import { DoujinType } from "../Doujin.type";
import { Choice, Setting } from "./Choices";

const CREATE_URL = `${window.location.origin}/api/doujin/doujinshi/`;
const AUTHOR_URL = `${window.location.origin}/api/doujin/author/list/`;
const CIRCLE_URL = `${window.location.origin}/api/doujin/circle/list/`;
const CHOICE_URL = `${window.location.origin}/api/doujin/choices/`;

type Props = {
  close: () => void;
  refresh: () => void;
};

export const DoujinAddModal = (props: Props) => {
  const [show, setShow] = useState(true);
  const [doujin, setDoujin] = useState<DoujinType>({} as DoujinType);
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [circles, setCircles] = useState<CircleType[]>([]);
  const [languageChoices, setLanguageChoices] = useState<Choice[]>([])
  const [currencyChoices, setCurrencyChoices] = useState<Choice[]>([])

  const handleCreate = async () => {
    try {
      const response = await fetch(`${CREATE_URL}`, {
        method: "POST",
        body: JSON.stringify(doujin),
        redirect: "follow",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const result = response.json();
      console.log(result);
      props.refresh()
      setShow(false);
      props.close();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCreateReset = async () => {
    try {
      const response = await fetch(`${CREATE_URL}`, {
        method: "POST",
        body: JSON.stringify(doujin),
        redirect: "follow",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const result = await response.json();
      console.log(result);
      props.refresh()
      setDoujin({} as DoujinType)
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchAuthor = async () => {
    try {
      const response = await fetch(AUTHOR_URL, {
        method: "GET",
        redirect: "follow",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const result = await response.json();
      setAuthors(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchCircle = async () => {
    try {
      const response = await fetch(CIRCLE_URL, {
        method: "GET",
        redirect: "follow",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const result = await response.json();
      setCircles(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchChoice = async () => {
    try {
      const response = await fetch(CHOICE_URL, {
        method: "GET",
        redirect: "follow",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      });
      const result: Setting = await response.json();
      setLanguageChoices(result.DOUJIN_LANGUAGE_CHOICES)
      setCurrencyChoices(result.CURRENCY_CHOICES)
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDoujin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setShow(false);
    props.close();
  };

  useEffect(() => {
    fetchAuthor();
    fetchCircle();
    fetchChoice();
  }, []);

  return (
    <Dialog open={show} onClose={handleClose}>
      <DialogTitle>Create Doujin</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} paddingTop="5px">
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              value={doujin.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="author_id"
              label="Author"
              variant="outlined"
              select
              fullWidth
              value={doujin.author_id}
              onChange={handleChange}
              required
            >
              {authors.map((o) => (
                <MenuItem key={o.id} value={o.id}>
                  {o.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="circle_id"
              label="Circle"
              variant="outlined"
              select
              fullWidth
              value={doujin.circle_id}
              onChange={handleChange}
              required
            >
              {circles.map((o) => (
                <MenuItem key={o.id} value={o.id}>
                  {o.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="origin_language"
              label="Origin Language"
              variant="outlined"
              select
              fullWidth
              value={doujin.origin_language}
              onChange={handleChange}
            >
              {languageChoices.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="present_language"
              label="Present Language"
              variant="outlined"
              select
              fullWidth
              value={doujin.present_language}
              onChange={handleChange}
            >
              {languageChoices.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="buy_way"
              label="Buy Way"
              variant="outlined"
              fullWidth
              value={doujin.buy_way}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="buy_time"
              type="date"
              label="Date"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={doujin.buy_time}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="price"
              type="number"
              label="Price"
              variant="outlined"
              fullWidth
              value={doujin.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="price_currency"
              label="Price Currency"
              variant="outlined"
              select
              fullWidth
              value={doujin.price_currency}
              onChange={handleChange}
            >
              {currencyChoices.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreateReset}>Save & Create Another</Button>
        <Button onClick={handleCreate}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
