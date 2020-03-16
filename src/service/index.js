import axios from 'axios'


const url = 'http://localhost:5000/'
const api =  {
    get: async (path, params) =>  axios.get(url+path, {params}),
}

export default api
