import axios from 'axios';


export default class CandidateService {
    static async candidateCreate(data) {
        let reques_data = {}
        for (var key in data) {
            if (data[key] !== "") {
                reques_data[key] = data[key]
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/api/v1/candidate/', reques_data)
        return response
    }

    // static async refreshToken() {
    //     const response = await axios.get(`http://127.0.0.1:8000/api/v1/token//`)
    //     return response
    // }
}