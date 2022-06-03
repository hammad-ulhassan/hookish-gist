import { Button, Table, Tag } from "antd";
import { CSAWrapper } from "../../shared/components/styledComponent";
import { StarOutlined, ForkOutlined } from "@ant-design/icons";
import GistMeta from "../GistMeta/GistMeta";
import { useNavigate } from "react-router-dom";

export default function Datatable({ data, selectedRowKeys, loading }) {

  let navigate = useNavigate();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text, record, index) => (
        <GistMeta isInTable={true} gist={record.gist} />
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      width: "12%",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "8%",
    },
    {
      title: "Keyword",
      dataIndex: "keyword",
      key: "keyword",
      width: "16%",
      render: (text, record, index) => text && text.slice(0, 25) + "...",
    },
    {
      title: "Notebook Name",
      dataIndex: "notebook",
      key: "notebook",
      width: "32%",
      render: (text, record, index) =>
        record.notebook.map((file, index) =>
          index < 5 ? <Tag key={index}>{file}</Tag> : null
        ),
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "8%",
      render: (text, record, index) => {
        return null;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ y: 600 }}
      loading={loading}
      pageSize={10}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        total: 1000,
        onChange: null,
      }}
      onRow={(record, rowIndex) => {
        return {
          onClick: (event) => {
            navigate(`/gist/${record.gist.id}`)
          },
        };
      }}
    />
  );
}