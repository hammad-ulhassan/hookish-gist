import moment from "moment";
import { useEffect, useState } from "react";

function useAllPublicGists(page) {
  const [isLoading, setIsLoading] = useState(true);
  const [gists, setGists] = useState([]);

  function getHeaders() {
    const reqHeaders = {
      Authorization: "Bearer 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",
      Accept: "application/json",
    };
    const headers = new Headers(reqHeaders);
    return headers;
  }

  useEffect(() => {
    fetch(
      "https://api.github.com/gists/public?" +
        new URLSearchParams({ per_page: 10, page: page }),
      { headers: getHeaders() }
    )
      .then((res) => res.json())
      .then((gists) =>
        gists.map((gist) => ({
          gist,
          date: moment(gist.created_at).format("DD-MM-YYYY"),
          time: moment(gist.created_at).format("HH:mm"),
          keyword: gist.description,
          notebook: [...Object.keys(gist.files)],
          key: gist.id,
        }))
      )
      .then((gists) => {
        setIsLoading(prev => !prev);
        setGists(gists);
      })
      .catch(error=>console.log(error));
  },[page]);

  return [isLoading, gists]
}
export default useAllPublicGists;
