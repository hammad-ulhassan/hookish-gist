import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GistCreationForm from "../../components/GistCreationForm/GistCreationForm";
import {
  CFSWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";
import {createGist} from '../../redux/gistsStore/thunk';
import {useDispatch} from 'react-redux';
import transformGistFormDataForPost from "../../utils/transformGistFormDataForPost";

const CreateGist = () => {
  const [values, setValues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCreateGist = useCallback((data) => {
    setValues(data);
  }, []);


  useEffect(() => {
    if (Object.keys(values).length !== 0) {
      let gistPostData = transformGistFormDataForPost(values)
      dispatch(createGist(gistPostData));
    navigate("/home");

    }
  }, [dispatch, navigate, values]);

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>Create Gist</h2>
      </CFSWrapper>
      <GistCreationForm onSubmitForm={onCreateGist}/>
    </HomePageLayout>
  );
};

export default CreateGist;
