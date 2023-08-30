import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests';
import { useReducer, useEffect } from 'react';
import { notificationReducer, useNotificationDispatch } from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  // const [message, messageDispatch] = useReducer(notificationReducer, 'dd');
  const dispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))

    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0,})
    dispatch({type: 'DISPLAY',
                    payload: content,
                  })
    setTimeout(() => {
      dispatch({type: 'DISPLAY',
        payload: '',
    })
    }, 5000)


    //button onClick={() => counterDispatch({ type: "INC"})}>+</button

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
