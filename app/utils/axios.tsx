import axios from "axios";

const api = axios.create({
    baseURL: 'https://dog.ceo/api', // Replace with your base URL
  });


export default api