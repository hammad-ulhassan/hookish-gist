import { useEffect, useState } from "react";
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

  const viewChange = (view) => {
    setView(view);
  };

// var location = useLocation();

  useEffect(() => {
    getAllPublicGists(1).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  // useEffect(() => {
    
  // }, [location]);

  return (
    <HomePageLayout>
      <CFEWrapper>
        <BtnGrp onViewChange={viewChange} view={view} />
      </CFEWrapper>
      <div>
        {view === "table" ? (
          <Datatable data={data} loading={loading} />
        ) : (
          <></>
        )}
      </div>
    </HomePageLayout>
  );
}
