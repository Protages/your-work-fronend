import axios from 'axios';


export default class LoginService {
    static async getToken(email, password) {
        const data = {email: email, password: password}
        const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', data)
        return response
    }

    // static async refreshToken() {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/v1/token//`)
    //     return response
    // }
}