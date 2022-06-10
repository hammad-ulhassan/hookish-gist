import { notification } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editGist } from "../../api/gists";
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


const EditGist = () => {
  const [description, setDescription] = useState(null);
  const [files, setFiles] = useState([]);
  const formRef = useRef(null);
  const navigate = useNavigate();
  const selectedGistAllDataStatus = useSelector(selectAllDataStatus);
  const gistAllData = useSelector(selectedGistAllData);

  useEffect(() => {
    //add to utility [todo]
    var transformed = { description: null, files: [] };
    transformed.description = gistAllData.description;
    Object.keys(gistAllData.files).forEach((file) =>
      transformed.files.push({
        filename: file,
        content: gistAllData.files[file].content,
      })
    );
    setDescription(transformed.description);
    setFiles(transformed.files);
  }, []);

  const onEditGist = useCallback((values) => {
    let fileContentMap = new Map();
    values.files.forEach((file) =>
      fileContentMap.set(file.filename, { content: file.content })
    );
    const gistPostData = {
      description: values.description,
      public: true,
      files: Object.fromEntries(fileContentMap),
    };
    // editGist(gistPostData).then(e=>{
    //   notification.open({
    //     message:"edited"
    //   })
    // });

    navigate("/home");
  },[navigate]);

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>Edit Gist</h2>
      </CFSWrapper>
      {/* <GistForm
        onHanldeSubmitForm={onEditGist}
        formRef={formRef}
        files={files}
        description={description}
      /> */}
      <GistCreationForm description={description} files={files}/>
    </HomePageLayout>
  );
};

export default EditGist;
