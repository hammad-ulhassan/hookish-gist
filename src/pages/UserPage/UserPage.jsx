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

const UserPage = () => {
  const login = useParams();
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [selectedUserGists, setSelectedUserGists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(login).then((data) => {
      setSelectedUserData(data);
    });
  }, [login]);

  useEffect(() => {
    if (selectedUserData) {
      getUserGists(selectedUserData?.login)
        .then((gists) => {
          setSelectedUserGists(gists);
          setLoading(false);
        })
        .catch((err) => {
          notification.open({
            message: "Error while fetching gists for this user",
          });
        });
    }
  }, [selectedUserData]);

  const navigateToProfile = useCallback(()=> {
    window.open(`https://github.com/${selectedUserData?.login}`);
  },[selectedUserData])

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>User Gists</h2>
      </CFSWrapper>
      <UserProfileWrapper>
        <FCFCWrapper>
          <Avatar size={200} src={selectedUserData?.avatar_url} />
          <TextWordBreak>
            <Typography.Title level={4}>
              {selectedUserData?.name}
            </Typography.Title>
          </TextWordBreak>
          <TextWordBreak>
            <Typography.Title level={5}>
              {selectedUserData?.bio}
            </Typography.Title>
          </TextWordBreak>
          <Button onClick={navigateToProfile}>GitHub Profile</Button>
        </FCFCWrapper>
        <UserProfileGistsList>
          {loading ? (
            <Spin size="large" />
          ) : (
            selectedUserGists.length>0 && selectedUserGists.map((gist, index) => (
              <GistPreview gist={gist.gist} key={index} />
            ))
          )}
        </UserProfileGistsList>
      </UserProfileWrapper>
    </HomePageLayout>
  );
};

export default UserPage;
