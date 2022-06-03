import { Routes, Route } from "react-router-dom";
import { GistPage } from "../pages/GistPage/GistPage";
import Homepage from "../pages/Homepage/Homepage";
import MainLayout from "../pages/MainLayout/MainLayout";
import UserPage from "../pages/UserPage/UserPage";

export const RoutePaths = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="home" element={<Homepage />} />
        <Route path="gist">
          <Route path=":id" element={<GistPage />} />
        </Route>
        <Route path="user">
          <Route path=":login" element={<UserPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
