import { Spin } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GistCard from "../../components/GistCard/GistCard";
import GistMeta from "../../components/GistMeta/GistMeta";
import GistUtils from "../../components/GistUtils/GistUtils";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedGistData, forkGist, starGist } from "../../redux/gistsStore/thunk";
import {
  selectSelectedGist,
  selectAllDataStatus,
  selectedGistAllData,
} from "../../redux/gistsStore/selectors";
import {
  ColFSWrapper,
  CSBWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";
import {
  selectIsLoggedIn,
  selectAuthUserData,
} from "../../redux/credentialStore/selectors";

export const GistPage = () => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const [showPersonalControls, setShowPersonalControls] = useState(false);
  const selectedGist = useSelector(selectSelectedGist);
  const selectedGistAllDataStatus = useSelector(selectAllDataStatus);
  const gistAllData = useSelector(selectedGistAllData);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authUserData = useSelector(selectAuthUserData);

  const editGist = useCallback(() => {
    navigate(`/edit/${gistAllData.id}`);
  }, [navigate, gistAllData]);

  function deleteGist() {

  }

  function onForkGist() {
    dispatch(forkGist(gistAllData.id))
  }

  function onStarGist() {
    dispatch(starGist(gistAllData.id))
  }

  useEffect(() => {
    if (selectedGist) {
      dispatch(fetchSelectedGistData());
    }
  }, [dispatch, selectedGist]);

  useEffect(() => {
    if (selectedGistAllDataStatus !== "succeeded") {
      setLoaded(false);
    } else {
      setLoaded(true);
    }
  }, [selectedGistAllDataStatus]);

  useEffect(() => {
    if (selectedGistAllDataStatus === 'succeeded' && isLoggedIn === true) {
      if (authUserData?.id === gistAllData?.owner?.id) {
        setShowPersonalControls(true);
      }
    }
  }, [gistAllData, selectedGistAllDataStatus, authUserData, isLoggedIn]);

  return (
    <HomePageLayout>
      <CSBWrapper>
        {loaded ? <GistMeta isInTable={false} gist={gistAllData} /> : null}
        {loaded ? (
          <GistUtils
            forks={gistAllData?.forks}
            showPersonalControls={showPersonalControls}
            isLoggedIn={isLoggedIn}
            handleGistEdit={editGist}
            handleGistDelete={deleteGist}
            handleForkGist={onForkGist}
            handleGistStar={onStarGist}
          />
        ) : null}
      </CSBWrapper>
      <ColFSWrapper gap="0.5vh">
        {loaded ? (
          Object.keys(gistAllData?.files)
            .map((fn) => gistAllData?.files[fn])
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
