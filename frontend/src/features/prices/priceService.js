import axios from 'axios';

const API_URL = '/api/prices/'

// Create new Price
const createPrice = async (priceData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, priceData, config)

    return response.data
}

const priceService = {
    createPrice
}

export default priceService