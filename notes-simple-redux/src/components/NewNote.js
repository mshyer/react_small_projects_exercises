import { useDispatch } from 'react-redux';
// import { createNote } from '../reducers/noteReducer';
// import { createNote } from '../reducers/noteReducerRefactored';
import noteService from '../services/notes';
import noteReducer, { createNote, toggleImportanceOf } from '../reducers/noteReducerRefactored'

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    // dispatch(createNote(content))
    // const newNote = await noteService.createNew(content)
    dispatch(createNote(content))
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
};

export default NewNote;