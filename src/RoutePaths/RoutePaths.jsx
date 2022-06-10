import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CreateGist from "../pages/CreateGist/CreateGist";
import EditGist from "../pages/EditGist/EditGist";
import { GistPage } from "../pages/GistPage/GistPage";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainLayout from "../pages/MainLayout/MainLayout";
import MyProfile from "../pages/MyProfile/MyProfile";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserPage from "../pages/UserPage/UserPage";

export const RoutePaths = () => {
  const [selectedGistAllData, setSelectedGistAllData] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="me" element={<MyProfile />} />
        <Route path="home" element={<Homepage />} />
        <Route path="gist">
          <Route
            path=":id"
            element={
              <GistPage
                selectedGistAllData={selectedGistAllData}
                setSelectedGistAllData={(gistData) =>
                  setSelectedGistAllData(gistData)
                }
              />
            }
          />
        </Route>
        <Route path="user">
          <Route path=":login" element={<UserPage />} />
        </Route>
        <Route path="create" element={<CreateGist />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="edit">
          <Route
            path=":id"
            element={<EditGist/>}
          />
        </Route>
        <Route path="/login" element={<LoginPage/>}/>
      </Route>
    </Routes>
  );
};
