// making HTTP requests here
import axios from 'axios'

const API_URL = '/api/users/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    // axios puts response inside an object called 'data'
    if(response.data) {
        // localStorage only accepts strings >> JSON.stringify
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authService = {
    register,
}

export default authService