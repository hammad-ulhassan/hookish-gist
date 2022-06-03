import { useCallback, useEffect, useState } from "react";
import { getAllPublicGists } from "../../api/gists";
import BtnGrp from "../../components/BtnGrp/BtnGrp";
import Datatable from "../../components/Datatable/Datatable";
import {
  CFEWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";

export default function Homepage() {
  const [view, setView] = useState("table");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const viewChange = useCallback((view) => {
    setView(view);
  }, []);

  useEffect(() => {
    getAllPublicGists(page, pageSize).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [page, pageSize]);

  const onPageChange = useCallback((page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  }, []);

  return (
    <HomePageLayout>
      <CFEWrapper>
        <BtnGrp onViewChange={viewChange} view={view} />
      </CFEWrapper>
      <div>
        {view === "table" ? (
          //memoize this [todo]
          <Datatable
            data={data}
            loading={loading}
            onPageChange={onPageChange}
          />
        ) : (
          <></>
        )}
      </div>
    </HomePageLayout>
  );
}
