import axios from 'axios';


export default class ExperienceService {
    static async postExperience(data) {
        console.log(data)
        const response = await axios.post('http://127.0.0.1:8000/api/v1/experience/', data)
        return response
    }

    // static async refreshToken() {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/v1/token//`)
    //     return response
    // }
}