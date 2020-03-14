import axios from "axios";

export default function getTestObj(id) {
  return axios.get("/test/" + id).then((r => r.data));
}