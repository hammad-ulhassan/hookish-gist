import { notification } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import GistCreationForm from "../../components/GistCreationForm/GistCreationForm";
import {
  CFSWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";
import {createGist} from '../../redux/gistsStore/thunk';
import {useDispatch} from 'react-redux';

// eslint-disable-next-line no-extend-native
// Object.prototype['isEmpty']=function(){
//     console.log(this);
// }

const CreateGist = () => {
  const [values, setValues] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //   const transformedData = useMemo(() => {
  //     let fileContentMap = new Map();
  //     values?.files?.forEach((file) =>
  //       fileContentMap.set(file.filename, { content: file.content })
  //     );
  //     const gistPostData = {
  //       description: values?.description,
  //       public: true,
  //       files: Object.fromEntries(fileContentMap),
  //     };
  //     console.log(gistPostData);
  //     return gistPostData;
  //   }, [values]);

  const onCreateGist = useCallback((data) => {
    setValues(data);
  }, []);


  useEffect(() => {
    if (Object.keys(values).length !== 0) {
      let fileContentMap = new Map();
      values?.files?.forEach((file) =>
        fileContentMap.set(file.filename, { content: file.content })
      );
      const gistPostData = {
        description: values?.description,
        public: true,
        files: Object.fromEntries(fileContentMap),
      };
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
