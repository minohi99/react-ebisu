import { client } from "libs/api";

export default async function Schedule() {
  const resPromise = client.get({
    endpoint: "categories",
  });
  resPromise.then((res) => console.log(res)).catch((err) => console.log(err));
  // console.log(resPromise);
}
