import axios from "axios";

const instance = axios.create({
  baseURL: "https://heythere-app.herokuapp.com/",
});

export default instance;
