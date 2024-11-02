
import axios from 'axios';

const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const instance = axios.create({
  baseURL: backend_url,
  headers: {
    "Content-Type": "application/json",
  }
});

export default instance;