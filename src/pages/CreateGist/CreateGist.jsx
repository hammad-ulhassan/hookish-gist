import { notification } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGist } from "../../api/gists";
import GistForm from "../../components/GistForm/GistForm";
import {
  CFSWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";

// eslint-disable-next-line no-extend-native
// Object.prototype['isEmpty']=function(){
//     console.log(this);
// }

const CreateGist = () => {
  const [values, setValues] = useState({});
  const navigate = useNavigate();

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

  //   useEffect(() => {
  //     createGist(transformedData).then((e) => {
  //       notification.open({
  //         message: "Gist created",
  //       });
  //     });
  //   }, [transformedData]);

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
      createGist(gistPostData)
        .then((e) => {
          notification.open({
            message: "Gist created",
          });
          navigate('/home')
        })
        .catch((err) => {
          notification.open({
            message: "Some error occured while creating gist",
          });
          navigate('/home')
        });
    }
  }, [navigate, values]);

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>Create Gist</h2>
      </CFSWrapper>
      <GistForm
        onHanldeSubmitForm={onCreateGist}
      />
    </HomePageLayout>
  );
};

export default CreateGist;
