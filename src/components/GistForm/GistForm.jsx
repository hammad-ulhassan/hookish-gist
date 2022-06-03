import { Form, Input, Button, Card, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const GistForm = ({ formRef, files, description, onHanldeSubmitForm }) => {
  function handleOnSubmitForm(formData) {
    onHanldeSubmitForm(formData)
  }

  return (
    <Form onFinish={handleOnSubmitForm} ref={formRef}>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Missing Description" }]}
        initialValue={description}
        label="Description"
      >
        <Input placeholder="Description" />
      </Form.Item>
      <Divider />
      <Form.List name="files" initialValue={files}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Card>
                  <Form.Item
                    {...field}
                    label="Name"
                    key={`fn${field.key}`}
                    name={[field.name, "filename"]}
                    fieldKey={[field.fieldKey, "filename"]}
                    rules={[{ required: true, message: "Missing File Name" }]}
                  >
                    <Input placeholder="File Name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Content"
                    key={`cn${field.key}`}
                    name={[field.name, "content"]}
                    fieldKey={[field.fieldKey, "content"]}
                    rules={[
                      { required: true, message: "Missing File Content" },
                    ]}
                  >
                    <Input.TextArea rows={4} placeholder="Content" />
                  </Form.Item>
                </Card>
              ))}
              <Button
                onClick={() => {
                  add();
                }}
              >
                <PlusOutlined /> Add File
              </Button>
            </div>
          );
        }}
      </Form.List>
      <Divider />

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default GistForm;
