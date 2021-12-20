import axios from "axios";
export const baseURL =  "https://note-boxing.portfolio.amirmuha.com/api";
axios.defaults.baseURL = baseURL;

export default axios;
