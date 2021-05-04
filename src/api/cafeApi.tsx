import axios from "axios";

const baseURL = 'https://backend-node-products.herokuapp.com/api';

const cafeApi = axios.create({ baseURL })

export default cafeApi;