import { notification } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import GistCreationForm from "../../components/GistCreationForm/GistCreationForm";
import GistForm from "../../components/GistForm/GistForm";
import {
  CFSWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";
import {
  selectSelectedGist,
  selectAllDataStatus,
  selectedGistAllData,
} from "../../redux/gistsStore/selectors";
import { useSelector, useDispatch } from "react-redux";
import { editGist } from "../../redux/gistsStore/thunk";
import transformGistForEdit from "../../utils/transformGistForEdit";
import transformGistFormDataForPost from "../../utils/transformGistFormDataForPost";

const EditGist = () => {
  const [description, setDescription] = useState(null);
  const [files, setFiles] = useState([]);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const selectedGistAllDataStatus = useSelector(selectAllDataStatus);
  const gistAllData = useSelector(selectedGistAllData);
  const dispatch = useDispatch();

  useEffect(() => {
    let transformed = transformGistForEdit(gistAllData);
    setDescription(transformed.description);
    setFiles(transformed.files);
  }, []);

  const onEditGist = useCallback(
    (values) => {
      var gistPostData = transformGistFormDataForPost(values);
      dispatch(editGist(gistPostData));

      navigate("/home");
    },
    [dispatch, navigate]
  );

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>Edit Gist</h2>
      </CFSWrapper>
      <GistCreationForm
        description={description}
        files={files}
        onSubmitForm={onEditGist}
      />
    </HomePageLayout>
  );
};

export default EditGist;
