import { useSelector, useDispatch } from 'react-redux';
import { incrementAnecdote, initializeAnecdotes, setAnecdotes, updateAnecdoteVotes } from '../reducers/anecdoteReducer';
import {changeNotification, setNotification} from '../reducers/notificationReducer';

import {useEffect} from 'react';
import anecdoteService from '../services/anecdotes';
// import axios from 'axios';


const AnecdoteList = () => {
  // const anecdotes = useSelector(state => state)
  const dispatch = useDispatch();
  // useEffect(function () {
  //   anecdoteService.getAll().then(data => {
  //     dispatch(setAnecdotes(data));
  //   })
  // }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch])

  const anecdotes = useSelector(({anecdotes, filter}) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter));
  })
  anecdotes.sort((a1, a2) => {
    return a2.votes - a1.votes;
  })

  // console.log('useSelector(state => state) :>> ', useSelector(state => state));



  const vote = (id) => {
    // console.log('vote', id)
    // dispatch(changeNotification('farm'))
    //two below work independently
    // dispatch(incrementAnecdote(id))
    // dispatch(changeNotification('haha'))

    //new code
    // console.log('vote firing');
    // console.log('id :>> ', id);

    dispatch(updateAnecdoteVotes(id));
    dispatch(setNotification(('Updating anecdote with id: ' + id), 5))

    // console.log('after');
  };
  return (
  <div>
    <h2>Anecdotes</h2>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
  </div>
  )
};

export default AnecdoteList;