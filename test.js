const axios = require('axios')
const certification = {
  
  createCertification: async (data) => {
    return axios.post('http://localhost:3000/api/certification/', data)
  },
  readCertification: async (id) => {
    return axios.get('http://localhost:3000/api/certification/${id}')
  }
 
}
module.exports = certification
