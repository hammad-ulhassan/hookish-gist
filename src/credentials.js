
//make env [todo]
export default function headers(){
  const reqHeaders = {
    Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    Accept: "application/json"
  };
  const headers = new Headers(reqHeaders);
  return headers;
}
  