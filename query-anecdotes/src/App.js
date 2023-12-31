import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests';


import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', 
        anecdotes.map(anecdote => {
          return anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote;
        }))
    },
  });

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
  });

  let anecdotes;

  if (result.isLoading) {
    return <div>data loading...</div>
  }
  if (result.isError) {
    return <span>Error: error fetching data</span>
  }

  anecdotes = result.data || [];

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
