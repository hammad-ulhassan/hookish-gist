import { Spin } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { CodeBlock } from "../../shared/components/styledComponent";

export default function CodeView({ content, loaded, navigateToGist }) {
  return (
    <CodeBlock onClick={()=>navigateToGist()}>
      {loaded ? (
        <SyntaxHighlighter
          showLineNumbers={true}
          lineNumberStyle={{ color: "var(--gray)" }}
          style={{ fontSize: "0.3rem" }}
        >
          {content}
        </SyntaxHighlighter>
      ) : (
        <Spin size="small" />
      )}
    </CodeBlock>
  );
}
