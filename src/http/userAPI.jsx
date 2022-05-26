import { $authHost, $host } from "../http/index";
import jwt_decode from 'jwt-decode'

export const registration = async (email, password, userName) => {
    const {data} = await $host.post('api/users/registration', {email, password, userName})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password, userName) => {
    const {data} = await $host.post('api/users/login', {email, password, userName})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/users/registration')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}