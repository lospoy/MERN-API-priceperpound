import axios from 'axios';

const API_URL = '/api/prices/'

// Create new price
const createPrice = async (priceData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, priceData, config)

    return response.data
}

// Get user prices
const getPrices = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

// Delete user price
const deletePrice = async (priceId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + priceId, config)

    return response.data
}

const priceService = {
    createPrice,
    getPrices,
    deletePrice,
}

export default priceService