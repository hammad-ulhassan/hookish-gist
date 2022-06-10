import { useField } from "formik";
import { Input } from "antd";

export default function InputField({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label>
        {label}
        <Input {...field} {...props} />
      </label>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
}
