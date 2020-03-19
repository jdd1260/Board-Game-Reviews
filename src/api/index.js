import axios from "axios";

const storageName = "userName";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getAPI = () => {
  instance.defaults.headers.common['Authorization'] = localStorage.getItem(storageName);
  return instance;
};

export const logIn = async function(name) {
  try {
    await getAPI().get("/ping", {
      headers: {
        Authorization: name
      }
    });
    localStorage.setItem(storageName, name);
    return true;
  } catch(e) {
    return false
  }
}

export const logOut = () => localStorage.removeItem(storageName);

export const getUser = () => localStorage.getItem(storageName);


export default getAPI;