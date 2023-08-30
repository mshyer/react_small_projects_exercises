import { useSelector, useDispatch } from 'react-redux'
import { incrementAnecdote, newAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/FilterForm';
import Notification from './components/Notification';

const App = () => {


  return (
    <div>
      <Notification />
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
    </div>
  )
}

export default App