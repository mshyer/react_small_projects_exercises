import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import NoteForm from './components/NoteForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import Footer from './components/Footer';
import LoginForm from './components/Login';
import noteService from './services/notes';
import loginService from './services/login';

// const NoteForm = ({ onSubmit, handleChange, value}) => {
//   return (
//     <div>
//       <h2>Create a new note</h2>

//       <form onSubmit={onSubmit}>
//         <input
//           value={value}
//           onChange={handleChange}
//         />
//         <button type="submit">save</button>
//       </form>
//     </div>
//   )
// }
const App = () => {
  // const [loginVisible, setLoginVisible] = useState(false);
  const [notes, setNotes] = useState([])
  // const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const noteFormRef = useRef();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     important: Math.random() > 0.5,
  //   }

  //   noteService
  //     .create(noteObject)
  //       .then(returnedNote => {
  //       setNotes(notes.concat(returnedNote))
  //       setNewNote('')
  //     })
  // }

  // const handleNoteChange = (event) => {
  //   setNewNote(event.target.value)
  // }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote).then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        console.log(error);
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // const noteForm = () => (
  //   <Togglable buttonLabel='new note'>
  //     <NoteForm createNote={addNote} />
  //   </Togglable>
  // );

  // const loginForm = () => {
  //   const hideWhenVisible = { display: loginVisible ? 'none' : '' };
  //   const showWhenVisible = { display: loginVisible ? '' : 'none' };
  //   return (
  //     <Togglable buttonLabel='login'>
  //       <LoginForm
  //         username={username}
  //         password={password}
  //         handleUsernameChange={({ target }) => setUsername(target.value)}
  //         handlePasswordChange={({ target }) => setPassword(target.value)}
  //         handleSubmit={handleLogin}
  //       />
  //     </Togglable>
  //   )
  // }


  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>


          <div>
            <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
            </button>
          </div>
          <ul>
            <ul>
              {notesToShow.map(note =>
                <Note
                  key={note.id}
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                />
              )}
            </ul>
          </ul>
        </div>
      }
      <Footer />
    </div>
  )
}

export default App
