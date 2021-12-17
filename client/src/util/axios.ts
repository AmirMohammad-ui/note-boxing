import axios from "axios";
export const baseURL =  "https://note-boxing.amirmuha.com/api";
axios.defaults.baseURL = baseURL;

export default axios;
