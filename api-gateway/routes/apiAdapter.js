const axios = require('axios');
const { TIME_OUT } = process.env;

module.exports = (baseURL_srv) => {
    return axios.create({
    baseURL : baseURL_srv,
    timeout : parseInt(TIME_OUT)
    });
};