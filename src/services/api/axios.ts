import axios from "axios";

export const BASE_URL = "https://shop-api.csoesz.de";

const instance = axios.create({ baseURL: BASE_URL });

export default instance;
