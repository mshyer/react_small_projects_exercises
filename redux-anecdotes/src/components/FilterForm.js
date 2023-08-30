import { useDispatch } from 'react-redux';
// import { incrementAnecdote } from '../reducers/anecdoteReducer';
import { changeFilter } from '../reducers/filterReducer';
import { changeNotification } from '../reducers/notificationReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const filterText = event.target.value;
    dispatch(changeFilter(filterText))
    dispatch(changeNotification(filterText))

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter;