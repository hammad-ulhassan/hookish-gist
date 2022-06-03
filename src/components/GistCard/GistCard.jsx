import { Card as AntCard } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import CodeView from "../CodeView/CodeView";
import './GistCard.css'

export default function GistCard({ filename, content, language }) {
  return (
    <AntCard
      title={
        <>
          <CodeOutlined /> {filename}
        </>
      }
      className="card-style min"
    >
      <CodeView loaded={true} language={language} content={content}></CodeView>
    </AntCard>
  );
}
