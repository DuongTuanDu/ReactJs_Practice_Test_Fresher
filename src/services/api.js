import axios from "../ultils/axios.customize";

export const registerUserAPI = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone })
}

export const loginUserAPI = (username, password) => {
    return axios.post('/api/v1/auth/login', { username, password })
}