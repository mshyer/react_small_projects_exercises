import { useDispatch } from 'react-redux'
import { newAnecdote, createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteServices from '../services/anecdotes.js'
import {changeNotification} from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const addAnecdote = async function(e) {
    e.preventDefault();
    const content = e.target.content.value;
    e.target.content.value = '';

    if (content) {
      // anecdoteServices.createNew(content);
      // dispatch(newAnecdote(content));
      dispatch(createAnecdote(content))
    }
  };

  return (
    
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name='content'/></div>
      <button type='submit'>create</button>
    </form>
  )
};

export default AnecdoteForm;