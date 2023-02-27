import axios from 'axios';


export default class CompasnyService {
    static async companyCreate(data) {
        let reques_data = {}
        for (var key in data) {
            if (data[key] !== "") {
                reques_data[key] = data[key]
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/api/v1/company/', reques_data)
        return response
    }

    static async getCompanyVacancies(company_id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/company/${company_id}/vacancy/`)
        return response
    }

    static async getCompanyReactions(company_id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/company/${company_id}/reaction/`)
        return response
    }

    static async getCompanyById(company_id) {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/company/${company_id}/`)
        return response
    }

}