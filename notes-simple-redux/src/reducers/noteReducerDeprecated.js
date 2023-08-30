const initialState = [
      {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
      },
      {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
      },
    ];

const noteReducer = (state = [], action) => {
  // if (action.type === 'NEW_NOTE') {
  //   return state.concat(action.payload)
  //   // state.push(action.payload)
  // }     
  let newNotes;
  switch (action.type) {
    case "NEW_NOTE":
      // console.log('firing');
      return state.concat(action.payload);
      // newNotes = [...state.notes, action.payload]
      // return { ...state, notes: newNotes }
    case "TOGGLE_IMPORTANCE":
      const id = action.payload.id;
      const noteToChange = state.find(n => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      // console.log(changedNote);
      // newNotes = state.notes.map(note => {
      //   return note.id !== id ? note : changedNote
      // })
      // return {...state, notes: newNotes}
      return state.map(note => {
        return note.id !== id ? note : changedNote
      })
    default:
      return initialState;
  }
};

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  };
};
  
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id },
  };
};

export default noteReducer;