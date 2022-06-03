import moment from "moment";
import { useEffect, useState } from "react";
import headers from "../credentials";

function useAllPublicGists(page=1) {
  const [isLoading, setIsLoading] = useState(true);
  const [gists, setGists] = useState([]);

  //remove ue, make function [todo]

  useEffect(() => { //wronggggg
    fetch(
      "https://api.github.com/gists/public?" +
        new URLSearchParams({ per_page: 10, page: page }),
      { headers: headers() }
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

//memoize components [todo]
