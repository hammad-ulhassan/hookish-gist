import { useCallback, useEffect, useState } from "react";
import BtnGrp from "../../components/BtnGrp/BtnGrp";
import Datatable from "../../components/Datatable/Datatable";
import {
  CFEWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicGists } from "../../redux/gistsStore/thunk";
import {
  selectGistsStatus,
  selectAllGists,
} from "../../redux/gistsStore/selectors";

export default function Homepage() {
  const [view, setView] = useState("table");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const dispatch = useDispatch();
  const gistsStatus = useSelector(selectGistsStatus);
  const allGists = useSelector(selectAllGists);

  const viewChange = useCallback((view) => {
    setView(view);
  }, []);

  useEffect(() => {
    dispatch(fetchPublicGists({ per_page: pageSize, page: page }));
  }, [dispatch, page, pageSize]);

  useEffect(() => {
    if (gistsStatus !== "succeeded") {
      setLoading(true);
    } else {
      setLoading(false);
      setData(allGists);
    }
  }, [allGists, gistsStatus]);

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
