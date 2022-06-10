import { Button } from "antd";
import { FieldArray, Form, Formik } from "formik";
import InputField from "../InputField/InputField";
import validationSchema from "./validationSchema";
import { DeleteOutlined } from "@ant-design/icons";
import { ADDFILE, CONTENT, DESCRIPTION, FILENAME, GISTFILE, SUBMIT } from "./constants";
import InputTextArea from "../InputTextArea/InputTextArea";

export default function GistCreationForm({ description, files }) {
  const initalValues = {
    description: description ?? "",
    files: files ?? [],
  };
  return (
    <Formik
      initialValues={initalValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <InputField label={DESCRIPTION} name="description" />
          <FieldArray
            name="files"
            render={(
              { remove, push } //part of arrayHelpers Object
            ) => (
              <div>
                {values.files.length > 0 &&
                  values.files.map((file, index) => (
                    <div key={index}>
                      <InputField
                        label={FILENAME}
                        name={`files.${index}.filename`}
                      />
                      <InputTextArea rows={4} label={CONTENT} name={`files.${index}.content`}/>
                      <Button
                        type="primary"
                        shape="round"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(index)}
                        danger
                        size="small"
                      />
                    </div>
                  ))}
                <Button type="primary" onClick={() => push(GISTFILE)}>
                  {ADDFILE}
                </Button>

                <div>
                <Button type="primary" htmlType="submit">
                  {SUBMIT}
                </Button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
}
