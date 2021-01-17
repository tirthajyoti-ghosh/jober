import axios from 'axios';

const queryApi = {
  get: (type, param) => (
    axios.get(`https://torre.bio/api/${type}/${param}`)
      .then(result => result.data)
  ),
  post: (page = 0, data) => (
    axios.post(`https://search.torre.co/opportunities/_search/?offset=0&aggregate=false&size=20&page=${page}`, data)
      .then(result => result.data)
  ),
};

export default queryApi;
