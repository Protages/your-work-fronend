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

    static async getAllCandidateReactions(candidate_id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/candidate/${candidate_id}/reaction/`)
        return response
    }

    static async getAllCandidateExperiences(candidate_id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/candidate/${candidate_id}/experience/`)
        return response
    }

    static async getCandidateById(candidate_id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/candidate/${candidate_id}/`)
        return response
    }
}