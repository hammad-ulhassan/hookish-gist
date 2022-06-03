import GistForm from "../../components/GistForm/GistForm";
import {
  CFSWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";

const CreateGist = () => {
  const onCreateGist = () => {};
  return (
    <HomePageLayout>
      <CFSWrapper>
        <h2>Create Gist</h2>
      </CFSWrapper>
      <GistForm
        onHanldeSubmitForm={onCreateGist}
        // formRef={this.formRef}
        // files={this.state.files}
        // description={this.state.description}
      />
    </HomePageLayout>
  );
};

export default CreateGist;
