import { useEffect, useState } from "react";

export const useFetch = ({ url }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch(url);

        if (response.status === 200) {
          const rawData = await response.json();
          setData(rawData);
        } else {
          console.error(`Error ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Error ${error}`);
      }
    };

    fetchApi()
  }, [url]);

  return data;
};
