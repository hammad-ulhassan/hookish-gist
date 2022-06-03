import { notification } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editGist } from "../../api/gists";
import GistForm from "../../components/GistForm/GistForm";
import {
  CFSWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";

const EditGist = ({ selectedGistAllData }) => {
  const [description, setDescription] = useState(null);
  const [files, setFiles] = useState([]);
  const formRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    //add to utility [todo]
    var transformed = { description: null, files: [] };
    transformed.description = selectedGistAllData.description;
    Object.keys(selectedGistAllData.files).forEach((file) =>
      transformed.files.push({
        filename: file,
        content: selectedGistAllData.files[file].content,
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
    editGist(gistPostData).then(e=>{
      notification.open({
        message:"edited"
      })
    });

    navigate("/home");
  },[navigate]);

  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>Edit Gist</h2>
      </CFSWrapper>
      <GistForm
        onHanldeSubmitForm={onEditGist}
        formRef={formRef}
        files={files}
        description={description}
      />
    </HomePageLayout>
  );
};

export default EditGist;
