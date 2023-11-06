import axios, { AxiosResponse } from 'axios';

class InvestmentApi {
    private baseUrl: string; // URL base de tu API en Azure

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // Método para hacer una solicitud GET a tu API
    async get(endpoint: string): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`${this.baseUrl}/${endpoint}`);
            console.log(response.data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    // Método para hacer una solicitud PUT a tu API
    async put(endpoint: string, data: any): Promise<AxiosResponse> {
        try {
            const response = await axios.put(`${this.baseUrl}/${endpoint}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    } 

    async post(endpoint: string, data: any): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${this.baseUrl}/${endpoint}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default InvestmentApi;