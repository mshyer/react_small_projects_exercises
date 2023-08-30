import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async function() {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async function(content) {
  const object = {content, votes: 0};
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const getOne = async function(id) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const updateVotes = async function(id) {
  const anecdote = await getOne(id);
  const votes = anecdote.votes + 1;
  const response = await axios.patch(`${baseUrl}/${id}`, {
    votes,
  });
  return response.data;

}

export default { getAll, createNew, updateVotes };