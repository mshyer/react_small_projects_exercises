import  NewNote from './components/NewNote';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import { useEffect } from 'react';
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducerRefactored'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   noteService.getAll().then(notes => {
  //     dispatch(setNotes(notes));
  //   })
  // }, [dispatch]);
  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;