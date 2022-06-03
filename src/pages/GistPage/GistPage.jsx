import {  Spin } from "antd";
import { useEffect, useMemo, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { getGist } from "../../api/gists";
import GistCard from "../../components/GistCard/GistCard";
import GistMeta from "../../components/GistMeta/GistMeta";
import GistUtils from "../../components/GistUtils/GistUtils";
import {
  ColFSWrapper,
  CSBWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";

export const GistPage = ({ isLoggedIn, authUserData }) => {
  let { id } = useParams();
  const [selectedGistAllData, setSelectedGistAllData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [showPersonalControls, setShowPersonalControls] = useState(false);
  // let location = useLocation();

  function editGist() {
    navigate(`/edit/${selectedGistAllData.id}`);
  }

  function deleteGist() {
    // this.props.deleteGist();
    // if (this.props.gistDeleteStatus === "succeeded") {
    //   this.props.fetchAuthUserGists();
    //   this.props.navigate("/home");
    // }
  }

  function forkGist() {
    // forkGist(selectedGistAllData?.id).then((res) => {
    //   if (res.status === 201) {
    //     notification.open({
    //       message: "Gist Forked",
    //     });
    //   } else {
    //     notification.open({
    //       message: "Some Error Occured",
    //     });
    //   }
    // });
  }

  function starGist() {
    // starGist(selectedGistAllData?.id).then((res) => {
    //   if (res.status === 204) {
    //     notification.open({
    //       message: "Gist Starred",
    //     });
    //   } else {
    //     notification.open({
    //       message: "Some Error Occured",
    //     });
    //   }
    // });
  }

  useEffect(() => {
    getGist(id).then((data) => {
      setSelectedGistAllData(data);
      setLoaded(true);
    });
  }, [id]);

  useMemo(() => {
    if (isLoggedIn === true) {
      if (authUserData?.id === selectedGistAllData?.owner?.id) {
        setShowPersonalControls(true);
      }
    }
  }, [authUserData?.id, isLoggedIn, selectedGistAllData?.owner?.id]);

  return (
    <HomePageLayout>
      <CSBWrapper>
        {loaded ? (
          <GistMeta isInTable={false} gist={selectedGistAllData} />
        ) : null}
        {loaded ? (
          <GistUtils
            forks={selectedGistAllData?.forks}
            showPersonalControls={showPersonalControls}
            isLoggedIn={isLoggedIn}
            handleGistEdit={editGist}
            handleGistDelete={deleteGist}
            handleForkGist={forkGist}
            handleGistStar={starGist}
          />
        ) : null}
      </CSBWrapper>
      <ColFSWrapper gap="0.5vh">
        {loaded ? (
          Object.keys(selectedGistAllData?.files)
            .map((fn) => selectedGistAllData?.files[fn])
            .map((file, index) => (
              <GistCard
                style={{ minWidth: "100%", margin: "1%" }}
                filename={file.filename}
                content={file.content}
                language={file.language}
                key={index}
              />
            ))
        ) : (
          <Spin size="large" />
        )}
      </ColFSWrapper>
    </HomePageLayout>
  );
};
