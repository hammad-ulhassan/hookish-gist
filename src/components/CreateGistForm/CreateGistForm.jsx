import React from "react";
import { FieldArray, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function CreateGistForm({
  formRef,
  files,
  description,
  onHanldeSubmitForm,
}) {
  //file extension
  const validationSchema = Yup.object({
    description: Yup.string()
      .max(8, "Must be 8 characters or less")
      .required("Description is Required"),
    files: Yup.array().of(
      Yup.object({
        filename: Yup.string().required("Filename is required"),
        content: Yup.string().required("Content is required"),
      })
    ),
  });

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
      {({
        values,
        errors,
        touched,
        setFieldValue,
        submitForm,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Input placeholder="Description" name="description" />
          {errors && errors.description && touched && touched.description && (
            <div>{errors.description}</div>
          )}
          <FieldArray
            name="files"
            render={({ remove, push }) => (
              <div>
                {values.files.length > 0 &&
                  values.files.map((file, index) => (
                    <div key={index}>
                      <label htmlFor={`files.${index}.filename`}>
                        File Name
                      </label>
                      <Field
                        name={`files.${index}.filename`}
                        placeholder="File Name"
                        type="text"
                      />
                      {errors &&
                        errors.files &&
                        errors.files[index] &&
                        errors.files[index].filename &&
                        touched &&
                        touched.files &&
                        touched.files[index] &&
                        touched.files[index].filename && (
                          <div>{errors.files[index].filename}</div>
                        )}

                      <label htmlFor={`files.${index}.content`}>Content</label>
                      <Field
                        name={`files.${index}.content`}
                        placeholder="Content"
                        type="text"
                      />
                      {errors &&
                        errors.files &&
                        errors.files[index] &&
                        errors.files[index].content &&
                        touched &&
                        touched.files &&
                        touched.files[index] &&
                        touched.files[index].content && (
                          <div>{errors.files[index].content}</div>
                        )}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => push({ filename: "", content: "" })}
                >
                  Add New File
                </button>
                <div>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          />
        </Form>
      )}
    </Formik>
  );
}
