import { Button } from "antd";
import {
    StarOutlined,
    ForkOutlined,
    DeleteOutlined,
    EditOutlined,
  } from "@ant-design/icons";
import {
  CSBWrapper,
  NumberDisplay,
} from "../../shared/components/styledComponent";

const GistUtils = ({
  handleGistEdit,
  handleGistDelete,
  handleGistStar,
  handleForkGist,
  forks,
  isLoggedIn,
  showPersonalControls,
}) => {
  return (
    <CSBWrapper>
      {showPersonalControls ? (
        <>
          <CSBWrapper>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleGistEdit()}
            >
              Edit
            </Button>
          </CSBWrapper>
          <CSBWrapper>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              onClick={() => handleGistDelete()}
            >
              Delete
            </Button>
          </CSBWrapper>
        </>
      ) : null}
      {isLoggedIn ? (
        <>
          <CSBWrapper>
            <Button
              type="link"
              icon={<StarOutlined />}
              onClick={() => handleGistStar()}
            >
              Star
            </Button>
            <NumberDisplay>0</NumberDisplay>
          </CSBWrapper>
          <CSBWrapper>
            <Button
              type="link"
              icon={<ForkOutlined />}
              onClick={() => handleForkGist()}
            >
              Fork
            </Button>
            <NumberDisplay>{forks.length}</NumberDisplay>
          </CSBWrapper>
        </>
      ) : null}
    </CSBWrapper>
  );
};

export default GistUtils;
