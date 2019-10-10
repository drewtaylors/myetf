import api from './api';

const searchRecords = (fund, stock) => {
  return api
    .get(`/api/records?fund=${fund}&stock=${stock}`)
    .then((res) => {
      history.push(`/record/${res._id}`);
    })
    .catch(err => console.log(err));
};

export default searchRecords;