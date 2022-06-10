import { Avatar, Button, notification, Spin, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserGists } from "../../api/gists";
import { getUser } from "../../api/user";
import GistPreview from "../../components/GistPreview/GistPreview";
import {
  CFSWrapper,
  FCFCWrapper,
  HomePageLayout,
  TextWordBreak,
  UserProfileGistsList,
  UserProfileWrapper,
} from "../../shared/components/styledComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthUserData,
  fetchAuthUserGists,
} from "../../redux/credentialStore/thunk";
import {
  selectAuthUserData,
  selectAuthUserDataStatus,
  selectAuthUserGists,
  selectAuthUserGistsStatus,
} from "../../redux/credentialStore/selectors";

const MyProfile = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userDataStatus = useSelector(selectAuthUserDataStatus);
  const userData = useSelector(selectAuthUserData);
  const authUserGistsStatus = useSelector(selectAuthUserGistsStatus);
  const authUserGists = useSelector(selectAuthUserGists);

  useEffect(() => {
    dispatch(fetchAuthUserData());
    dispatch(fetchAuthUserGists());
  }, [dispatch]);

  // useEffect(() => {
  //   if (userDataStatus !== "succeeded") {
  //     setLoading(true);
  //   } else {
  //     setSelectedUserData(userData);
  //     if (authUserGistsStatus !== "succeeded") {
  //       setLoading(true);
  //     } else {
  //       setLoading(false);
  //       setSelectedUserGists(authUserGists);
  //     }
  //   }
  // }, [authUserGists, authUserGistsStatus, userData, userDataStatus]);

  useEffect(() => {
    if(userDataStatus === "succeeded"){
      setLoading(false)
    }
    if(authUserGistsStatus === "succeeded"){
      setLoading(false)
    }
  }, [userDataStatus, authUserGistsStatus]);

  const navigateToProfile = useCallback(() => {
    window.open(`https://github.com/${userData?.login}`);
  }, [userData]);

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>User Gists</h2>
      </CFSWrapper>
      <UserProfileWrapper>
        <FCFCWrapper>
          <Avatar size={200} src={userData?.avatar_url} />
          <TextWordBreak>
            <Typography.Title level={4}>
              {userData?.name}
            </Typography.Title>
          </TextWordBreak>
          <TextWordBreak>
            <Typography.Title level={5}>
              {userData?.bio}
            </Typography.Title>
          </TextWordBreak>
          <Button onClick={navigateToProfile}>GitHub Profile</Button>
        </FCFCWrapper>
        <UserProfileGistsList>
          {loading ? (
            <Spin size="large" />
          ) : (
            // JSON.stringify(authUserGists)
            authUserGists?.length > 0 &&
            authUserGists?.map((gist, index) => (
              <GistPreview gist={gist} key={index} />
            ))
          )}
        </UserProfileGistsList>
      </UserProfileWrapper>
    </HomePageLayout>
  );
};

export default MyProfile;
