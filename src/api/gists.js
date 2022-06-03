import moment from "moment";
import headers from "../credentials";
// import headers from "../credentials";

export async function getAllPublicGists(page, pageSize) {
  const resp = await fetch(
    "https://api.github.com/gists/public?" +
      new URLSearchParams({ per_page: pageSize, page: page }),
    { headers: headers() }
  );
  let res = await resp.json();
  res = await res.map((gist) => {
    return {
      gist,
      date: moment(gist.created_at).format("DD-MM-YYYY"),
      time: moment(gist.created_at).format("HH:mm"),
      keyword: gist.description,
      notebook: [...Object.keys(gist.files)],
      key: gist.id,
    };
  });

  return res;
}

export const getGist = async (id) => {
  const response = await fetch(`https://api.github.com/gists/${id}`, {
    headers: headers(),
  });
  if (!response.ok) {
    throw new Error("Gist Data coud not be fetched!");
  } else {
    const res = await response.json();
    return res;
  }
};
export const getUserGists = async (login) => {
  const resp = await fetch(`https://api.github.com/users/${login}/gists`, {
    headers: headers(),
  });
  if (!resp.ok) {
    throw new Error("User Gists coud not be fetched!");
  } else {
    let res = await resp.json();
    res = await res.map((gist) => {
      return {
        gist,
        date: moment(gist.created_at).format("DD-MM-YYYY"),
        time: moment(gist.created_at).format("HH:mm"),
        keyword: gist.description,
        notebook: [...Object.keys(gist.files)],
        key: gist.id,
      };
    });
    return res;
  }
};

export const createGist = async (gistPostData) => {
  const resp = await fetch("https://api.github.com/gists", {
    method: "post",
    headers: headers(),
    body: JSON.stringify(gistPostData),
  });
  const res = await resp.json();
  return res;
};

export const editGist = async (gist_id, gistPostData) => {
  const resp = await fetch(`https://api.github.com/gists/${gist_id}`, {
    method: "patch",
    headers: headers(),
    body: JSON.stringify(gistPostData),
  });
  const res = await resp.json();
  return res;
};
