import { createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import { selectSelectedGist } from "./selectors";

export const fetchPublicGists = createAsyncThunk(
  "gist/fetchPublicGists",
  async ({ per_page, page }) => {
    console.log("im here");
    const res = await fetch(
      "https://api.github.com/gists/public?" +
        new URLSearchParams({ per_page: per_page, page: page }),
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          Accept: "application/json",
        }),
      }
    );
    const response = await res.json();
    const resp = await response.map((gist) => {
      return {
        gist,
        date: moment(gist.created_at).format("DD-MM-YYYY"),
        time: moment(gist.created_at).format("HH:mm"),
        keyword: gist.description,
        notebook: [...Object.keys(gist.files)],
        key: gist.id,
      };
    });
    return resp;
  }
);

export const fetchSelectedGistData = createAsyncThunk(
  "gist/fetchSelectedGistData",
  async (_, { getState }) => {
    const res = await fetch(
      `https://api.github.com/gists/${selectSelectedGist(getState())?.id}`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          Accept: "application/json",
        }),
      }
    );
    const response = await res.json();
    return response;
  }
);

export const editGist = createAsyncThunk(
  "gist/editGist",
  async (postData, { getState }) => {
    const res = await fetch(
      `https://api.github.com/gists/${selectSelectedGist(getState())?.id}`,
      {
        method: "patch",
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          Accept: "application/json",
        }),
        body: JSON.stringify(postData),
      }
    );
    const response = await res.json();
    return response;
  }
);

//conditional dispatch
//delayed dispatch
//synchronous thunk

export const deleteGist = createAsyncThunk(
  "gist/deleteGist",
  async (_, { getState }) => {
    const res = await fetch(
      `https://api.github.com/gists/${selectSelectedGist(getState())?.id}`,
      {
        method: "delete",
        headers: new Headers({
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
          Accept: "application/json",
        }),
      }
    );
    const response = await res.json();
    return response;
  }
);

export const starGist = createAsyncThunk(
  "gist/starGist",
  async (gistId, { getState }) => {
    const res = await fetch(` https://api.github.com/gists/${gistId}/star`, {
      method: "put",
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        Accept: "application/json",
      }),
    });
    const response = await res.json();
    return response;
  }
);

export const forkGist = createAsyncThunk(
  "gist/forkGist",
  async (gistId, { getState }) => {
    const res = await fetch(` https://api.github.com/gists/${gistId}/star`, {
      method: "put",
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        Accept: "application/json",
      }),
    });
    const response = await res.json();
    return response;
  }
);

export const createGist = createAsyncThunk(
  "gist/createGist",
  async (postData, _) => {
    const res = await fetch(`https://api.github.com/gists`, {
      method: "post",
      headers: new Headers({
        Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        Accept: "application/json",
      }),
      body: JSON.stringify(postData),
    });
    const response = await res.json();
    return response;
  }
);
